'use client'

import { useState, useEffect } from 'react'
import ChatButton from './ChatButton'
import ChatModal from './ChatModal'
import { useChatbot } from './useChatbot'
import { useChatbotContext } from '../../contexts/ChatbotContext'

export default function Chatbot() {
  const [mounted, setMounted] = useState(false)
  const { isOpen, openChatbot, closeChatbot } = useChatbotContext()
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isTyping,
    handleClose: handleChatbotClose,
    conversationId,
  } = useChatbot(isOpen)

  // Only render on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleClose = () => {
    handleChatbotClose()
    closeChatbot()
  }

  return (
    <>
      {!isOpen && <ChatButton onClick={openChatbot} />}

      <ChatModal
        isOpen={isOpen}
        onClose={handleClose}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isTyping={isTyping}
        conversationId={conversationId}
      />
    </>
  )
}
