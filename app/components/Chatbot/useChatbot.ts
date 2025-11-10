'use client'

import { useState, useCallback } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  parts: Array<{ type: 'text'; text: string }>
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value)
    },
    []
  )

  // Handle form submit
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!input.trim() || isLoading) return

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
    [input, isLoading, conversationId, threadId]
  )

  // Complete conversation and send lead data
  const completeConversation = useCallback(
    async (leadData: {
      name: string
      email: string
      projectDescription: string
      timeline: string
      budgetRange: string
    }) => {
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
            leadData,
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

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isTyping,
    error,
    isOpen,
    setIsOpen,
    conversationId,
    threadId,
    completeConversation,
  }
}
