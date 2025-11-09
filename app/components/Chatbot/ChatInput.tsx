'use client'

import { Box, Input, IconButton } from '@chakra-ui/react'
import { FormEvent } from 'react'

interface ChatInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  placeholder?: string
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder = 'Type your message...',
}: ChatInputProps) {
  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      position="relative"
      p={3}
      borderTop="1px solid"
      borderColor="rgba(49, 178, 146, 0.3)"
      bg="rgba(255, 255, 255, 0.05)"
    >
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isLoading}
        bg="rgba(255, 255, 255, 0.05)"
        border="1px solid"
        borderColor="rgba(49, 178, 146, 0.3)"
        borderRadius="24px"
        color="white"
        fontSize="sm"
        py={6}
        pr={14}
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          borderColor: 'nafasi.green',
          boxShadow: '0 0 0 3px rgba(49, 178, 146, 0.2)',
          outline: 'none',
        }}
        _disabled={{
          opacity: 0.6,
          cursor: 'not-allowed',
        }}
      />

      <IconButton
        type="submit"
        aria-label="Send message"
        icon={
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
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        }
        position="absolute"
        right="20px"
        top="50%"
        transform="translateY(-50%)"
        size="sm"
        w={10}
        h={10}
        borderRadius="full"
        bg="nafasi.green"
        color="white"
        isDisabled={isLoading || !value.trim()}
        _hover={{
          bg: 'nafasi.lightGreen',
          transform: 'translateY(-50%) scale(1.05)',
          boxShadow: '0 0 12px rgba(49, 178, 146, 0.4)',
        }}
        _active={{
          bg: 'nafasi.greenDark',
        }}
        _disabled={{
          opacity: 0.5,
          cursor: 'not-allowed',
          _hover: {
            bg: 'nafasi.green',
            transform: 'translateY(-50%)',
            boxShadow: 'none',
          },
        }}
        transition="all 0.2s"
      />
    </Box>
  )
}
