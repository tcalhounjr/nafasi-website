import { supabaseAdmin } from '@/lib/utils/supabase'
import { sendLeadNotification } from '@/lib/utils/send-notification'
import { headers } from 'next/headers'
import crypto from 'crypto'

/**
 * Calendly Webhook Handler
 *
 * Receives events from Calendly when users create/cancel meetings
 * Triggers email notification after successful meeting booking
 *
 * Webhook setup: https://calendly.com/app/settings/integrations/webhooks
 * Events to subscribe to: invitee.created
 */

// Verify webhook signature (Calendly sends X-Calendly-Signature header)
function verifyCalendlySignature(payload: string, signature: string): boolean {
  const CALENDLY_WEBHOOK_SECRET = process.env.CALENDLY_WEBHOOK_SECRET || ''

  if (!CALENDLY_WEBHOOK_SECRET) {
    console.warn('CALENDLY_WEBHOOK_SECRET not configured - accepting all webhooks (unsafe for production)')
    return true
  }

  if (!signature) {
    console.error('No signature provided in webhook request')
    return false
  }

  try {
    // Compute HMAC-SHA256 signature
    const hmac = crypto.createHmac('sha256', CALENDLY_WEBHOOK_SECRET)
    hmac.update(payload)
    const computedSignature = hmac.digest('base64')

    // Compare signatures (constant-time comparison to prevent timing attacks)
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(computedSignature)
    )

    if (!isValid) {
      console.error('Webhook signature verification failed')
      console.error('Received:', signature.substring(0, 20) + '...')
      console.error('Expected:', computedSignature.substring(0, 20) + '...')
    }

    return isValid
  } catch (error) {
    console.error('Error verifying webhook signature:', error)
    return false
  }
}

