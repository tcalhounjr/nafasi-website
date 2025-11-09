import { supabaseAdmin } from '@/lib/utils/supabase'
import { checkForSpam } from '@/lib/utils/spam-detection'
import { sendLeadNotification } from '@/lib/utils/send-notification'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { conversationId, leadData } = body

    // Validate required fields
    if (!conversationId || !leadData) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get conversation from database
    const { data: conversation, error: fetchError } = await supabaseAdmin
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single()

    if (fetchError || !conversation) {
      return new Response(
        JSON.stringify({ error: 'Conversation not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Comprehensive spam check on lead data
    const spamCheck = checkForSpam({
      name: leadData.name,
      email: leadData.email,
      messages: conversation.messages,
      ipAddress: conversation.ip_address,
      conversationDurationMs:
        new Date().getTime() - new Date(conversation.created_at).getTime(),
    })

    // Update conversation with lead data and spam score
    const { error: updateError } = await supabaseAdmin
      .from('conversations')
      .update({
        name: leadData.name,
        email: leadData.email,
        project_description: leadData.projectDescription,
        timeline: leadData.timeline,
        budget_range: leadData.budgetRange,
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

    // Send email notification if qualified (not spam)
    let emailSent = false
    if (!spamCheck.isSpam) {
      const emailResult = await sendLeadNotification({
        ...leadData,
        messages: conversation.messages,
      })
      emailSent = emailResult.success
    } else {
      console.warn('Conversation marked as spam, skipping email notification:', {
        conversationId,
        score: spamCheck.score,
        reasons: spamCheck.reasons,
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        conversationId,
        isQualified: !spamCheck.isSpam,
        emailSent,
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
