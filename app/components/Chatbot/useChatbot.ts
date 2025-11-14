'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  parts: Array<{ type: 'text'; text: string }>
}

interface LeadData {
  name: string
  email: string
  location: string
}

export function useChatbot(isOpen: boolean) {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [leadData, setLeadData] = useState<LeadData | null>(null)
  const [leadSubmitted, setLeadSubmitted] = useState(false)

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    lastActivityRef.current = Date.now()

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }

    // Auto-close after 5 minutes of inactivity
    inactivityTimerRef.current = setTimeout(() => {
      if (isOpen) {
        console.log('Auto-closing chat due to inactivity')
        // Inactivity close is now handled by the parent component
      }
    }, 5 * 60 * 1000) // 5 minutes
  }, [isOpen])

  // Start inactivity timer when chat opens and fetch initial message
  useEffect(() => {
    if (isOpen) {
      resetInactivityTimer()

      // Send initial message from assistant when chat first opens
      if (messages.length === 0 && !threadId) {
        const fetchInitialMessage = async () => {
          setIsLoading(true)
          setIsTyping(true)

          try {
            const response = await fetch('/api/chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                conversationId: null,
                threadId: null,
                messages: [{ role: 'user', parts: [{ type: 'text', text: 'Hi' }] }],
              }),
            })

            if (!response.ok) {
              throw new Error('Failed to get initial message')
            }

            // Extract conversation and thread IDs from headers
            const newConversationId = response.headers.get('X-Conversation-Id')
            const newThreadId = response.headers.get('X-Thread-Id')

            if (newConversationId) {
              setConversationId(newConversationId)
            }
            if (newThreadId) {
              setThreadId(newThreadId)
            }

            // Parse SSE stream
            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let assistantMessage: Message = {
              id: Math.random().toString(36).substring(7),
              role: 'assistant',
              parts: [{ type: 'text', text: '' }],
            }

            setMessages([assistantMessage])

            if (reader) {
              while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value)
                const lines = chunk.split('\n')

                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    const data = JSON.parse(line.slice(6))

                    if (data.type === 'text-delta') {
                      assistantMessage.parts[0].text += data.textDelta
                      setMessages([{ ...assistantMessage }])
                    } else if (data.type === 'finish') {
                      break
                    }
                  }
                }
              }
            }

            setIsTyping(false)
            setIsLoading(false)
          } catch (err) {
            console.error('Error fetching initial message:', err)
            setIsTyping(false)
            setIsLoading(false)
          }
        }

        fetchInitialMessage()
      }
    } else {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
        inactivityTimerRef.current = null
      }
    }

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [isOpen, resetInactivityTimer])

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value)
      resetInactivityTimer()
    },
    [resetInactivityTimer]
  )

  // Complete conversation and send lead data
  const completeConversation = useCallback(
    async (data: LeadData) => {
      if (!conversationId) {
        console.error('No conversation ID available')
        return { success: false }
      }

      try {
        const response = await fetch('/api/chat/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            conversationId,
            leadData: data,
          }),
        })

        const result = await response.json()
        return result
      } catch (error) {
        console.error('Error completing conversation:', error)
        return { success: false, error }
      }
    },
    [conversationId]
  )

  // Handle form submit
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!input.trim() || isLoading) return

      // Reset inactivity timer on message send
      resetInactivityTimer()

      const userMessage: Message = {
        id: Math.random().toString(36).substring(7),
        role: 'user',
        parts: [{ type: 'text', text: input }],
      }

      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setIsLoading(true)
      setIsTyping(true)
      setError(undefined)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            conversationId,
            threadId,
            messages: [userMessage],
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to send message')
        }

        // Extract conversation and thread IDs from headers
        const newConversationId = response.headers.get('X-Conversation-Id')
        const newThreadId = response.headers.get('X-Thread-Id')

        if (newConversationId) {
          setConversationId(newConversationId)
        }
        if (newThreadId) {
          setThreadId(newThreadId)
        }

        // Parse SSE stream
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let assistantMessage: Message = {
          id: Math.random().toString(36).substring(7),
          role: 'assistant',
          parts: [{ type: 'text', text: '' }],
        }

        setMessages((prev) => [...prev, assistantMessage])

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = JSON.parse(line.slice(6))

                if (data.type === 'text-delta') {
                  assistantMessage.parts[0].text += data.textDelta
                  setMessages((prev) => {
                    const newMessages = [...prev]
                    newMessages[newMessages.length - 1] = { ...assistantMessage }
                    return newMessages
                  })
                } else if (data.type === 'lead-submitted') {
                  // Store lead data - don't auto-submit, let user close or continue
                  console.log('Lead information submitted:', data.leadData)
                  setLeadData(data.leadData)
                } else if (data.type === 'finish') {
                  break
                }
              }
            }
          }
        }

        setIsTyping(false)
        setIsLoading(false)
      } catch (err) {
        console.error('Chat error:', err)
        setError(err as Error)
        setIsTyping(false)
        setIsLoading(false)
      }
    },
    [input, isLoading, conversationId, threadId, leadSubmitted, resetInactivityTimer, completeConversation]
  )

  // Handle chat close - submit lead if available and not already submitted
  const handleClose = useCallback(() => {
    if (leadData && !leadSubmitted && conversationId) {
      console.log('Submitting lead on close:', leadData)
      completeConversation(leadData)
        .then((result) => {
          if (result.success) {
            setLeadSubmitted(true)
            console.log('Lead submitted on close')
          }
        })
        .catch((err) => {
          console.error('Error submitting lead on close:', err)
        })
    }
    // Note: Closing the modal is now handled by the parent component
  }, [leadData, leadSubmitted, conversationId, completeConversation])

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isTyping,
    error,
    handleClose,
    conversationId,
    threadId,
    completeConversation,
  }
}
