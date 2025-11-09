import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { supabaseAdmin } from '@/lib/utils/supabase'
import { checkForSpam, checkRateLimit } from '@/lib/utils/spam-detection'
import { headers } from 'next/headers'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Helper to get client IP address
function getClientIP(headersList: Headers): string {
  // Try various headers that might contain the real IP
  const forwarded = headersList.get('x-forwarded-for')
  const realIP = headersList.get('x-real-ip')
  const cfConnectingIP = headersList.get('cf-connecting-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }

  return 'unknown'
}

// Save conversation to Supabase (non-blocking)
async function saveMessage(
  conversationId: string | null,
  threadId: string,
  message: string,
  role: 'user' | 'assistant',
  metadata?: {
    ipAddress?: string
    userAgent?: string
  }
): Promise<string> {
  try {
    if (!conversationId) {
      // Create new conversation
      const { data, error } = await supabaseAdmin
        .from('conversations')
        .insert({
          thread_id: threadId,
          messages: [
            {
              role,
              content: message,
              timestamp: new Date().toISOString(),
            },
          ],
          ip_address: metadata?.ipAddress,
          user_agent: metadata?.userAgent,
        })
        .select('id')
        .single()

      if (error) throw error
      return data.id
    } else {
      // Append to existing conversation
      const { data: existing } = await supabaseAdmin
        .from('conversations')
        .select('messages')
        .eq('id', conversationId)
        .single()

      const messages = existing?.messages || []
      messages.push({
        role,
        content: message,
        timestamp: new Date().toISOString(),
      })

      await supabaseAdmin
        .from('conversations')
        .update({ messages, thread_id: threadId })
        .eq('id', conversationId)

      return conversationId
    }
  } catch (error) {
    console.error('Error saving message:', error)
    throw error
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { conversationId, threadId, message, metadata } = body

    // Get client IP
    const headersList = headers()
    const ipAddress = metadata?.ipAddress || getClientIP(headersList)

    // Rate limiting check
    const isRateLimited = await checkRateLimit(ipAddress, supabaseAdmin)
    if (isRateLimited) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded. Please try again later.',
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Spam detection on user message
    const spamCheck = checkForSpam({
      messages: [{ content: message }],
      ipAddress,
    })

    if (spamCheck.isSpam) {
      console.warn('Spam detected:', spamCheck.reasons)
      return new Response(
        JSON.stringify({
          error: 'Message flagged as inappropriate. Please try again.',
          reasons: spamCheck.reasons,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create or retrieve OpenAI thread
    let currentThreadId = threadId
    if (!currentThreadId) {
      const thread = await openai.beta.threads.create()
      currentThreadId = thread.id
    }

    // Save user message to Supabase
    const currentConversationId = await saveMessage(
      conversationId,
      currentThreadId,
      message,
      'user',
      { ipAddress, userAgent: metadata?.userAgent }
    )

    // Add user message to OpenAI thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message,
    })

    // Create a run with the assistant
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!,
      stream: true,
    })

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(run, {
      async onFinal(completion) {
        // Save assistant response to Supabase
        await saveMessage(
          currentConversationId,
          currentThreadId,
          completion,
          'assistant'
        )
      },
    })

    // Return streaming response with conversation metadata in headers
    return new StreamingTextResponse(stream, {
      headers: {
        'X-Conversation-Id': currentConversationId,
        'X-Thread-Id': currentThreadId,
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your message.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
