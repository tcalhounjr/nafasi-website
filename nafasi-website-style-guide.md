# Nafasi Website Style Guide

## Brand Identity

**Tagline:** "Engineering Equity"

**Mission:** Delivering AI-driven Technology Solutions for SMBs and Marginalized Communities

**Core Values:**
- Professional Grade
- Human Centered
- Forward Looking

---

## Design Philosophy: Afrofuturism

### Inspiration Sources

**Primary Visual Reference:** NASA Star Burst B&W Hero Image
- Cosmic, expansive, limitless potential
- Stars representing opportunity and innovation
- Deep space aesthetic symbolizing the future

**Interaction & UX Reference:** [Parsec Computer](https://parsec.app)
- Segmented scroll sections
- Clean, modern interface patterns
- Smooth transitions and micro-interactions
- Tech-forward without being overwhelming

### Afrofuturism Principles

**1. Cosmic & Space Themes**
- Deep blacks (#0a0a0a) representing the cosmos
- Luminous gradients suggesting nebulae and star formations
- Particle effects simulating stardust and cosmic movement
- Radial gradients inspired by exploding stars

**2. Technology as Liberation**
- AI-powered chatbot instead of traditional forms (forward-thinking)
- Professional-grade tools democratized for SMBs and marginalized communities
- Technology serves equity, not just efficiency

**3. Bold, Futuristic Typography**
- Uppercase headlines for impact and authority
- Large, black font weights (900) for "Engineering Equity"
- Inter font family for modern, professional feel
- Tight letter-spacing for a compressed, futuristic look

**4. Movement & Energy**
- Animated particles suggesting constant innovation
- Fade-in-up animations for content entrance
- Smooth scroll indicators
- Hover effects with glow and elevation

---

## Color Palette

### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Nafasi Green** | `#31b292` | Primary brand color, CTAs, links, accents |
| **Nafasi Green Light** | `#4dd4ae` | Hover states, highlights, secondary accents |
| **Nafasi Green Dark** | `#228d70` | Active states, pressed buttons |
| **Nafasi Black** | `#0a0a0a` | Primary background, cosmic depth |
| **Cosmic Blue** | `#1a4d7a` | Secondary accent, gradient overlays |
| **Cosmic Blue Dark** | `#0d2d47` | Depth in gradients |
| **White** | `#ffffff` | Primary text color, high contrast elements |
| **Stardust Gray** | `#8a8a8a` | Muted text, subtle UI elements |

### Color Applications

**Backgrounds:**
- Primary: Nafasi Black (#0a0a0a)
- Overlays: Radial gradients with Nafasi Green and Cosmic Blue at low opacity

**Text:**
- Headlines: White (#ffffff) with green glow shadows
- Body: White (#ffffff) with black drop shadows for readability
- Links/CTAs: Nafasi Green (#31b292)

**Interactive Elements:**
- Default: Nafasi Green (#31b292)
- Hover: Nafasi Green Light (#4dd4ae) + glow effect
- Active: Nafasi Green Dark (#228d70)

**Particle Effects:**
- Mix of: Nafasi Green (#31b292), Nafasi Green Light (#4dd4ae), Cosmic Blue (#1a4d7a), White (#ffffff)

---

## Typography

### Font Family
**Primary:** Inter (Google Fonts)
- Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Heading Hierarchy

| Element | Desktop Size | Tablet Size | Mobile Size | Weight | Transform | Line Height |
|---------|-------------|-------------|-------------|--------|-----------|-------------|
| **H1 (Hero)** | 9xl (128px) | 7xl (72px) | 5xl (48px) | Black (900) | Uppercase | 0.9-1.1 |
| **H2 (Section)** | 5xl-6xl | 4xl-5xl | 3xl-4xl | Bold (700) | None | 1.1 |
| **H3 (Subsection)** | 3xl-4xl | 2xl-3xl | xl-2xl | Semibold (600) | None | 1.2 |

### Body Text

| Element | Desktop Size | Tablet Size | Mobile Size | Weight | Line Height |
|---------|-------------|-------------|-------------|--------|-------------|
| **Large Body (Subtitle)** | 3xl (30px) | 2xl (24px) | xl (20px) | Bold (700) | Tall (1.625) |
| **Body** | xl (20px) | lg (18px) | md (16px) | Regular (400) | Tall (1.625) |
| **Small** | md (16px) | sm (14px) | sm (14px) | Regular (400) | Normal (1.5) |

### Text Shadows for Readability

**Hero Headline:**
```css
text-shadow: 0 0 40px rgba(49, 178, 146, 0.8), 0 4px 8px rgba(0, 0, 0, 0.8)
```
- Green glow for futuristic feel
- Black drop shadow for legibility over cosmic background

**Subtitle/Large Body:**
```css
text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9)
```
- Strong black shadow for readability

---

## Layout & Spacing

### Container Widths
- **Max Width:** `container.xl` (1280px)
- **Content Max Width:** 3xl-5xl (768px-896px) for readability
- **Padding:** Base: 16px (4), Medium: 32px (8), Large: 48px (12)

### Vertical Rhythm
- **Section Spacing:** 80px-120px between major sections
- **Element Spacing:** 32px-48px between related elements
- **Micro Spacing:** 16px-24px for tight groups

### Responsive Breakpoints
- **Mobile:** < 768px (base)
- **Tablet:** 768px - 1024px (md)
- **Desktop:** > 1024px (lg, xl)

---

## Components

### Hero Section

**Structure:**
1. NASA star burst background (40% opacity)
2. Dark vignette overlay (30% center → 50% edges)
3. Animated cosmic particles (client-side only)
4. Green/blue radial gradient overlay (blurred)
5. Content (headline, subtitle, CTA)
6. Scroll indicator

**Key Styling:**
- Full viewport height (100vh)
- Layered z-index: Background (0) → Particles (1) → Gradient (2) → Content (3)
- Centered content with VStack gap: 32px-48px

### Buttons (CTA)

**Default State:**
```css
background: #31b292
color: #ffffff
padding: 24px 32px
font-size: 20px
border-radius: md
```

**Hover State:**
```css
background: #4dd4ae
transform: translateY(-2px)
box-shadow: 0 0 30px rgba(49, 178, 146, 0.6)
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

**Active State:**
```css
background: #228d70
```

### Value Proposition Pills (Planned)

**Structure:** Horizontal flex layout with gap
**Styling:**
```css
padding: 8px 16px
border-radius: full
border: 1px solid #31b292
background: rgba(49, 178, 146, 0.1)
color: #4dd4ae
font-size: 14px
font-weight: semibold
```

---

## Animation & Motion

### Entrance Animations

**Fade In Up:**
```css
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
```
**Timing:**
- Hero Headline: 1s
- Subtitle: 1.2s
- Value Props: 1.4s
- CTA: 1.6s

### Scroll Indicator

**Bounce Animation:**
```css
@keyframes bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}
animation: bounce 2s infinite
```

**Inner Dot Animation:**
```css
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
animation: scrollIndicator 1.5s infinite
```

### Micro-Interactions

**Button Hover:**
- Elevation: translateY(-2px)
- Glow: box-shadow with green tint
- Transition: cubic-bezier(0.4, 0, 0.2, 1) for smooth, natural feel

**Particles:**
- Random movement in all directions
- Speed: 1px/frame
- Opacity animation: 0.3-0.8
- Connected within 150px distance

---

## Particle System Configuration

### Visual Properties
- **Count:** 80 particles
- **Colors:** Mix of Nafasi Green (#31b292), Light (#4dd4ae), Cosmic Blue (#1a4d7a), White
- **Size:** 1-3px radius
- **Shape:** Circle
- **Opacity:** 0.3-0.8 with animation

### Behavior
- **Movement:** Random, non-linear, outModes: bounce
- **Links:** Connect particles within 150px, opacity 0.3
- **Animation Speed:** 1px/frame for gentle cosmic drift
- **FPS Limit:** 120
- **Retina Support:** Enabled

---

## Background Treatments

### Hero Background Layers (Bottom to Top)

**Layer 1: Image**
```css
background-image: url('/nasa-star-burst-bw-hero.jpg')
background-size: cover
background-position: center
opacity: 0.4
```

**Layer 2: Vignette**
```css
background: radial-gradient(
  circle at center,
  rgba(10, 10, 10, 0.3) 0%,
  rgba(10, 10, 10, 0.5) 100%
)
```

**Layer 3: Particles**
- Dynamic, client-rendered
- Full viewport coverage

**Layer 4: Cosmic Gradient**
```css
background: radial-gradient(
  circle at center,
  rgba(49, 178, 146, 0.15),
  rgba(26, 77, 122, 0.1),
  transparent 70%
)
filter: blur(60px)
```

---

## Future Section Guidelines

### Value Propositions Section
- **Layout:** 3-column grid (desktop), stack on mobile
- **Icon Style:** Abstract, geometric shapes with green/blue gradients
- **Background:** Subtle cosmic texture, lighter than hero
- **Cards:** Dark background with green border on hover

### Services Section
- **Layout:** Alternating left/right content-image layout
- **Visual Style:** Screenshots with green glow overlay
- **Emphasis:** Technology as accessible, not intimidating

### Mission/About Section
- **Tone:** Human-centered, warm despite tech aesthetic
- **Visual:** Team silhouettes with cosmic overlay
- **Text:** Larger body text for emphasis on equity mission

### AI Chatbot
- **Position:** Floating bottom-right
- **Icon:** Cosmic bubble with pulsing green glow
- **Interface:** Dark modal with green accents
- **Personality:** Professional but approachable, emphasizes partnership

### Footer
- **Background:** Deepest black with particle texture
- **Layout:** Multi-column (desktop), stacked (mobile)
- **Links:** Stardust gray with green hover state
- **Social Icons:** Simple, outlined, green on hover

---

## Accessibility Considerations

### Contrast Ratios
- White text on Nafasi Black: 21:1 (AAA)
- Nafasi Green on Nafasi Black: 4.8:1 (AA)
- Ensure all interactive elements meet WCAG 2.1 AA standards

### Motion
- Provide reduced-motion alternatives for animations
- Particles should be optional/removable for accessibility

### Focus States
- Visible focus indicators with 2px green outline
- Skip-to-content link for keyboard navigation

---

## Technical Implementation Notes

### Chakra UI v3 Compatibility
- Use `style` prop for `backgroundImage`, `backgroundSize`, `backgroundPosition`
- Use Chakra props for layout: `position`, `w`, `h`, `opacity`, `zIndex`
- Use `bgGradient` prop for gradients

### Next.js Optimization
- Dynamic import for Particles with `ssr: false`
- Client-side check with `useEffect` for hydration safety
- `suppressHydrationWarning` on components with client-only rendering

### Performance
- Lazy load sections below the fold
- Optimize NASA hero image (WebP with JPG fallback)
- Limit particle count on mobile devices

---

## Brand Voice & Messaging

### Tone
- **Professional** but not corporate
- **Innovative** but not exclusionary
- **Confident** but not arrogant
- **Forward-looking** but grounded in today's needs

### Key Messages
- Technology should serve equity, not just efficiency
- Professional-grade tools for everyone
- The future is built together, not alone
- AI as enabler, not replacement

### Writing Style
- Active voice
- Clear, jargon-free language (explain technical terms when necessary)
- Short paragraphs (3-4 sentences max)
- Use bullet points for scanability
- Emphasize outcomes over features

---

*This style guide is a living document and should be updated as the Nafasi brand evolves.*
