import { supabaseAdmin } from '@/lib/utils/supabase'
import { checkForSpam } from '@/lib/utils/spam-detection'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { conversationId, leadData } = body

    console.log('=== /api/chat/complete called ===')
    console.log('conversationId:', conversationId)
    console.log('leadData:', leadData)

    // Validate required fields
    if (!conversationId || !leadData) {
      console.log('Missing required fields')
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get conversation from database
    const { data, error: fetchError } = await supabaseAdmin()
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single()

    if (fetchError || !data) {
      console.error('Error fetching conversation:', fetchError)
      return new Response(
        JSON.stringify({ error: 'Conversation not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Type assertion needed because Supabase types don't narrow properly
    const conversation = data as any

    // Spam check on lead data (streamlined: only name, email, project_description)
    const spamCheck = checkForSpam({
      name: leadData.name,
      email: leadData.email,
      messages: conversation.messages,
      ipAddress: conversation.ip_address,
      conversationDurationMs:
        new Date().getTime() - new Date(conversation.created_at).getTime(),
    })

    // Update conversation with lead data (streamlined fields only)
    // NOTE: Email is sent AFTER Calendly meeting is created (via webhook)
    const { error: updateError } = await (supabaseAdmin() as any)
      .from('conversations')
      .update({
        name: leadData.name,
        email: leadData.email,
        project_description: leadData.project_description,
        is_qualified: !spamCheck.isSpam,
        is_completed: true,
        spam_score: spamCheck.score,
      })
      .eq('id', conversationId)

    if (updateError) {
      console.error('Error updating conversation:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to update conversation' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log('Lead information saved (email will be sent after Calendly booking):', {
      conversationId,
      name: leadData.name,
      email: leadData.email,
      isQualified: !spamCheck.isSpam,
    })

    return new Response(
      JSON.stringify({
        success: true,
        conversationId,
        isQualified: !spamCheck.isSpam,
        message: 'Lead information saved. Email will be sent after Calendly meeting is scheduled.',
        spamCheck: spamCheck.isSpam
          ? { score: spamCheck.score, reasons: spamCheck.reasons }
          : undefined,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Complete conversation API error:', error)
    return new Response(
      JSON.stringify({ error: 'An error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
