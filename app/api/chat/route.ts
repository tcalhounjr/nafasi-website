import OpenAI from 'openai'
import { supabaseAdmin } from '@/lib/utils/supabase'
import { checkForSpam, checkRateLimit } from '@/lib/utils/spam-detection'
import { headers } from 'next/headers'

// Lazy initialization for OpenAI client
let _openai: OpenAI | null = null

function getOpenAIClient() {
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return _openai
}

// Helper to get client IP address
async function getClientIP(headersList: Headers): Promise<string> {
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
      const { data, error } = await (supabaseAdmin() as any)
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
      const { data: existing } = await (supabaseAdmin() as any)
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

      await (supabaseAdmin() as any)
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
    const { conversationId, threadId, messages: clientMessages, metadata } = body

    console.log('Received body:', JSON.stringify(body, null, 2))
    console.log('Conversation ID for this session:', conversationId)

    // Extract the last user message
    // AI SDK v5 sends messages as an array with { text: string } format
    const lastMessage = clientMessages && clientMessages.length > 0
      ? clientMessages[clientMessages.length - 1]
      : null

    console.log('Last message:', JSON.stringify(lastMessage, null, 2))

    let messageText = ''
    if (lastMessage) {
      if (typeof lastMessage === 'string') {
        messageText = lastMessage
      } else if (lastMessage.text) {
        messageText = lastMessage.text
      } else if (lastMessage.parts && Array.isArray(lastMessage.parts)) {
        // AI SDK v5 uses parts array
        messageText = lastMessage.parts
          .filter((part: any) => part.type === 'text')
          .map((part: any) => part.text)
          .join('')
      } else if (lastMessage.content) {
        messageText = typeof lastMessage.content === 'string'
          ? lastMessage.content
          : Array.isArray(lastMessage.content)
          ? lastMessage.content.map((part: any) => part.type === 'text' ? part.text : '').join('')
          : ''
      }
    }

    console.log('Extracted message text:', messageText)

    if (!messageText) {
      return new Response(
        JSON.stringify({ error: 'No message provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get client IP
    const headersList = await headers()
    const ipAddress = metadata?.ipAddress || await getClientIP(headersList)

    // Rate limiting check
    const isRateLimited = await checkRateLimit(ipAddress, supabaseAdmin())
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
      messages: [{ content: messageText }],
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

    // Get OpenAI client
    const openai = getOpenAIClient()

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
      messageText,
      'user',
      { ipAddress, userAgent: metadata?.userAgent }
    )

    // Add user message to OpenAI thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: messageText,
    })

    // Create a run with the assistant and stream the response
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!,
      stream: true,
    })

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        let fullResponse = ''
        let isClosed = false

        // Helper to safely enqueue data
        const safeEnqueue = (data: Uint8Array) => {
          if (!isClosed) {
            try {
              controller.enqueue(data)
            } catch (error) {
              console.error('Enqueue error:', error)
              isClosed = true
            }
          }
        }

        try {
          for await (const event of run) {
            if (isClosed) break

            // Handle different event types
            if (event.event === 'thread.message.delta') {
              const delta = event.data.delta
              if (delta.content && delta.content[0]?.type === 'text') {
                const text = delta.content[0].text?.value || ''
                fullResponse += text

                // Send SSE formatted data
                const data = JSON.stringify({
                  type: 'text-delta',
                  textDelta: text,
                })
                safeEnqueue(encoder.encode(`data: ${data}\n\n`))
              }
            }

            // Handle function calls (lead qualification)
            if (event.event === 'thread.run.requires_action') {
              const requiredAction = event.data.required_action
              if (requiredAction?.type === 'submit_tool_outputs') {
                const toolCalls = requiredAction.submit_tool_outputs.tool_calls

                for (const toolCall of toolCalls) {
                  if (toolCall.type === 'function' && toolCall.function.name === 'submitLeadInformation') {
                    try {
                      const leadData = JSON.parse(toolCall.function.arguments)
                      console.log('Lead information submitted:', leadData)

                      // Send lead-submitted event to frontend (minimal fields)
                      safeEnqueue(encoder.encode(`data: ${JSON.stringify({
                        type: 'lead-submitted',
                        leadData: {
                          name: leadData.name,
                          email: leadData.email,
                          project_description: leadData.project_description
                        }
                      })}\n\n`))

                      // Submit tool output to OpenAI and continue streaming
                      const submitStream = openai.beta.threads.runs.submitToolOutputsStream(
                        event.data.id,
                        {
                          thread_id: currentThreadId,
                          tool_outputs: [{
                            tool_call_id: toolCall.id,
                            output: JSON.stringify({ success: true, message: 'Lead information received successfully' })
                          }],
                          stream: true
                        }
                      )

                      console.log('Tool output submitted, continuing stream...')

                      // Continue streaming the assistant's response after tool submission
                      for await (const submitEvent of submitStream) {
                        if (isClosed) break

                        if (submitEvent.event === 'thread.message.delta') {
                          const delta = submitEvent.data.delta
                          if (delta.content && delta.content[0]?.type === 'text') {
                            const text = delta.content[0].text?.value || ''
                            fullResponse += text

                            safeEnqueue(encoder.encode(`data: ${JSON.stringify({
                              type: 'text-delta',
                              textDelta: text,
                            })}\n\n`))
                          }
                        }
                      }
                    } catch (parseError) {
                      console.error('Error parsing lead data:', parseError)
                    }
                  }
                }
              }
            }
          }

          // Save the complete assistant response
          if (fullResponse) {
            await saveMessage(
              currentConversationId,
              currentThreadId,
              fullResponse,
              'assistant'
            )
          }

          // Send finish event
          if (!isClosed) {
            safeEnqueue(encoder.encode(`data: ${JSON.stringify({ type: 'finish' })}\n\n`))
            controller.close()
            isClosed = true
          }
        } catch (error) {
          console.error('Streaming error:', error)
          if (!isClosed) {
            try {
              controller.error(error)
            } catch (e) {
              console.error('Error closing controller:', e)
            }
            isClosed = true
          }
        }
      },
    })

    // Return streaming response with conversation metadata in headers
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
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
