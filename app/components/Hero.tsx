'use client'

import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react'
import ParticlesBackground from './ParticlesBackground'
import { useChatbotContext } from '../contexts/ChatbotContext'

export default function Hero() {
  const { openChatbot } = useChatbotContext()

  const scrollToValueProps = () => {
    const element = document.querySelector('#value-props')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Box id="home" position="relative" minH="100vh" overflow="hidden" bg="nafasi.black">
      {/* Hero Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.4}
        zIndex={0}
        style={{
          backgroundImage: "url('/hero/nasa-star-burst-bw-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark Overlay for Better Text Readability - Adjusted for visible stars */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="radial-gradient(circle at center, rgba(10, 10, 10, 0.3) 0%, rgba(10, 10, 10, 0.5) 100%)"
        zIndex={0}
      />

      {/* Particles Background */}
      <ParticlesBackground />

      {/* Gradient Overlay inspired by exploding star */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="120%"
        h="120%"
        bgGradient="radial(circle at center, rgba(49, 178, 146, 0.15), rgba(26, 77, 122, 0.1), transparent 70%)"
        filter="blur(60px)"
        zIndex={2}
        pointerEvents="none"
      />

      {/* Content */}
      <Container
        maxW="container.xl"
        position="relative"
        zIndex={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        px={{ base: 4, md: 8 }}
      >
        <VStack gap={{ base: 8, md: 10, lg: 12 }} textAlign="center" maxW="5xl">
          {/* Main Headline */}
          <Heading
            as="h1"
            fontSize={{ base: '5xl', md: '7xl', lg: '9xl' }}
            fontWeight="black"
            letterSpacing="tight"
            lineHeight={{ base: '1.1', md: '1', lg: '0.9' }}
            color="white"
            textTransform="uppercase"
            animation="fadeInUp 1s ease-out"
            textShadow="0 0 40px rgba(49, 178, 146, 0.8), 0 4px 8px rgba(0, 0, 0, 0.8)"
            mb={{ base: 4, md: 6 }}
          >
            Engineering Equity
          </Heading>

          {/* Subtitle */}
          <Text
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            color="white"
            maxW="3xl"
            lineHeight="tall"
            fontWeight="bold"
            animation="fadeInUp 1.2s ease-out"
            px={{ base: 4, md: 0 }}
            textShadow="0 2px 8px rgba(0, 0, 0, 0.9)"
          >
            Delivering AI-driven Technology Solutions for Non-technical Founders and Small Businesses
          </Text>

          {/* CTA Button */}
          <Button
            size="lg"
            px={8}
            py={6}
            fontSize="xl"
            bg="nafasi.green"
            color="white"
            onClick={openChatbot}
            _hover={{
              bg: 'nafasi.greenLight',
              transform: 'translateY(-2px)',
              boxShadow: '0 0 30px rgba(49, 178, 146, 0.6)',
            }}
            _active={{
              bg: 'nafasi.greenDark',
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            animation="fadeInUp 1.6s ease-out"
          >
            Start Your Journey
          </Button>

          {/* Scroll Indicator */}
          <Box
            position="absolute"
            bottom={8}
            left="50%"
            transform="translateX(-50%)"
            animation="bounce 2s infinite"
          >
            <Box
              w={6}
              h={10}
              border="2px solid"
              borderColor="nafasi.green"
              borderRadius="full"
              display="flex"
              justifyContent="center"
              pt={2}
            >
              <Box
                w={1.5}
                h={3}
                bg="nafasi.green"
                borderRadius="full"
                animation="scrollIndicator 1.5s infinite"
              />
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
