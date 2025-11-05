import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// Nafasi Color Palette
const colors = {
  nafasi: {
    green: '#31b292',
    greenLight: '#4dd4ae',
    greenDark: '#228d70',
    black: '#0a0a0a',
    cosmicBlue: '#1a4d7a',
    cosmicBlueDark: '#0d2d47',
    white: '#ffffff',
    stardustGray: '#8a8a8a',
  },
}

// Theme configuration
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// Typography - Futuristic sans-serif
const fonts = {
  heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
}

// Component style overrides
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'lg',
    },
    variants: {
      solid: {
        bg: 'nafasi.green',
        color: 'white',
        _hover: {
          bg: 'nafasi.greenLight',
          transform: 'translateY(-2px)',
          boxShadow: '0 0 20px rgba(49, 178, 146, 0.6)',
        },
        _active: {
          bg: 'nafasi.greenDark',
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      outline: {
        borderColor: 'nafasi.green',
        color: 'nafasi.green',
        _hover: {
          bg: 'rgba(49, 178, 146, 0.1)',
          transform: 'translateY(-2px)',
        },
      },
    },
    defaultProps: {
      variant: 'solid',
    },
  },
  Link: {
    baseStyle: {
      color: 'nafasi.green',
      _hover: {
        textDecoration: 'none',
        color: 'nafasi.greenLight',
      },
    },
  },
  Heading: {
    baseStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
  },
  Text: {
    baseStyle: {
      color: 'white',
    },
  },
}

// Global styles
const styles = {
  global: {
    'html, body': {
      bg: 'nafasi.black',
      color: 'white',
      fontFamily: 'body',
      lineHeight: 'tall',
    },
    '*::placeholder': {
      color: 'nafasi.stardustGray',
    },
    '*, *::before, *::after': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
}

// Extend the theme
const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles,
})

export default theme
