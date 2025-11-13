# Nafasi AI Chatbot - Implementation Guide

## Overview

This document contains the complete implementation guide for the Nafasi AI-powered chatbot system. It handles lead qualification through conversational AI, with integrated spam detection and data persistence.

**Purpose:** Replace traditional contact forms with an intelligent, conversational interface that qualifies leads while reflecting Nafasi's "Engineering Equity" mission.

---

## Technical Stack

### Core Technologies
- **AI Framework:** OpenAI Assistant API with GPT-4
- **AI SDK:** Vercel AI SDK (v3+) for streaming and state management
- **Database:** Supabase (PostgreSQL) for conversation storage
- **Email Service:** Resend for lead notifications
- **Frontend:** React 18+ with Next.js 14 App Router
- **UI Library:** Chakra UI v3 for consistent cosmic-themed components

### Key Dependencies
```json
{
  "ai": "^3.x",
  "openai": "^6.8.1",
  "@supabase/supabase-js": "^2.x",
  "resend": "^3.x"
}
```

**Important Version Notes:**
- OpenAI SDK v6+ uses a different method signature for `submitToolOutputsStream`
- Chakra UI v3 changed IconButton API (children instead of icon prop)
- Next.js 16 with Turbopack requires strict TypeScript in production builds

---

## Environment Configuration

### Required Environment Variables

```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-...                    # OpenAI API key
OPENAI_ASSISTANT_ID=asst_...                  # Pre-configured Assistant ID

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...          # Public anon key
SUPABASE_SERVICE_ROLE_KEY=eyJ...              # Service role key (server-side only)

# Email Configuration (Resend)
RESEND_API_KEY=re_...
NOTIFICATION_EMAIL=hello@nafasi.io

# Rate Limiting Configuration (Optional)
MAX_CONVERSATIONS_PER_IP_PER_HOUR=5           # Default: 5
SPAM_SCORE_THRESHOLD=3                         # Default: 3
```

### OpenAI Assistant Configuration

**Assistant Name:** Nafasi Lead Qualification Bot

**Instructions:**
```
You are a professional and friendly AI assistant for Nafasi, a technology consulting firm whose mission is "Engineering Equity" - delivering professional-grade, AI-driven technology solutions for SMBs and marginalized communities.

Your role is to collect essential contact information and guide leads to book a consultation call via Calendly.

CONVERSATION FLOW (STREAMLINED):
1. Greet warmly and introduce yourself
2. Ask for their full name
3. Ask for their email address
4. Ask for their location/country
5. Use the submitLeadInformation function to save their information
6. Provide the Calendly booking link: https://calendly.com/nafasi
7. End the conversation warmly

TONE GUIDELINES:
- Professional but conversational
- Warm and welcoming
- Use active voice and clear language
- Keep it brief - respect their time
- Create a sense of partnership and collaboration

IMPORTANT NOTES:
- Keep each response to 1-2 sentences maximum
- Ask one question at a time
- When providing the Calendly link, explain that they can choose a time that works for them
- This is a streamlined flow - we collect minimal info and get them to booking quickly

NAFASI SERVICES (brief mention):
Nafasi delivers professional-grade technology solutions for SMBs and marginalized communities.

Keep the conversation focused and efficient. The goal is to collect their name, email, and location, then guide them to book a time.
```

**Model:** gpt-4-turbo-preview or gpt-4

**Tools:** Function calling with `submitLeadInformation`
```json
{
  "name": "submitLeadInformation",
  "description": "Submit lead information when name, email, and location have been collected. Call this function to save the lead's contact details.",
  "parameters": {
    "type": "object",
    "properties": {
      "name": { "type": "string", "description": "Lead's full name" },
      "email": { "type": "string", "description": "Lead's email address" },
      "location": { "type": "string", "description": "Lead's location or country" }
    },
    "required": ["name", "email", "location"]
  }
}
```

**Temperature:** 0.7 (balanced creativity and consistency)

---

## Database Schema

### Conversations Table

