'use client'

import { useChat } from 'ai/react'
import { useState, useEffect, useCallback } from 'react'

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    error,
  } = useChat({
    api: '/api/chat',
    body: {
      conversationId,
      threadId,
    },
    onResponse: (response) => {
      // Extract conversation and thread IDs from headers
      const newConversationId = response.headers.get('X-Conversation-Id')
      const newThreadId = response.headers.get('X-Thread-Id')

      if (newConversationId && newConversationId !== 'new') {
        setConversationId(newConversationId)
      }
      if (newThreadId) {
        setThreadId(newThreadId)
      }

      setIsTyping(false)
    },
    onError: (error) => {
      console.error('Chat error:', error)
      setIsTyping(false)
    },
  })

  // Wrap handleSubmit to control typing indicator
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!input.trim()) return

      setIsTyping(true)
      originalHandleSubmit(e)
    },
    [input, originalHandleSubmit]
  )

  // Send initial greeting when chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add a simulated assistant greeting message
      // In production, you might want to fetch this from the API
      const greetingMessage = {
        id: 'greeting',
        role: 'assistant' as const,
        content:
          "Hello! I'm here to help you explore how Nafasi can support your technology needs. We specialize in engineering equity through professional-grade solutions for SMBs and marginalized communities. What's your name?",
      }

      // This will be handled by the messages state from useChat
      // For now, we'll let the first user message trigger the conversation
    }
  }, [isOpen, messages.length])

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
