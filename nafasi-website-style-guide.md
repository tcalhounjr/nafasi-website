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

## Navigation & Scrolling

### Sticky Navigation Header
**Implementation:**
- Fixed position at top of viewport (position: fixed, top: 0, z-index: 1000)
- Semi-transparent black background with backdrop blur for depth
- Height: 60px (mobile), 70px (desktop)
- Border bottom: 1px solid rgba(255, 255, 255, 0.2)

**Desktop Navigation:**
- Horizontal flex layout with 8-unit gap
- Links: Medium font weight, gray-300 default color
- Hover state: Nafasi green with animated underline expanding from 0% to 100% width
- Underline: 2px height, positioned 4px below text
- Transition: 0.3s ease for underline expansion, 0.2s for color

**Mobile Navigation:**
- Hamburger menu icon (24px × 24px SVG)
- Slide-in drawer from right side (280px width)
- Full-height panel with Nafasi black background
- Close button (X icon) in top-right
- Links stacked vertically with 6-unit gap, left-aligned
- Backdrop overlay: rgba(0, 0, 0, 0.7) with click-to-close

**Logo:**
- Nafasi logo (updated-nafasi-logo.png)
- Height: 40px (mobile), 50px (desktop)
- Clickable, scrolls to #home section
- Hover: scale(1.05) transform

