'use client'

import { Box, Container, Flex, Heading, Text, Button, VStack, HStack, Link, Image } from '@chakra-ui/react'

const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Why Nafasi', href: '#value-props' },
  { name: 'Experience', href: '#experience' },
  { name: 'Services', href: '#services' },
  { name: 'Technologies', href: '#technologies' },
  { name: 'Solutions', href: '#solutions' },
]

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/tcalhounjr' },
  { name: 'Twitter', href: 'https://www.twitter.com/tdcalhounjr' },
  { name: 'GitHub', href: 'https://www.github.com/tcalhounjr' },
]

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Box
      as="footer"
      position="relative"
      minHeight="25vh"
      display="flex"
      alignItems="center"
      overflow="hidden"
    >
      {/* Black Hole Background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage="url('/footer/black-hole-footer-half-light.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        opacity={0.4}
        zIndex={0}
      />

      {/* Dark Vignette Overlay - Darker for readability */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="radial-gradient(circle at center, rgba(10, 10, 10, 0.5) 0%, rgba(10, 10, 10, 0.7) 100%)"
        zIndex={1}
      />

      <Container maxW="7xl" position="relative" zIndex={2} py={{ base: 12, md: 16 }}>
        <VStack gap={10}>
          {/* Logo + CTA Section */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 8, md: 12 }}
            alignItems={{ base: 'center', md: 'flex-start' }}
            width="100%"
          >
            {/* Logo - Left aligned, vertically centered with title */}
            <Box flexShrink={0} mt={{ base: 0, md: '-8px' }}>
              <Image
                src="/footer/updated-nafasi-logo.png"
                alt="Nafasi Logo"
                height={{ base: '50px', md: '60px' }}
                width="auto"
                objectFit="contain"
              />
            </Box>

            {/* CTA Section - Centered */}
            <VStack gap={6} textAlign="center" flex={1} alignItems="center">
              <Heading
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
                color="white"
                textShadow="0 0 20px rgba(49, 178, 146, 0.3)"
              >
                Let&apos;s Build Your Future
              </Heading>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.300"
                maxW="2xl"
              >
                Ready to transform your vision into reality? Let&apos;s start a conversation about how we can engineer equity together.
              </Text>
              <Button
                size="lg"
                bg="nafasi.green"
                color="white"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="bold"
                _hover={{
                  bg: 'nafasi.lightGreen',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 30px rgba(49, 178, 146, 0.5)',
                }}
                transition="all 0.3s ease"
              >
                Start Your Journey
              </Button>
            </VStack>
          </Flex>

          {/* Navigation Links */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 4, md: 8 }}
            justifyContent="center"
            flexWrap="wrap"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                fontSize="md"
                color="gray.400"
                _hover={{
                  color: 'nafasi.green',
                  textDecoration: 'none',
                }}
                transition="color 0.2s"
              >
                {link.name}
              </Link>
            ))}
          </Flex>

          {/* Social Links */}
          <HStack gap={6}>
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                fontSize="sm"
                color="gray.500"
                _hover={{
                  color: 'nafasi.green',
                  textDecoration: 'none',
                }}
                transition="color 0.2s"
              >
                {link.name}
              </Link>
            ))}
          </HStack>

          {/* Bottom Bar */}
          <Box
            borderTop="1px solid"
            borderColor="whiteAlpha.200"
            pt={8}
            width="100%"
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              gap={4}
            >
              <Text fontSize="sm" color="gray.500">
                © {new Date().getFullYear()} Nafasi. Engineering Equity.
              </Text>
              <HStack gap={6}>
                <Link
                  href="#"
                  fontSize="sm"
                  color="gray.500"
                  _hover={{
                    color: 'nafasi.green',
                    textDecoration: 'none',
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  fontSize="sm"
                  color="gray.500"
                  _hover={{
                    color: 'nafasi.green',
                    textDecoration: 'none',
                  }}
                >
                  Terms of Service
                </Link>
              </HStack>
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
