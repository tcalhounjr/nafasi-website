'use client'

import { Box, Container, Heading, Text, VStack, Grid, GridItem, IconButton } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'

export default function Problems() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const problems = [
    {
      image: '/afrofuturistic-trading.png',
      title: 'Roughly 67% of African Americans do not Own Stocks',
      description: 'The capital markets might be the greatest wealth creation tool known to man. We are building a platform to significantly increase market participation in this group.',
    },
    {
      image: '/afrofuturistic-business-district.png',
      title: 'Successful Black Founders Struggle to Exit Gracefully',
      description: 'Regardless of gender or orientation, less than 1% of Black founders raise venture funding as a startup. And, even if they do bootstrap their way to success, exiting gracefully is equally difficult.',
    },
    {
      image: '/afrofuturesitc-bank-lobby.png',
      title: 'Minority Businesses Lose Access to $70M in Grant and Program Funding',
      description: 'CDFIs rely on the MBDA for programming and access to grants in support of unerrepresented business owners. It is incumbent upon constituents of the surrounding communities CDFIs serve to replace said funding.',
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % problems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + problems.length) % problems.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % problems.length)
      }, 5000) // Auto-advance every 5 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered, problems.length])

  return (
    <Box
      id="solutions"
      as="section"
      position="relative"
      py={{ base: 20, md: 32 }}
      bg="nafasi.black"
      overflow="hidden"
    >
      {/* Cosmic background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.03}
        style={{
          backgroundImage: "url('/nasa-star-burst-bw-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        zIndex={0}
      />

      {/* Green accent gradient */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="80%"
        h="60%"
        bgGradient="radial(circle at center, rgba(49, 178, 146, 0.08), transparent 60%)"
        filter="blur(80px)"
        zIndex={0}
        pointerEvents="none"
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        {/* Section Header */}
        <VStack gap={6} textAlign="center" maxW="4xl" mx="auto" mb={{ base: 12, md: 16 }}>
          <Heading
            as="h2"
            fontSize={{ base: '2xl', sm: '3xl', md: '5xl', lg: '6xl' }}
            fontWeight="black"
            color="white"
            textTransform="uppercase"
            letterSpacing="tight"
            textShadow="0 0 30px rgba(49, 178, 146, 0.6)"
            lineHeight={{ base: '1.2', md: '1.1' }}
          >
            Problems We're Solving
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color="white"
            lineHeight="tall"
            textShadow="0 2px 4px rgba(0, 0, 0, 0.8)"
          >
            Ensuring marginalized communities are thriving by creating equitable access to opportunities is more than a mission; it's a foundational part of Nafasi's human-centered corporate ethos
          </Text>
        </VStack>

        {/* Grid Layout: 2/3 left (carousel), 1/3 right (video) */}
        <Grid
          templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
          gap={0}
          alignItems="stretch"
        >
          {/* Left: Image Carousel */}
          <GridItem>
            <Box
              position="relative"
              height={{ base: '500px', md: '600px' }}
              overflow="hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                boxShadow: '10px 0 30px -10px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Carousel Track */}
              <div
                style={{
                  display: 'flex',
                  height: '100%',
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
              >
                {problems.map((problem, index) => (
                  <Box
                    key={index}
                    position="relative"
                    flexShrink={0}
                    width="100%"
                    height="100%"
                  >
                    {/* Background Image */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      w="100%"
                      h="100%"
                      style={{
                        backgroundImage: `url('${problem.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                      _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: 'linear-gradient(to top, rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.3))',
                      }}
                    />

                    {/* Text Overlay */}
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      padding={{ base: 6, md: 8 }}
                      zIndex={1}
                      pb={{ base: 20, md: 24 }}
                    >
                      <VStack gap={3} alignItems="flex-start">
                        <Heading
                          as="h3"
                          fontSize={{ base: 'xl', md: '2xl' }}
                          fontWeight="bold"
                          color="white"
                          textShadow="0 2px 4px rgba(0, 0, 0, 0.8)"
                        >
                          {problem.title}
                        </Heading>
                        <Text
                          fontSize={{ base: 'md', md: 'lg' }}
                          color="rgba(255, 255, 255, 0.9)"
                          lineHeight="tall"
                          textShadow="0 2px 4px rgba(0, 0, 0, 0.8)"
                        >
                          {problem.description}
                        </Text>
                      </VStack>
                    </Box>
                  </Box>
                ))}
              </div>

              {/* Navigation Controls */}
              <Box
                position="absolute"
                bottom={8}
                left={0}
                right={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={4}
                zIndex={2}
              >
                {/* Previous Button */}
                <IconButton
                  aria-label="Previous slide"
                  onClick={prevSlide}
                  size="sm"
                  bg="rgba(49, 178, 146, 0.2)"
                  color="white"
                  border="1px solid"
                  borderColor="rgba(49, 178, 146, 0.4)"
                  _hover={{
                    bg: 'rgba(49, 178, 146, 0.3)',
                    borderColor: '#31b292',
                    transform: 'scale(1.1)',
                  }}
                  transition="all 0.3s ease"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </IconButton>

                {/* Dot Indicators */}
                <Box display="flex" gap={2}>
                  {problems.map((_, index) => (
                    <Box
                      key={index}
                      as="button"
                      onClick={() => goToSlide(index)}
                      width="10px"
                      height="10px"
                      borderRadius="full"
                      bg={currentIndex === index ? '#31b292' : 'rgba(255, 255, 255, 0.3)'}
                      border="1px solid"
                      borderColor={currentIndex === index ? '#31b292' : 'rgba(49, 178, 146, 0.4)'}
                      transition="all 0.3s ease"
                      cursor="pointer"
                      _hover={{
                        bg: currentIndex === index ? '#31b292' : 'rgba(49, 178, 146, 0.5)',
                        transform: 'scale(1.2)',
                      }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </Box>

                {/* Next Button */}
                <IconButton
                  aria-label="Next slide"
                  onClick={nextSlide}
                  size="sm"
                  bg="rgba(49, 178, 146, 0.2)"
                  color="white"
                  border="1px solid"
                  borderColor="rgba(49, 178, 146, 0.4)"
                  _hover={{
                    bg: 'rgba(49, 178, 146, 0.3)',
                    borderColor: '#31b292',
                    transform: 'scale(1.1)',
                  }}
                  transition="all 0.3s ease"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </IconButton>
              </Box>
            </Box>
          </GridItem>

          {/* Right: Video */}
          <GridItem>
            <Box
              position="sticky"
              top="2rem"
              height={{ base: '500px', md: '600px' }}
              overflow="hidden"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              >
                <source src="/problems-were-solving-3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
