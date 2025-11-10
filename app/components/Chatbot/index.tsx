'use client'

import { useState, useEffect } from 'react'
import ChatButton from './ChatButton'
import ChatModal from './ChatModal'
import { useChatbot } from './useChatbot'

export default function Chatbot() {
  const [mounted, setMounted] = useState(false)
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isTyping,
    isOpen,
    setIsOpen,
  } = useChatbot()

  // Only render on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}

      <ChatModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isTyping={isTyping}
      />
    </>
  )
}