### Smooth Scroll Behavior
**Implementation:**
- JavaScript-based smooth scrolling (not CSS scroll-behavior)
- Uses `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Triggered on all navigation link clicks (preventDefault on anchor tags)
- Mobile menu auto-closes after navigation selection

**Section IDs:**
- #home (Hero)
- #value-props (Why Nafasi)
- #experience (Experience)
- #services (Services)
- #technologies (Technologies)
- #solutions (Problems/Solutions)

**Page Flow Order:**
1. Hero
2. Value Props
3. Experience
4. Services
5. Technologies
6. Problems (Solutions)
7. Footer

---

## Implemented Section Guidelines

### Value Propositions Section
**Layout:**
- 3-column grid (desktop), single column stack (mobile)
- SimpleGrid with responsive columns: { base: 1, md: 3 }
- Gap: 8-unit (mobile/tablet), 10-unit (desktop)

**Cards:**
- Background: rgba(255, 255, 255, 0.02) with subtle transparency
- Border: 1px solid rgba(49, 178, 146, 0.2)
- Border radius: lg
- Padding: 8-unit (32px)
- Hover state: Nafasi green border, lifted 4px (translateY), glow shadow

**Icons:**
- Emoji-based (🏅 Professional Grade, 🤝🏽 Human Centered, 🚀 Forward Thinking)
- Circular background: rgba(49, 178, 146, 0.1)
- Border: 2px solid Nafasi green
- Size: 20-unit (80px) container
- Font size: 4xl

**Typography:**
- Title: Uppercase, bold, xl-2xl responsive
- Description: Stardust gray, md-lg responsive, tall line-height

### Services Section
**Layout:**
- 3-column grid (desktop), single column stack (mobile)
- Same card structure as Value Props for consistency
- Positioned after Experience, before Technologies

**Services Offered:**
1. **Business Process Improvement** (⚙️)
   - Focus: Documentation and process optimization before technology implementation
2. **Web Application Development** (🌐)
   - Foundation service using modern frameworks and best practices
3. **Mobile Application Development** (📱)
   - Cross-platform development building on web foundation

**Visual Style:**
- Cosmic background texture (same as Value Props)
- Green accent radial gradient overlay
- Consistent hover states and transitions

### Experience Section
**Implementation:**
- Horizontal scrolling logo carousel
- Displays past client/partner organizations
- Automated scroll animation with pause on hover
- Establishes credibility early in page flow

### Technologies Section
**Implementation:**
- Animated logo carousel showcasing tech stack
- Demonstrates technical capabilities and modern tooling
- Positioned after Services to show "how we build"

### Problems (Solutions) Section
**Implementation:**
- Video and carousel showcasing real-world solutions
- Positioned near end of page flow to demonstrate impact
- Links to case studies and success stories

### Footer
**Implementation:**
- Black hole background image (black-hole-footer-half-light.jpg)
- Background opacity: 0.4 for subtle cosmic aesthetic
- Vignette overlay: radial-gradient from rgba(10, 10, 10, 0.5) to rgba(10, 10, 10, 0.7)
- Height: 25vh (half of hero section's 50vh)

**Layout:**
- Two-column flex layout (desktop): Logo left, CTA center-right
- Stacked layout (mobile): Logo top, CTA below
- Logo vertical alignment: mt={{ base: 0, md: '-8px' }} to align with title center

**CTA Section:**
- Heading: "Let's Build Your Future" (3xl-5xl responsive)
- Subtitle: Conversational text about partnership and equity
- Button: "Start Your Journey" with Nafasi green, hover glow effect
- Centered text alignment, flex: 1 for proper spacing

**Navigation Links:**
- Horizontal flex (desktop), vertical stack (mobile)
- Matches main navigation order
- Gray-400 default, Nafasi green hover
- Includes all section links

**Social Links:**
- LinkedIn: https://www.linkedin.com/in/tcalhounjr
- Twitter: https://www.twitter.com/tdcalhounjr
- GitHub: https://www.github.com/tcalhounjr
- Gray-500 default, Nafasi green hover
- Smaller font size for subtle presence

**Bottom Bar:**
- Copyright notice with current year
- Privacy Policy and Terms of Service links (placeholder)
- 1px border-top with whiteAlpha.200

---

## AI Chatbot (Implementation Guide)

### Technical Stack
- **Backend:** OpenAI Assistant API
- **SDK:** Vercel AI SDK for streaming and state management
- **Database:** Supabase for conversation storage
- **Spam Detection:** Integrated validation and rate limiting

### UI Design
**Position & Appearance:**
- Floating bottom-right corner
- Z-index: 1000 (same level as navigation)
- Cosmic bubble icon with pulsing green glow animation
- Distance from edges: 24px (mobile), 32px (desktop)

**Chat Interface:**
- Dark modal (Nafasi black background)
- Backdrop: rgba(0, 0, 0, 0.8)
- Width: 400px (desktop), 90vw (mobile)
- Max height: 600px with scrollable message area
- Border: 1px solid rgba(49, 178, 146, 0.3)
- Box shadow: 0 8px 32px rgba(49, 178, 146, 0.2)

**Message Bubbles:**
- User messages: Right-aligned, Nafasi green background
- AI messages: Left-aligned, rgba(255, 255, 255, 0.1) background
- Border radius: lg
- Padding: 12px 16px
- Timestamp: Small gray text below each message

**Input Field:**
- Bottom-fixed within modal
- Background: rgba(255, 255, 255, 0.05)
- Border: 1px solid rgba(49, 178, 146, 0.3)
- Focus state: Nafasi green border glow
- Send button: Nafasi green with hover animation

### Conversational Flow
**Lead Qualification Sequence:**
1. Greeting and introduction to Nafasi mission
2. Ask for name
3. Ask for email (with validation)
4. Ask about project/business needs
5. Ask about timeline and budget range
6. Offer to schedule consultation or provide resources

**Personality & Tone:**
- Professional but warm and approachable
- Emphasizes partnership and equity mission
- Uses active voice and clear, jargon-free language
- Reflects Nafasi brand values: Professional Grade, Human Centered, Forward Looking

**AI Training Data:**
- Nafasi services: Business Process Improvement, Web/Mobile Development
- Core mission: "Engineering Equity" - democratizing professional-grade technology
- Target audience: SMBs and marginalized communities
- Value propositions: Professional grade, human-centered, forward-thinking

### Data Management
**Supabase Schema:**
```sql
conversations (
  id: uuid PRIMARY KEY
  created_at: timestamp
  name: text
  email: text
  project_description: text
  budget_range: text
  timeline: text
  messages: jsonb[]
  is_qualified: boolean
  spam_score: integer
)
```

**Email Notifications:**
- Trigger on qualified lead completion
- Send to: hello@nafasi.io
- Include: Name, email, project details, conversation transcript
- Template: Professional with Nafasi branding

### Spam Detection
**Implementation:**
- Rate limiting: Max 5 conversations per IP per hour
- Email validation: RFC 5322 compliant regex
- Keyword filtering: Flag common spam phrases
- Honeypot field: Hidden field to catch bots
- Time-based validation: Flag submissions faster than 10 seconds
- Score threshold: >= 3 spam indicators = auto-reject

**Spam Indicators:**
- Invalid/temporary email domains
- Excessive special characters in name
- Suspicious URLs in messages
- Rapid-fire message sending
- Identical messages across sessions

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
- **IMPORTANT:** All Chakra UI components must be client components (use `'use client'` directive)
- Chakra's emotion CSS-in-JS requires client-side rendering to prevent hydration errors

### CSS Animations in Next.js
- `@keyframes` defined in `globals.css` are **NOT** accessible to inline `style` props
- **Solution:** Define keyframes inline within the component using `<style jsx global>`
- Example:
  ```tsx
  <style jsx global>{`
    @keyframes myAnimation {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}</style>
  ```
- Reference the animation in inline styles: `style={{ animation: 'myAnimation 40s linear infinite' }}`

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
