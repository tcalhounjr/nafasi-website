'use client'

import { Box, Container, Flex, Link, Image, VStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Why Nafasi', href: '#value-props' },
  { name: 'Experience', href: '#experience' },
  { name: 'Services', href: '#services' },
  { name: 'Technologies', href: '#technologies' },
  { name: 'Solutions', href: '#solutions' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  // Only render on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    onClose() // Close mobile menu after clicking
  }

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="rgba(10, 10, 10, 0.8)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Container maxW="7xl" py={4}>
        <Flex justifyContent="space-between" alignItems="center">
          {/* Logo */}
          <Link href="#home" onClick={(e) => scrollToSection(e, '#home')}>
            <Image
              src="/footer/updated-nafasi-logo.png"
              alt="Nafasi Logo"
              height={{ base: '40px', md: '50px' }}
              width="auto"
              objectFit="contain"
              transition="transform 0.2s"
              _hover={{
                transform: 'scale(1.05)',
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <Flex
            gap={8}
            display={{ base: 'none', md: 'flex' }}
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                fontSize="md"
                fontWeight="medium"
                color="gray.300"
                position="relative"
                _hover={{
                  color: 'nafasi.green',
                  textDecoration: 'none',
                  _after: {
                    width: '100%',
                  },
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '0%',
                  height: '2px',
                  bg: 'nafasi.green',
                  transition: 'width 0.3s ease',
                }}
                transition="color 0.2s"
              >
                {link.name}
              </Link>
            ))}
          </Flex>

          {/* Mobile Menu Button */}
          <Box
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            cursor="pointer"
            p={2}
            color="white"
            _hover={{
              color: 'nafasi.green',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Box>
        </Flex>
      </Container>

      {/* Mobile Menu Overlay - Only render on client */}
      {mounted && isOpen && (
        <>
          {/* Backdrop */}
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.7)"
            zIndex={999}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <Box
            position="fixed"
            top={0}
            right={0}
            bottom={0}
            width="280px"
            bg="nafasi.black"
            zIndex={1001}
            borderLeft="1px solid"
            borderColor="whiteAlpha.200"
            p={6}
          >
            {/* Close Button */}
            <Flex justifyContent="space-between" alignItems="center" mb={8}>
              <Image
                src="/footer/updated-nafasi-logo.png"
                alt="Nafasi Logo"
                height="40px"
                width="auto"
                objectFit="contain"
              />
              <Box
                onClick={onClose}
                cursor="pointer"
                p={2}
                color="white"
                _hover={{ color: 'nafasi.green' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Box>
            </Flex>

            {/* Navigation Links */}
            <VStack gap={6} alignItems="flex-start">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  fontSize="lg"
                  fontWeight="medium"
                  color="gray.300"
                  _hover={{
                    color: 'nafasi.green',
                    textDecoration: 'none',
                  }}
                  transition="color 0.2s"
                >
                  {link.name}
                </Link>
              ))}
            </VStack>
          </Box>
        </>
      )}
    </Box>
  )
}
