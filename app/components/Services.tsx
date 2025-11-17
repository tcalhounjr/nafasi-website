'use client'

import { Box, Container, Heading, Text, SimpleGrid, VStack } from '@chakra-ui/react'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
}

function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <VStack
      gap={6}
      p={8}
      bg="rgba(255, 255, 255, 0.02)"
      borderRadius="lg"
      border="1px solid"
      borderColor="rgba(49, 178, 146, 0.2)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        borderColor: 'nafasi.green',
        bg: 'rgba(49, 178, 146, 0.05)',
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(49, 178, 146, 0.2)',
      }}
      alignItems="center"
      textAlign="center"
    >
      {/* Icon */}
      <Box
        fontSize="4xl"
        w={20}
        h={20}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
        bg="rgba(49, 178, 146, 0.1)"
        border="2px solid"
        borderColor="nafasi.green"
        color="nafasi.greenLight"
      >
        {icon}
      </Box>

      {/* Title */}
      <Heading
        as="h3"
        fontSize={{ base: 'xl', md: '2xl' }}
        fontWeight="bold"
        color="white"
        textTransform="uppercase"
        letterSpacing="tight"
      >
        {title}
      </Heading>

      {/* Description */}
      <Text
        fontSize={{ base: 'md', md: 'lg' }}
        color="nafasi.stardustGray"
        lineHeight="tall"
      >
        {description}
      </Text>
    </VStack>
  )
}

export default function Services() {
  const services = [
    {
      title: 'Business Process Improvement',
      description:
        'Technology only exists to enable existing processes. We start by documenting and improving said processes where possible, ensuring our solutions are oriented towards your desired future.',
      icon: '⚙️',
    },
    {
      title: 'Web Application Development',
      description:
        'Our foundation is building custom web applications with modern frameworks and best practices, delivering responsive, scalable solutions that engage users and drive business growth.',
      icon: '🌐',
    },
    {
      title: 'Mobile Application Development',
      description:
        'Building on that web foundation, we develop cross-platform mobile applications, again leveraging the latest technologies to achieve your current and future business gaols.',
      icon: '📱',
    },
  ]

  return (
    <Box
      id="services"
      as="section"
      position="relative"
      py={{ base: 20, md: 32 }}
      bg="nafasi.black"
      overflow="hidden"
    >
      {/* Subtle cosmic texture background */}
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
        top="20%"
        left="50%"
        transform="translate(-50%, 0)"
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
              Services We Provide
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="white"
              lineHeight="tall"
              textShadow="0 2px 4px rgba(0, 0, 0, 0.8)"
            >
              We leverage technology to improve the processes that most significantly impact our clients, their employees, and their customers.
            </Text>
          </VStack>

          {/* Services Grid */}
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: 8, md: 8, lg: 10 }}
            w="100%"
          >
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
