'use client'

import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

export default function Hero() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: '#0a0a0a',
        },
      },
      fpsLimit: 120,
      particles: {
        color: {
          value: ['#31b292', '#4dd4ae', '#1a4d7a', '#ffffff'],
        },
        links: {
          color: '#31b292',
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none' as const,
          random: true,
          straight: false,
          outModes: {
            default: 'bounce' as const,
          },
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: { min: 0.3, max: 0.8 },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  )

  return (
    <Box position="relative" minH="100vh" overflow="hidden" bg="nafasi.black">
      {/* Particles Background */}
      <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={0}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions as any}
        />
      </Box>

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
        zIndex={1}
        pointerEvents="none"
      />

      {/* Content */}
      <Container
        maxW="container.xl"
        position="relative"
        zIndex={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
      >
        <VStack gap={8} textAlign="center" maxW="4xl">
          {/* Main Headline */}
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
            fontWeight="black"
            letterSpacing="tight"
            lineHeight="shorter"
            bgGradient="linear(to-r, white, nafasi.greenLight)"
            bgClip="text"
            animation="fadeInUp 1s ease-out"
          >
            Engineering Equity
          </Heading>

          {/* Subtitle */}
          <Text
            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
            color="white"
            maxW="3xl"
            lineHeight="tall"
            animation="fadeInUp 1.2s ease-out"
          >
            Delivering AI-driven Technology Solutions for SMBs and Marginalized Communities
          </Text>

          {/* Value Props Pills */}
          <Box
            display="flex"
            gap={4}
            flexWrap="wrap"
            justifyContent="center"
            animation="fadeInUp 1.4s ease-out"
          >
            <Box
              px={4}
              py={2}
              borderRadius="full"
              border="1px solid"
              borderColor="nafasi.green"
              bg="rgba(49, 178, 146, 0.1)"
              color="nafasi.greenLight"
              fontSize="sm"
              fontWeight="semibold"
            >
              Professional Grade
            </Box>
            <Box
              px={4}
              py={2}
              borderRadius="full"
              border="1px solid"
              borderColor="nafasi.green"
              bg="rgba(49, 178, 146, 0.1)"
              color="nafasi.greenLight"
              fontSize="sm"
              fontWeight="semibold"
            >
              Human Centered
            </Box>
            <Box
              px={4}
              py={2}
              borderRadius="full"
              border="1px solid"
              borderColor="nafasi.green"
              bg="rgba(49, 178, 146, 0.1)"
              color="nafasi.greenLight"
              fontSize="sm"
              fontWeight="semibold"
            >
              Forward Looking
            </Box>
          </Box>

          {/* CTA Button */}
          <Button
            size="lg"
            px={8}
            py={6}
            fontSize="xl"
            bg="nafasi.green"
            color="white"
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

      {/* Keyframe Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }

        @keyframes scrollIndicator {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
          }
        }
      `}</style>
    </Box>
  )
}
