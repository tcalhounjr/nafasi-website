'use client'

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

export default function Experience() {
  const logos = [
    { src: '/ARNG-large.png', alt: 'Army National Guard' },
    { src: '/US_Air_Force_Logo_Solid_Colour.svg.png', alt: 'U.S. Air Force' },
    { src: '/Seal_of_the_United_States_Department_of_the_Air_Force.svg.png', alt: 'Department of the Air Force' },
    { src: '/Seal_of_the_U.S._Department_of_Veterans_Affairs.svg.png', alt: 'Department of Veterans Affairs' },
    { src: '/dcmo-transparent.png', alt: 'Department of Defense Chief Management Officer' },
    { src: '/Seal_of_the_United_States_Department_of_Homeland_Security.svg.png', alt: 'Department of Homeland Security' },
    { src: '/Seal_of_the_United_States_Department_of_Justice.svg.png', alt: 'Department of Justice' },
    { src: '/BLACKSTAR_Final-01.png', alt: 'Blackstar Diversified Enterprises' },
    { src: '/cpc logo - transparent.png', alt: 'CPC' },
  ]

  return (
    <Box
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
        <VStack gap={{ base: 12, md: 16 }} alignItems="center">
          {/* Section Header */}
          <VStack gap={6} textAlign="center" maxW="3xl">
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              fontWeight="black"
              color="white"
              textTransform="uppercase"
              letterSpacing="tight"
              textShadow="0 0 30px rgba(49, 178, 146, 0.6)"
            >
              Trusted Experience
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="white"
              lineHeight="tall"
              textShadow="0 2px 4px rgba(0, 0, 0, 0.8)"
            >
              Working with leading public and private organizations delivering holistic, mission-critical solutions. We specialize in connecting organizational strategy to the people, processes, and technology expected to execute it.
            </Text>
          </VStack>

          {/* Scrolling Logos Container */}
          <Box
            position="relative"
            width="100%"
            overflow="hidden"
            py={8}
          >
            {/* Left gradient fade */}
            <Box
              position="absolute"
              top={0}
              left={0}
              width="150px"
              height="100%"
              zIndex={2}
              pointerEvents="none"
              style={{
                background: 'linear-gradient(to right, #0a0a0a, transparent)',
              }}
            />

            {/* Right gradient fade */}
            <Box
              position="absolute"
              top={0}
              right={0}
              width="150px"
              height="100%"
              zIndex={2}
              pointerEvents="none"
              style={{
                background: 'linear-gradient(to left, #0a0a0a, transparent)',
              }}
            />

            {/* Scrolling track */}
            <div
              className="experience-scrolling-track"
              style={{
                display: 'flex',
                gap: '3rem',
                animation: 'experienceScroll 40s linear infinite',
                willChange: 'transform',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.animationPlayState = 'paused'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.animationPlayState = 'running'
              }}
            >
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <Box
                  key={`logo-1-${index}`}
                  flexShrink={0}
                  width="180px"
                  height="180px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  padding="1.5rem"
                  border="1px solid"
                  borderColor="rgba(49, 178, 146, 0.2)"
                  borderRadius="md"
                  bg="rgba(255, 255, 255, 0.02)"
                  transition="all 0.3s ease"
                  _hover={{
                    borderColor: '#31b292',
                    bg: 'rgba(49, 178, 146, 0.05)',
                    transform: 'scale(1.05)',
                  }}
                  className="experience-logo-container"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'grayscale(100%) brightness(0.8)',
                      transition: 'filter 0.3s ease',
                    }}
                    className="experience-logo-image"
                  />
                </Box>
              ))}

              {/* Duplicate set for seamless loop */}
              {logos.map((logo, index) => (
                <Box
                  key={`logo-2-${index}`}
                  flexShrink={0}
                  width="180px"
                  height="180px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  padding="1.5rem"
                  border="1px solid"
                  borderColor="rgba(49, 178, 146, 0.2)"
                  borderRadius="md"
                  bg="rgba(255, 255, 255, 0.02)"
                  transition="all 0.3s ease"
                  _hover={{
                    borderColor: '#31b292',
                    bg: 'rgba(49, 178, 146, 0.05)',
                    transform: 'scale(1.05)',
                  }}
                  className="experience-logo-container"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'grayscale(100%) brightness(0.8)',
                      transition: 'filter 0.3s ease',
                    }}
                    className="experience-logo-image"
                  />
                </Box>
              ))}
            </div>
          </Box>
        </VStack>
      </Container>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes experienceScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </Box>
  )
}
