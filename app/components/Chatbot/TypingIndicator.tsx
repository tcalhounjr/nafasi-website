'use client'

import { Box } from '@chakra-ui/react'

export default function TypingIndicator() {
  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      p={3}
      bg="rgba(255, 255, 255, 0.1)"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="16px 16px 16px 4px"
      maxW="80px"
      mr="auto"
    >
      <Box
        w={2}
        h={2}
        bg="nafasi.green"
        borderRadius="full"
        animation="bounce 1.4s infinite ease-in-out"
        style={{ animationDelay: '0s' }}
      />
      <Box
        w={2}
        h={2}
        bg="nafasi.green"
        borderRadius="full"
        animation="bounce 1.4s infinite ease-in-out"
        style={{ animationDelay: '0.2s' }}
      />
      <Box
        w={2}
        h={2}
        bg="nafasi.green"
        borderRadius="full"
        animation="bounce 1.4s infinite ease-in-out"
        style={{ animationDelay: '0.4s' }}
      />

      <style jsx global>{`
        @keyframes bounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </Box>
  )
}
