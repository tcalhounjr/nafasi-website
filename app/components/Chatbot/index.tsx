'use client'

import ChatButton from './ChatButton'
import ChatModal from './ChatModal'
import { useChatbot } from './useChatbot'

export default function Chatbot() {
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
