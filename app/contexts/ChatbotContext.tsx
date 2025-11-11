'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ChatbotContextType {
  isOpen: boolean
  openChatbot: () => void
  closeChatbot: () => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openChatbot = () => setIsOpen(true)
  const closeChatbot = () => setIsOpen(false)

  return (
    <ChatbotContext.Provider value={{ isOpen, openChatbot, closeChatbot }}>
      {children}
    </ChatbotContext.Provider>
  )
}

export function useChatbotContext() {
  const context = useContext(ChatbotContext)
  if (context === undefined) {
    throw new Error('useChatbotContext must be used within a ChatbotProvider')
  }
  return context
}