export async function POST(req: Request) {
  try {
    const headersList = await headers()
    const signature = headersList.get('X-Calendly-Signature') || ''

    // Read the raw body text first (needed for signature verification)
    const bodyText = await req.text()
    const body = JSON.parse(bodyText)

    console.log('=== CALENDLY WEBHOOK RECEIVED ===')
    console.log('Webhook body:', JSON.stringify(body, null, 2))
    console.log('Event type:', body.event)

    // Verify webhook authenticity
    if (!verifyCalendlySignature(bodyText, signature)) {
      return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 401 })
    }

    // Handle invitee.created event (meeting scheduled)
    if (body.event === 'invitee.created') {
      // Support both v1 and v2 API formats
      const eventPayload = body.payload || body.resource

      if (!eventPayload) {
        console.log('Missing payload or resource in webhook body')
        return new Response(
          JSON.stringify({ error: 'Missing payload' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Extract fields (v2 API format)
      const email = eventPayload.email
      const name = eventPayload.name
      const scheduling_url = eventPayload.scheduling_url || eventPayload.uri // v2 uses uri
      const questions_and_answers = eventPayload.questions_and_answers || []

      console.log('Extracted from webhook:', { email, name, scheduling_url, qa_count: questions_and_answers.length })

      console.log('Meeting scheduled for:', { email, name, scheduling_url })

      // Extract meeting ID from custom question answers (human verification flow)
      // User enters formatted ID like "ID123456" which we need to match back to conversation
      let meetingIdAnswer: string | null = null

      if (questions_and_answers && Array.isArray(questions_and_answers)) {
        for (const qa of questions_and_answers) {
          // Look for any question containing "meeting" or "session" keywords
          if (qa.question && (qa.question.toLowerCase().includes('meeting') || qa.question.toLowerCase().includes('session'))) {
            meetingIdAnswer = qa.answer?.trim() || null
            break
          }
        }
      }

      console.log('Extracted meeting ID from custom question answer:', meetingIdAnswer)

      // Helper function to convert UUID to meeting ID format
      const getMeetingId = (uuid: string): string => {
        const hash = uuid.split('').reduce((acc: number, char: string) => {
          return ((acc << 5) - acc) + char.charCodeAt(0)
        }, 0)
        const randomDigits = String(Math.abs(hash) % 1000000).padStart(6, '0')
        return `ID${randomDigits}`
      }

      let conversation: any = null
      let foundByMeetingId = false

      // First, try to find conversation by matching meeting ID format from custom question
      if (meetingIdAnswer) {
        // Get all completed, unscheduled conversations and check their meeting IDs
        const { data: conversations, error: fetchError } = await (supabaseAdmin() as any)
          .from('conversations')
          .select('*')
          .eq('is_completed', true)
          .eq('meeting_scheduled', false)
          .order('created_at', { ascending: false })
          .limit(10)

        if (!fetchError && conversations && Array.isArray(conversations)) {
          // Find the conversation whose meeting ID matches the user's answer
          for (const conv of conversations) {
            if (getMeetingId(conv.id) === meetingIdAnswer) {
              conversation = conv
              foundByMeetingId = true
              console.log('Found conversation by meeting ID match:', meetingIdAnswer, 'UUID:', conv.id)
              break
            }
          }
        }

        if (!foundByMeetingId) {
          console.warn('No conversation found matching meeting ID:', meetingIdAnswer)
        }
      }

      // Fall back to finding by email if meeting ID didn't work
      if (!conversation) {
        console.log('Falling back to email-based lookup for:', email)
        const { data: conversations, error: fetchError } = await (supabaseAdmin() as any)
          .from('conversations')
          .select('*')
          .eq('email', email)
          .eq('is_completed', true)
          .eq('meeting_scheduled', false)
          .order('created_at', { ascending: false })
          .limit(1)

        if (fetchError) {
          console.error('Error fetching conversation by email:', fetchError)
          return new Response(
            JSON.stringify({ error: 'Database error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          )
        }

        if (conversations && conversations.length > 0) {
          conversation = conversations[0]
          console.log('Found conversation by email (fallback):', email)
        }
      }

      if (!conversation) {
        console.warn('=== NO CONVERSATION FOUND ===')
        console.warn('Meeting ID answer:', meetingIdAnswer)
        console.warn('Email:', email)
        console.warn('Found by meeting ID:', foundByMeetingId)
        // Still return 200 to acknowledge webhook receipt
        return new Response(
          JSON.stringify({ success: true, message: 'Webhook received but no matching conversation' }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Update conversation with meeting details
      const { error: updateError } = await (supabaseAdmin() as any)
        .from('conversations')
        .update({
          meeting_scheduled: true,
          calendly_meeting_url: scheduling_url,
          calendly_meeting_created_at: new Date().toISOString(),
          last_webhook_event: body,
        })
        .eq('id', conversation.id)

      if (updateError) {
        console.error('Error updating conversation:', updateError)
        return new Response(
          JSON.stringify({ error: 'Failed to update conversation' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Send email notification now that meeting is confirmed
      // Note: We send email for all meetings booked (already verified as human via Meeting ID entry)
      console.log('=== SENDING EMAIL NOTIFICATION ===')
      console.log('Conversation data:', {
        id: conversation.id,
        name: conversation.name,
        email: conversation.email,
        project_description: conversation.project_description,
        has_messages: !!conversation.messages,
      })

      const emailResult = await sendLeadNotification({
        name: conversation.name,
        email: conversation.email,
        project_description: conversation.project_description,
        messages: conversation.messages,
        calendlyLink: scheduling_url,
      })

      console.log('=== EMAIL RESULT ===')
      console.log('Lead notification email sent:', {
        conversationId: conversation.id,
        email: conversation.email,
        success: emailResult.success,
      })

      return new Response(
        JSON.stringify({
          success: true,
          conversationId: conversation.id,
          message: 'Meeting confirmed and notification sent',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Handle invitee.canceled event
    if (body.event === 'invitee.canceled') {
      const { payload: eventPayload } = body
      const { email } = eventPayload

      console.log('Meeting cancelled for:', email)

      // Update conversation to reflect cancellation
      const { error: updateError } = await (supabaseAdmin() as any)
        .from('conversations')
        .update({
          meeting_scheduled: false,
          last_webhook_event: body,
        })
        .eq('email', email)
        .eq('meeting_scheduled', true)

      if (updateError) {
        console.error('Error updating conversation:', updateError)
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Meeting cancellation recorded' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // For other event types, just acknowledge receipt
    return new Response(
      JSON.stringify({ success: true, message: 'Webhook received' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Calendly webhook error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