```sql
CREATE TABLE conversations (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Lead Information (v2.0 streamlined)
  name TEXT,
  email TEXT,
  location TEXT,  -- Replaces country/timezone (now just location)

  -- Deprecated fields (kept for backward compatibility)
  project_description TEXT,
  budget_range TEXT,
  timeline TEXT,
  country TEXT,
  timezone TEXT,

  -- Conversation Data
  messages JSONB DEFAULT '[]'::jsonb NOT NULL,
  thread_id TEXT,  -- OpenAI thread ID for Assistant API

  -- Status Tracking
  is_qualified BOOLEAN DEFAULT false,
  is_completed BOOLEAN DEFAULT false,

  -- Calendly Integration
  meeting_scheduled BOOLEAN DEFAULT false,
  calendly_meeting_url TEXT,
  calendly_meeting_created_at TIMESTAMP WITH TIME ZONE,
  calendly_meeting_scheduled_time TIMESTAMP WITH TIME ZONE,

  -- Spam Detection
  spam_score INTEGER DEFAULT 0,
  ip_address TEXT,
  user_agent TEXT,

  -- Webhook tracking
  last_webhook_event JSONB,

  -- Analytics
  session_duration_seconds INTEGER,
  message_count INTEGER DEFAULT 0
);

-- Indexes for Performance
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX idx_conversations_email ON conversations(email);
CREATE INDEX idx_conversations_is_qualified ON conversations(is_qualified);
CREATE INDEX idx_conversations_spam_score ON conversations(spam_score);
CREATE INDEX idx_conversations_ip_address ON conversations(ip_address, created_at);

-- Calendly Integration Indexes
CREATE INDEX idx_conversations_meeting_scheduled ON conversations(meeting_scheduled, created_at DESC);
CREATE INDEX idx_conversations_email_for_followup ON conversations(email, meeting_scheduled);
```

### Message Format (JSONB)

```typescript
interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string  // ISO 8601
}

// Example messages array
[
  {
    "role": "assistant",
    "content": "Hello! I'm here to help you explore how Nafasi can support your technology needs. What's your name?",
    "timestamp": "2025-01-09T12:00:00Z"
  },
  {
    "role": "user",
    "content": "My name is John",
    "timestamp": "2025-01-09T12:00:15Z"
  }
]
```

---

## Spam Detection System

### Spam Indicators & Scoring

| Indicator | Score | Description |
|-----------|-------|-------------|
| Invalid email format | 2 | Email doesn't match RFC 5322 regex |
| Temporary email domain | 2 | Email from disposable service (tempmail, 10minutemail, etc.) |
| Excessive special chars | 1 | Name contains >30% special characters |
| Spam keywords | 2 | Message contains "viagra", "bitcoin", "earn money fast", etc. |
| Suspicious URLs | 1 | Multiple URLs or suspicious TLDs (.xyz, .top, .club) |
| Too-fast submission | 2 | Conversation completed in <10 seconds |

**Spam Threshold:** Default 3 (configurable via `SPAM_SCORE_THRESHOLD`)

**Action on High Score:** Conversation flagged, not saved to database, no email notification sent

### Rate Limiting

**Implementation:** IP-based tracking
**Default Limit:** 5 conversations per IP per hour
**Storage:** Supabase conversations table with `ip_address` and `created_at` fields
**Behavior:** Return 429 status if limit exceeded

### Temporary Email Domains Blacklist

```typescript
const TEMP_EMAIL_DOMAINS = [
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'trashmail.com',
  'throwaway.email',
  'temp-mail.org',
  'yopmail.com',
]
```

---

## UI/UX Design Specifications

### Floating Chat Bubble

**Position:**
- Bottom-right corner
- Distance from edges: 24px (mobile), 32px (desktop)
- Z-index: 1000 (same as navigation)

