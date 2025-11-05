'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Box } from '@chakra-ui/react'

// Dynamically import Particles with no SSR
const Particles = dynamic(() => import('@tsparticles/react'), {
  ssr: false,
})

export default function ParticlesBackground() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
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

  if (!isClient) {
    return null
  }

  return (
    <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={1}>
      <Particles id="tsparticles" options={particlesOptions as any} />
    </Box>
  )
}
