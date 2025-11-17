'use client'

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

export default function Technologies() {
  const logos = [
    { src: '/tech-stack/html5.svg', alt: 'HTML5' },
    { src: '/tech-stack/css3.svg', alt: 'CSS3' },
    { src: '/tech-stack/javascript.svg', alt: 'JavaScript' },
    { src: '/tech-stack/typescript.svg', alt: 'TypeScript' },
    { src: '/tech-stack/nodejs.svg', alt: 'Node.js' },
    { src: '/tech-stack/nextjs.svg', alt: 'Next.js' },
    { src: '/tech-stack/react.svg', alt: 'React' },
    { src: '/tech-stack/expo.svg', alt: 'Expo' },
    { src: '/tech-stack/python.svg', alt: 'Python' },
    { src: '/tech-stack/php.svg', alt: 'PHP' },
    { src: '/tech-stack/postgresql.svg', alt: 'PostgreSQL' },
    { src: '/tech-stack/supabase.svg', alt: 'Supabase' },
    { src: '/tech-stack/vercel.svg', alt: 'Vercel' },
    { src: '/tech-stack/railway.svg', alt: 'Railway' },
    { src: '/tech-stack/tailwindcss.svg', alt: 'Tailwind CSS' },
    { src: '/tech-stack/neo4j.svg', alt: 'Neo4j' },
    { src: '/tech-stack/wordpress.svg', alt: 'WordPress' },
    { src: '/tech-stack/shadcn.png', alt: 'Shadcn UI' },
    { src: '/tech-stack/chakra-ui.svg', alt: 'Chakra UI' },
    { src: '/tech-stack/tanstack.png', alt: 'TanStack' },
    { src: '/tech-stack/particles.png', alt: 'Particles' },
    { src: '/tech-stack/github.svg', alt: 'GitHub' },
    { src: '/tech-stack/aws.svg', alt: 'AWS' },
    { src: '/tech-stack/openai.svg', alt: 'OpenAI' },
    { src: '/tech-stack/perplexity.svg', alt: 'Perplexity' },
    { src: '/tech-stack/midjourney.png', alt: 'Midjourney' },
  ]

  return (
    <Box
      id="technologies"
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
          backgroundImage: "url('/hero/nasa-star-burst-bw-hero.jpg')",
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
              Our Tech Stack
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="white"
              lineHeight="tall"
              textShadow="0 2px 4px rgba(0, 0, 0, 0.8)"
            >
              Our clients expect and deserve the best. We exceed that expectation by deploying industry-leading technologies to deliver exceptional results.
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
              className="technologies-scrolling-track"
              style={{
                display: 'flex',
                gap: '3rem',
                animation: 'technologiesScroll 45s linear infinite',
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
                  title={logo.alt}
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
                  className="technologies-logo-container"
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
                      filter: 'invert(1)',
                      transition: 'filter 0.3s ease',
                    }}
                    className="technologies-logo-image"
                  />
                </Box>
              ))}

              {/* Duplicate set to fill space during animation */}
              {logos.map((logo, index) => (
                <Box
                  key={`logo-2-${index}`}
                  title={logo.alt}
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
                  className="technologies-logo-container"
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
                      filter: 'invert(1)',
                      transition: 'filter 0.3s ease',
                    }}
                    className="technologies-logo-image"
                  />
                </Box>
              ))}
            </div>
          </Box>
        </VStack>
      </Container>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes technologiesScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-180px * 26 - 3rem * 26));
          }
        }
      `}</style>
    </Box>
  )
}
