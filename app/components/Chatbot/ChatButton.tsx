'use client'

import { Box, IconButton } from '@chakra-ui/react'

interface ChatButtonProps {
  onClick: () => void
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <Box
      position="fixed"
      bottom={{ base: '24px', md: '32px' }}
      right={{ base: '24px', md: '32px' }}
      zIndex={998}
    >
      <IconButton
        aria-label="Open chat"
        icon={
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        }
        onClick={onClick}
        size="lg"
        w={16}
        h={16}
        borderRadius="full"
        bg="nafasi.green"
        color="white"
        boxShadow="0 4px 12px rgba(49, 178, 146, 0.4)"
        animation="pulse-glow 2s infinite"
        _hover={{
          bg: 'nafasi.lightGreen',
          transform: 'scale(1.1)',
          boxShadow: '0 4px 20px rgba(49, 178, 146, 0.6)',
        }}
        _active={{
          bg: 'nafasi.greenDark',
          transform: 'scale(1.05)',
        }}
        transition="all 0.3s ease"
      />

      <style jsx global>{`
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 4px 12px rgba(49, 178, 146, 0.4),
              0 0 0 0 rgba(49, 178, 146, 0.7);
          }
          50% {
            box-shadow: 0 4px 12px rgba(49, 178, 146, 0.4),
              0 0 20px 10px rgba(49, 178, 146, 0.3);
          }
        }
      `}</style>
    </Box>
  )
}
