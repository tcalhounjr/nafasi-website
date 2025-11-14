'use client'

import { Box, Text } from '@chakra-ui/react'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  parts: Array<{ type: 'text'; text: string }>
  timestamp?: string
}

export default function MessageBubble({ role, parts, timestamp }: MessageBubbleProps) {
  const isUser = role === 'user'

  // Format timestamp
  const formatTime = (ts?: string) => {
    if (!ts) {
      const now = new Date()
      return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    const date = new Date(ts)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  // Extract text content from UIMessage parts
  const getTextContent = () => {
    return parts
      .map((part) => {
        if (part.type === 'text') {
          return part.text
        }
        return ''
      })
      .join('')
  }

  // Parse text and convert URLs to clickable links
  const renderTextWithLinks = () => {
    const text = getTextContent()
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'underline',
              opacity: 1,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {part}
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={isUser ? 'flex-end' : 'flex-start'}
      gap={1}
      mb={4}
    >
      <Box
        bg={
          isUser
            ? 'linear-gradient(135deg, #31b292, #4dd4ae)'
            : 'rgba(255, 255, 255, 0.1)'
        }
        color="white"
        border={isUser ? 'none' : '1px solid'}
        borderColor={isUser ? 'transparent' : 'whiteAlpha.200'}
        borderRadius={isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px'}
        p={3}
        px={4}
        maxW="80%"
        boxShadow={isUser ? '0 2px 8px rgba(49, 178, 146, 0.3)' : 'none'}
      >
        <Text fontSize="sm" lineHeight="tall" whiteSpace="pre-wrap">
          {renderTextWithLinks()}
        </Text>
      </Box>

      <Text fontSize="xs" color="gray.500" px={2}>
        {formatTime(timestamp)}
      </Text>
    </Box>
  )
}
