'use client'

import { Box, Flex, Heading, Text, IconButton, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import ChatInput from './ChatInput'

interface Message {
  id: string
  role: 'user' | 'assistant'
  parts: Array<{ type: 'text'; text: string }>
}

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  messages: Message[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  isTyping: boolean
  conversationId?: string | null
}

export default function ChatModal({
  isOpen,
  onClose,
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  isTyping,
  conversationId,
}: ChatModalProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Generate a user-friendly meeting ID from the conversation UUID
  // Format: ID + 6 random digits derived from UUID
  const getMeetingId = (id: string | null | undefined): string => {
    if (!id) return ''
    // Use the UUID to generate a deterministic but randomized-looking 6-digit number
    const hash = id.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0)
    }, 0)
    const randomDigits = String(Math.abs(hash) % 1000000).padStart(6, '0')
    return `ID${randomDigits}`
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.8)"
        backdropFilter="blur(4px)"
        zIndex={999}
        onClick={onClose}
      />

      {/* Chat Modal */}
      <Box
        position="fixed"
        bottom={{ base: 0, md: '32px' }}
        right={{ base: 0, md: '32px' }}
        width={{ base: '100vw', md: '400px' }}
        maxW="95vw"
        height={{ base: '100vh', md: '600px' }}
        maxH={{ base: '100vh', md: '90vh' }}
        bg="rgba(10, 10, 10, 0.95)"
        border="1px solid"
        borderColor="rgba(49, 178, 146, 0.3)"
        borderRadius={{ base: 0, md: '16px' }}
        boxShadow="0 8px 32px rgba(49, 178, 146, 0.2)"
        zIndex={1000}
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        {/* Header */}
        <Flex
          p={4}
          bg="rgba(49, 178, 146, 0.1)"
          borderBottom="1px solid"
          borderColor="rgba(49, 178, 146, 0.3)"
          alignItems="center"
          justifyContent="space-between"
        >
          <VStack gap={0} alignItems="flex-start" flex={1}>
            <Heading size="md" color="white" fontWeight="bold">
              Chat with Nafasi
            </Heading>
            <Text fontSize="xs" color="gray.400">
              Engineering Equity
            </Text>
            {conversationId && (
              <Box mt={2} p={2} bg="rgba(49, 178, 146, 0.2)" borderRadius="6px" width="100%">
                <Text fontSize="xs" color="gray.300" mb={1}>
                  Your Meeting ID:
                </Text>
                <Text fontSize="sm" color="#31b292" fontFamily="monospace" fontWeight="bold">
                  {getMeetingId(conversationId)}
                </Text>
              </Box>
            )}
          </VStack>

          <IconButton
            aria-label="Close chat"
            onClick={onClose}
            variant="ghost"
            size="sm"
            color="white"
            _hover={{
              bg: 'rgba(255, 255, 255, 0.1)',
              color: 'nafasi.green',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </IconButton>
        </Flex>

        {/* Messages Area */}
        <Box
          flex={1}
          overflowY="auto"
          p={4}
          css={{
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#31b292',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#4dd4ae',
            },
          }}
        >
          {messages.length === 0 && (
            <Box textAlign="center" py={8}>
              <Text color="gray.400" fontSize="sm">
                Welcome! Send a message to start the conversation.
              </Text>
            </Box>
          )}

          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role}
              parts={message.parts}
              conversationId={conversationId || undefined}
            />
          ))}

          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <ChatInput
          value={input}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Box>
    </>
  )
}