**Appearance:**
- Circular button, 60px diameter
- Background: Nafasi green (#31b292)
- Icon: Chat bubble SVG or message icon
- Pulsing glow animation (0-20px green glow, 2s infinite)

**Animation:**
```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(49, 178, 146, 0.7);
  }
  50% {
    box-shadow: 0 0 20px 10px rgba(49, 178, 146, 0.3);
  }
}
```

**Hover State:**
- Scale: 1.1
- Box shadow: 0 4px 20px rgba(49, 178, 146, 0.6)
- Transition: 0.3s ease

### Chat Modal Interface

**Dimensions:**
- Width: 400px (desktop), 90vw (mobile)
- Max width: 95vw
- Height: 600px (desktop), 80vh (mobile)
- Max height: 90vh

**Position:**
- Bottom-right aligned with chat bubble
- Offset: 80px from bottom, 32px from right (desktop)
- Centered on mobile

**Background & Borders:**
- Background: Nafasi black (#0a0a0a) with 95% opacity
- Border: 1px solid rgba(49, 178, 146, 0.3)
- Border radius: 16px
- Box shadow: 0 8px 32px rgba(49, 178, 146, 0.2)
- Backdrop filter: blur(10px)

**Layout Sections:**

1. **Header** (60px height)
   - Background: rgba(49, 178, 146, 0.1)
   - Border bottom: 1px solid rgba(49, 178, 146, 0.3)
   - Title: "Chat with Nafasi" (white, bold, 18px)
   - Subtitle: "Engineering Equity" (gray-400, 14px)
   - Close button: X icon, top-right, 32px × 32px

2. **Messages Area** (flex-grow scrollable)
   - Background: transparent
   - Padding: 16px
   - Scroll behavior: smooth, auto-scroll to bottom on new messages
   - Scrollbar: Custom styled, thin, Nafasi green

3. **Input Area** (80px height, fixed bottom)
   - Background: rgba(255, 255, 255, 0.05)
   - Border top: 1px solid rgba(49, 178, 146, 0.3)
   - Padding: 12px

### Message Bubbles

**User Messages (Right-aligned):**
```css
background: linear-gradient(135deg, #31b292, #4dd4ae)
color: white
border-radius: 16px 16px 4px 16px
padding: 12px 16px
max-width: 80%
margin-left: auto
box-shadow: 0 2px 8px rgba(49, 178, 146, 0.3)
```

**AI Messages (Left-aligned):**
```css
background: rgba(255, 255, 255, 0.1)
color: white
border: 1px solid rgba(255, 255, 255, 0.2)
border-radius: 16px 16px 16px 4px
padding: 12px 16px
max-width: 80%
margin-right: auto
```

**Timestamp:**
- Position: Below message bubble
- Font size: 12px
- Color: gray-500
- Format: "12:34 PM" or "2 minutes ago"

**Typing Indicator:**
- Three animated dots
- Color: Nafasi green
- Animation: Bounce effect (3 dots moving up/down sequentially)

### Input Field

**Text Input:**
- Background: rgba(255, 255, 255, 0.05)
- Border: 1px solid rgba(49, 178, 146, 0.3)
- Border radius: 24px
- Padding: 12px 16px
- Font size: 14px
- Color: white
- Placeholder: "Type your message..." (gray-500)

**Focus State:**
- Border: 1px solid #31b292
- Box shadow: 0 0 0 3px rgba(49, 178, 146, 0.2)
- Outline: none

**Send Button:**
- Position: Absolute right inside input
- Size: 40px × 40px
- Background: Nafasi green (#31b292)
- Border radius: 50%
- Icon: Arrow right or paper plane
- Disabled state: Opacity 0.5, cursor not-allowed

**Hover State (enabled):**
- Background: #4dd4ae (light green)
- Box shadow: 0 0 12px rgba(49, 178, 146, 0.4)
- Transform: scale(1.05)

---

## Conversational Flow (Streamlined)

### Lead Qualification Sequence

The chatbot now uses a streamlined flow optimized for quick lead capture and Calendly booking.

**Stage 1: Greeting**
```
Assistant: Hello! I'm here to help you connect with Nafasi for a consultation.
What's your name?

User: [Provides name]
```

**Stage 2: Email Collection**
```
Assistant: Nice to meet you! Could you share your email address?

User: [Provides email]
```

**Stage 3: Location Collection**
```
Assistant: And where are you located?

User: [Provides location/country]
```

**Stage 4: Lead Submission & Calendly Link**
```
Assistant: [Internally calls submitLeadInformation function with: name, email, location]

Perfect! Here's your Calendly link to schedule a time that works for you:
https://calendly.com/nafasi

I've saved your information and our team will follow up with you after you book
a meeting. Thanks for connecting with Nafasi!

User: [Clicks link and schedules meeting OR closes chat]
```

### Streamlined Data Capture

**Data Collected:**
```typescript
interface LeadData {
  name: string
  email: string
  location: string
}
```

**Key Differences from v1.0:**
- Removed: projectDescription, timeline, budgetRange, country, timezone
- Added: Direct Calendly integration
- Simplified: 3-field collection instead of 7 fields
- Email trigger: Changed from immediate to post-Calendly booking

---

## Calendly Integration

### Webhook Setup

1. Go to [Calendly Settings → Integrations → Webhooks](https://calendly.com/app/settings/integrations/webhooks)
2. Create a new webhook with these settings:
   - **URL:** `https://your-domain.com/api/calendly-webhook`
   - **Events:** Select `invitee.created` and `invitee.canceled`
   - **Signing Key:** Save this as `CALENDLY_WEBHOOK_SECRET` in your environment

### Flow with Calendly

1. **User completes chatbot** → Lead info saved in Supabase (name, email, location)
2. **User clicks Calendly link** → Books a meeting time
3. **Calendly sends webhook** → `invitee.created` event
4. **Webhook handler** (/api/calendly-webhook):
   - Updates conversation with `meeting_scheduled: true`
   - Stores Calendly meeting URL
   - Sends email notification to your team
5. **Email includes:**
   - Lead's contact info
   - Calendly meeting details
   - Conversation transcript

### Environment Variables for Calendly

```bash
CALENDLY_WEBHOOK_SECRET=your-signing-key  # From Calendly webhook settings
CALENDLY_BOOKING_URL=https://calendly.com/nafasi  # Your Calendly link
```

---

## API Architecture

### API Routes

#### POST /api/chat
**Purpose:** Handle chat messages and stream AI responses

**Request Body:**
```typescript
{
  conversationId?: string      // UUID of existing conversation
  threadId?: string            // OpenAI thread ID
  message: string              // User's message
  metadata?: {
    ipAddress: string
    userAgent: string
  }
}
```

**Response (Streaming):**
```typescript
// Vercel AI SDK streaming format
{
  id: string                   // Message ID
  role: 'assistant'
  content: string              // Streamed content
  conversationId: string       // UUID
  threadId: string             // OpenAI thread ID
}
```

**Error Responses:**
- 429: Rate limit exceeded
- 400: Invalid input or spam detected
- 500: Internal server error

#### POST /api/chat/complete
**Purpose:** Mark conversation as completed and save lead info

**Request Body:**
```typescript
{
  conversationId: string
  leadData: {
    name: string
    email: string
    location: string
  }
}
```

**Response:**
```typescript
{
  success: boolean
  conversationId: string
  isQualified: boolean
  message: string  // "Email will be sent after Calendly booking"
}
```

#### POST /api/calendly-webhook
**Purpose:** Receive Calendly events and trigger email after meeting is booked

**Webhook Events:**
- `invitee.created` - User scheduled a meeting
- `invitee.canceled` - User cancelled a meeting

**Payload Example:**
```typescript
{
  event: 'invitee.created',
  payload: {
    email: string
    name: string
    scheduling_url: string  // Calendly meeting URL
    event_type_uuid: string
  }
}
```

**Response:**
```typescript
{
  success: boolean
  conversationId: string
  message: string
}
```

**Webhook URL:** `https://your-domain.com/api/calendly-webhook`

### API Implementation Pattern

```typescript
// app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { OpenAI } from 'openai'
import { supabaseAdmin } from '@/lib/utils/supabase'
import { checkForSpam, checkRateLimit } from '@/lib/utils/spam-detection'

export async function POST(req: Request) {
  try {
    const { conversationId, threadId, message, metadata } = await req.json()

    // Rate limiting check
    if (metadata?.ipAddress) {
      const isRateLimited = await checkRateLimit(metadata.ipAddress, supabaseAdmin)
      if (isRateLimited) {
        return new Response('Rate limit exceeded', { status: 429 })
      }
    }

    // Spam detection
    const spamCheck = checkForSpam({
      messages: [{ content: message }],
      ipAddress: metadata?.ipAddress,
    })

    if (spamCheck.isSpam) {
      return new Response('Message flagged as spam', { status: 400 })
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Create or retrieve thread
    let currentThreadId = threadId
    if (!currentThreadId) {
      const thread = await openai.beta.threads.create()
      currentThreadId = thread.id
    }

    // Add user message to thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message,
    })

    // Run assistant
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!,
      stream: true,
    })

    // Stream response
    const stream = OpenAIStream(run)

    // Save to Supabase (non-blocking)
    saveConversation(conversationId, currentThreadId, message, metadata).catch(console.error)

    return new StreamingTextResponse(stream, {
      headers: {
        'X-Conversation-Id': conversationId || 'new',
        'X-Thread-Id': currentThreadId,
      },
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
```

---

## Email Notifications

### Notification Trigger
- Triggered when conversation is marked as `is_qualified: true`
- Sent via Resend API
- Recipient: `NOTIFICATION_EMAIL` environment variable

### Email Template

**Subject:** New Qualified Lead: [Name] from Nafasi Chatbot

**HTML Template:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', sans-serif; background: #f5f5f5; }
    .container { max-width: 600px; margin: 40px auto; background: white; padding: 32px; border-radius: 8px; }
    .header { background: linear-gradient(135deg, #31b292, #4dd4ae); color: white; padding: 24px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 8px 0 0; opacity: 0.9; }
    .content { padding: 24px 0; }
    .field { margin-bottom: 16px; }
    .field-label { font-weight: 600; color: #333; margin-bottom: 4px; }
    .field-value { color: #666; }
    .transcript { background: #f9f9f9; padding: 16px; border-radius: 4px; margin-top: 16px; }
    .message { margin-bottom: 12px; }
    .message-role { font-weight: 600; color: #31b292; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 New Qualified Lead</h1>
      <p>From Nafasi AI Chatbot</p>
    </div>

    <div class="content">
      <div class="field">
        <div class="field-label">Name:</div>
        <div class="field-value">[Name]</div>
      </div>

      <div class="field">
        <div class="field-label">Email:</div>
        <div class="field-value"><a href="mailto:[Email]">[Email]</a></div>
      </div>

      <div class="field">
        <div class="field-label">Project Description:</div>
        <div class="field-value">[Project Description]</div>
      </div>

      <div class="field">
        <div class="field-label">Timeline:</div>
        <div class="field-value">[Timeline]</div>
      </div>

      <div class="field">
        <div class="field-label">Budget Range:</div>
        <div class="field-value">[Budget Range]</div>
      </div>

      <div class="transcript">
        <h3>Conversation Transcript</h3>
        [Messages mapped with role and content]
      </div>

      <p style="margin-top: 24px; color: #666; font-size: 14px;">
        <strong>Next Steps:</strong> Follow up with [Name] within 24 hours at [Email]
      </p>
    </div>
  </div>
</body>
</html>
```

### Email Implementation

```typescript
// lib/utils/send-notification.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadNotification(leadData: {
  name: string
  email: string
  projectDescription: string
  timeline: string
  budgetRange: string
  messages: Array<{ role: string; content: string }>
}) {
  try {
    await resend.emails.send({
      from: 'Nafasi Chatbot <chatbot@nafasi.io>',
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New Qualified Lead: ${leadData.name} from Nafasi Chatbot`,
      html: generateEmailHTML(leadData),
    })

    return { success: true }
  } catch (error) {
    console.error('Email notification error:', error)
    return { success: false, error }
  }
}
```

---

## Frontend Implementation

### Chat Component Structure

```
app/components/
├── Chatbot/
│   ├── ChatButton.tsx          # Floating chat bubble
│   ├── ChatModal.tsx           # Main chat interface
│   ├── MessageBubble.tsx       # Individual message component
│   ├── TypingIndicator.tsx    # Three-dot animation
│   ├── ChatInput.tsx           # Message input field
│   └── useChatbot.ts           # Custom hook for chat logic
```

### Custom Hook: useChatbot

```typescript
// app/components/Chatbot/useChatbot.ts
import { useChat } from 'ai/react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/utils/supabase'

export function useChatbot() {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      conversationId,
      threadId,
      metadata: {
        ipAddress: window.clientInformation?.userAgent, // Note: Get IP server-side
      },
    },
    onResponse: (response) => {
      // Extract conversation and thread IDs from headers
      const newConversationId = response.headers.get('X-Conversation-Id')
      const newThreadId = response.headers.get('X-Thread-Id')

      if (newConversationId && newConversationId !== 'new') {
        setConversationId(newConversationId)
      }
      if (newThreadId) {
        setThreadId(newThreadId)
      }
    },
  })

  // Initialize conversation on first open
  useEffect(() => {
    if (isOpen && !conversationId) {
      initializeConversation()
    }
  }, [isOpen])

  const initializeConversation = async () => {
    // Create initial conversation record in Supabase
    const { data, error } = await supabase
      .from('conversations')
      .insert({})
      .select()
      .single()

    if (data) {
      setConversationId(data.id)
    }
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isOpen,
    setIsOpen,
  }
}
```

---

## Testing Checklist

### Functional Testing
- [ ] Chat bubble appears and animates correctly
- [ ] Modal opens/closes smoothly
- [ ] Messages send and receive properly
- [ ] Streaming responses display character by character
- [ ] Message history persists across modal open/close
- [ ] Typing indicator shows during AI response
- [ ] Email validation works (rejects invalid formats)
- [ ] Conversation saves to Supabase correctly
- [ ] Thread ID persists throughout conversation

### Spam Detection Testing
- [ ] Rate limiting blocks after configured limit (default 5/hour)
- [ ] Invalid emails are rejected with helpful message
- [ ] Temporary email domains are flagged
- [ ] Spam keywords trigger appropriate score increase
- [ ] High spam score prevents conversation save and email notification
- [ ] Legitimate conversations are not falsely flagged

### UI/UX Testing
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessible via keyboard navigation
- [ ] Focus states visible and logical
- [ ] Color contrast meets WCAG AA standards
- [ ] Animations don't cause motion sickness (respect prefers-reduced-motion)
- [ ] Chat bubble doesn't overlap important content
- [ ] Modal scrolls properly with long conversations
- [ ] Messages auto-scroll to bottom on new message

### Integration Testing
- [ ] OpenAI Assistant responds appropriately
- [ ] Supabase records created/updated correctly
- [ ] Email notifications sent on qualified leads
- [ ] Email notifications not sent on spam/incomplete conversations
- [ ] All environment variables properly loaded
- [ ] Error handling gracefully manages API failures

---

## Deployment Checklist

### Pre-Deployment
- [ ] Create OpenAI Assistant with proper instructions and function calling tool
- [ ] Set up Supabase project and run migrations (including country/timezone fields)
- [ ] Configure Row Level Security policies
- [ ] Set up Resend account and verify sending domain
- [ ] Configure all environment variables in deployment platform
- [ ] Test email delivery (avoid spam folder)
- [ ] Verify all environment variables are set for Production, Preview, AND Development

### Critical Production Fixes
The following issues were encountered and resolved during production deployment:

#### 1. **TypeScript Strict Mode Compilation**
**Issue:** Development mode (Turbopack) is lenient with type checking, but production enforces strict compilation.

**Fix:** Added type assertions for Supabase operations:
```typescript
// Correct pattern for Supabase operations
const { data, error } = await (supabaseAdmin() as any)
  .from('conversations')
  .insert({...})

// For data after null check
const conversation = data as any
```

#### 2. **Lazy Initialization for API Clients**
**Issue:** Next.js build process tries to instantiate clients during static analysis, causing errors when env vars aren't available.

**Fix:** Convert all API clients to lazy initialization:
```typescript
// Supabase
let _supabaseAdmin: ReturnType<typeof createClient> | null = null
export const supabaseAdmin = () => {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(...)
  }
  return _supabaseAdmin
}

// OpenAI
let _openai: OpenAI | null = null
function getOpenAIClient() {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return _openai
}

// Resend
let _resend: Resend | null = null
function getResendClient() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}
```

#### 3. **OpenAI SDK v6 API Changes**
**Issue:** Method signature for `submitToolOutputsStream` changed between versions.

**Correct v6 signature:**
```typescript
openai.beta.threads.runs.submitToolOutputsStream(
  runId,  // First parameter: run ID string
  {
    thread_id: threadId,  // thread_id in params object
    tool_outputs: [{
      tool_call_id: toolCall.id,
      output: JSON.stringify({ success: true, message: '...' })
    }],
    stream: true
  }
)
```

**Incorrect (v4/v5) signature:**
```typescript
// DO NOT USE - this was the old signature
openai.beta.threads.runs.submitToolOutputsStream(
  threadId,  // ❌ Wrong parameter order
  runId,
  { tool_outputs: [...] }
)
```

#### 4. **Chakra UI v3 Breaking Changes**
**Issue:** IconButton no longer accepts `icon` prop.

**Fix:** Move icon to children:
```typescript
// ❌ Old (Chakra v2)
<IconButton icon={<ChatIcon />} />

// ✅ New (Chakra v3)
<IconButton>
  <ChatIcon />
</IconButton>
```

#### 5. **Environment Variables Not Available**
**Issue:** Vercel deployment failed with "supabaseUrl is required" error.

**Solution:** Ensure ALL environment variables are added to Vercel project settings:
- Navigate to Project → Settings → Environment Variables
- Add variables for **Production**, **Preview**, AND **Development** environments
- After adding variables, trigger a redeploy (automatic on next push)

### Post-Deployment
- [ ] Verify chatbot loads on production URL
- [ ] Test complete conversation flow end-to-end
- [ ] Confirm email notifications arrive
- [ ] Monitor Supabase for conversation records
- [ ] Check rate limiting works as expected
- [ ] Review analytics and conversation quality
- [ ] Verify function calling (submitLeadInformation) triggers correctly
- [ ] Test country/timezone collection and storage

### Monitoring
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Monitor OpenAI API usage and costs
- [ ] Track conversion rate (conversations → qualified leads)
- [ ] Review spam detection accuracy (false positives/negatives)
- [ ] Monitor email deliverability rates
- [ ] Track function calling success/failure rates

---

## Future Enhancements

### Phase 2 Features
- [ ] Multi-language support (Spanish, French)
- [ ] Voice input/output option
- [ ] Appointment scheduling integration (Calendly, Cal.com)
- [ ] CRM integration (HubSpot, Salesforce)
- [ ] Conversation analytics dashboard
- [ ] A/B testing for greeting messages
- [ ] Sentiment analysis on user responses

### Phase 3 Features
- [ ] File upload support (project docs, designs)
- [ ] Screen sharing for technical questions
- [ ] Integration with project management tools
- [ ] Automated follow-up sequences
- [ ] Custom training on company-specific knowledge base
- [ ] Multi-channel support (WhatsApp, SMS)

---

## Troubleshooting Guide

### Common Issues

**Issue:** Chatbot doesn't respond
- Check OPENAI_API_KEY is valid
- Verify OPENAI_ASSISTANT_ID exists and is active
- Review API route logs for errors
- Check network requests in browser DevTools
- Ensure OpenAI client is using lazy initialization
- Verify function calling tool is configured on Assistant

**Issue:** Messages not saving to Supabase
- Verify SUPABASE_SERVICE_ROLE_KEY has write permissions
- Check RLS policies allow inserts
- Review Supabase logs for errors
- Confirm conversations table exists with country/timezone columns
- Ensure Supabase client uses lazy initialization pattern
- Add type assertions `(supabaseAdmin() as any)` if TypeScript errors occur

**Issue:** Email notifications not sending
- Verify RESEND_API_KEY is valid
- Check sending domain is verified in Resend
- Review spam folder for test emails
- Confirm NOTIFICATION_EMAIL is correct
- Ensure Resend client uses lazy initialization pattern

**Issue:** Rate limiting not working
- Check IP address is being captured correctly
- Verify Supabase query for rate limit check
- Review MAX_CONVERSATIONS_PER_IP_PER_HOUR value
- Test with different IP addresses

**Issue:** False spam detections
- Review spam detection thresholds
- Adjust SPAM_SCORE_THRESHOLD if needed
- Whitelist legitimate domains if incorrectly flagged
- Monitor spam_score values in database

### Production Build Errors

**Error:** `Type error: Property 'messages' does not exist on type 'never'`
**Solution:** Add type assertion after null check:
```typescript
const { data, error } = await supabaseAdmin().from('conversations').select('*').eq('id', id).single()
if (fetchError || !data) { return ... }
const conversation = data as any  // Type assertion needed
```

**Error:** `Error: supabaseUrl is required`
**Solution:**
1. Verify environment variables are set in Vercel (Project → Settings → Environment Variables)
2. Ensure variables are added for all environments (Production, Preview, Development)
3. Redeploy after adding variables

**Error:** `Type error: Argument of type 'string' is not assignable to parameter`
**Solution:** Check OpenAI SDK version and use correct method signature:
```typescript
// OpenAI SDK v6+
openai.beta.threads.runs.submitToolOutputsStream(
  runId,
  { thread_id: threadId, tool_outputs: [...], stream: true }
)
```

**Error:** `Property 'icon' does not exist on type 'IconButtonProps'`
**Solution:** Update to Chakra UI v3 pattern:
```typescript
<IconButton><SvgIcon /></IconButton>  // Not icon={<SvgIcon />}
```

**Error:** `Error parsing lead data: Path parameters result in path with invalid segments`
**Solution:** Ensure thread_id is included in params object and not passed as separate parameter to `submitToolOutputsStream`

---

## Maintenance & Updates

### Regular Maintenance
- **Weekly:** Review conversation quality and spam detection accuracy
- **Monthly:** Analyze qualified lead conversion rates
- **Quarterly:** Update OpenAI Assistant instructions based on feedback
- **As needed:** Update temporary email domain blacklist

### Model Updates
- Monitor OpenAI model releases for improvements
- Test new models (GPT-4, GPT-4-turbo) for better responses
- Update model parameter in Assistant configuration
- A/B test responses between model versions

### Security Updates
- Regularly update dependencies (npm audit)
- Review and rotate API keys quarterly
- Monitor for unusual conversation patterns
- Update spam detection rules as spam evolves

---

## Version History

### Version 2.0 (November 2025) - STREAMLINED WITH CALENDLY INTEGRATION
**Major Changes:**
- **Simplified lead data collection:** Now only collects name, email, and location (was: 7 fields)
- **Calendly integration:** Provides Calendly booking link immediately after lead qualification
- **Email trigger change:** Emails now sent AFTER Calendly meeting is booked (was: immediately after qualification)
- **New webhook endpoint:** `/api/calendly-webhook` receives booking confirmations from Calendly
- **Database migration:** Added `location`, `meeting_scheduled`, `calendly_meeting_url` fields

**Migration Guide from v1.1:**
1. Run migration: `supabase migration up` (applies 003_streamline_chatbot_for_calendly.sql)
2. Update OpenAI Assistant:
   - Use new simplified instructions (see Assistant Configuration section)
   - Update function calling tool to only include name, email, location
3. Set up Calendly webhook:
   - Get webhook URL: `https://your-domain.com/api/calendly-webhook`
   - Set events: `invitee.created`, `invitee.canceled`
   - Save signing key as `CALENDLY_WEBHOOK_SECRET`
4. Add new environment variable:
   - `CALENDLY_WEBHOOK_SECRET` - from Calendly webhook settings
5. Deploy updated code with new `/api/calendly-webhook` endpoint

**Benefits:**
- Faster conversation flow (3 fields instead of 7)
- Higher completion rate (simpler for users)
- Verified meeting bookings (only send email after Calendly confirms)
- Better lead quality tracking

### Version 1.1 (November 2025)
- Added country and timezone fields to lead qualification
- Implemented OpenAI function calling for lead submission
- Fixed production deployment issues (TypeScript strict mode, lazy initialization)
- Updated for OpenAI SDK v6, Chakra UI v3, Next.js 16 compatibility
- Enhanced documentation with troubleshooting for production errors

### Version 1.0 (January 2025)
- Initial implementation with OpenAI Assistant API
- Spam detection and rate limiting
- Email notifications via Resend
- Supabase conversation storage

---

*Last Updated: November 2025*
*Version: 2.0*
*Maintainer: Nafasi Development Team*
