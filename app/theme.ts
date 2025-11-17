import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

// Nafasi Color Palette
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        nafasi: {
          green: { value: '#31b292' },
          greenLight: { value: '#4dd4ae' },
          greenDark: { value: '#228d70' },
          black: { value: '#0a0a0a' },
          menuBg: { value: '#0a0a0a' },
          cosmicBlue: { value: '#1a4d7a' },
          cosmicBlueDark: { value: '#0d2d47' },
          white: { value: '#ffffff' },
          stardustGray: { value: '#8a8a8a' },
        },
      },
      fonts: {
        heading: { value: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` },
        body: { value: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` },
      },
    },
  },
  globalCss: {
    'html, body': {
      bg: 'nafasi.black',
      color: 'white',
      fontFamily: 'body',
      lineHeight: 'tall',
    },
  },
})

export const system = createSystem(defaultConfig, config)
