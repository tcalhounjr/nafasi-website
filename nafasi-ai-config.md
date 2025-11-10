# Nafasi AI Chatbot Configuration Guide

This document contains all the setup instructions, configuration details, and troubleshooting information for the Nafasi AI chatbot implementation.

## Overview

The Nafasi AI chatbot is a custom implementation using:
- **OpenAI Assistants API** for conversational AI
- **Vercel AI SDK** for streaming responses
- **Supabase** for conversation storage and lead management
- **Resend** for email notifications
- Built-in spam detection and rate limiting

## Architecture

### Frontend Components
- `app/components/Chatbot/index.tsx` - Main chatbot UI component
- `app/components/Chatbot/ChatModal.tsx` - Modal container
- `app/components/Chatbot/ChatInput.tsx` - User input field
- `app/components/Chatbot/MessageBubble.tsx` - Message display
- `app/components/Chatbot/useChatbot.ts` - Custom React hook for state management

### Backend API Routes
- `app/api/chat/route.ts` - Main chat endpoint (handles streaming responses)
- `app/api/chat/complete/route.ts` - Lead capture endpoint (saves contact info)

### Utilities
- `lib/utils/spam-detection.ts` - Spam and abuse prevention
- `lib/utils/send-notification.ts` - Email notifications via Resend
- `lib/utils/supabase.ts` - Supabase client configuration

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_ASSISTANT_ID=your_assistant_id_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
NOTIFICATION_EMAIL=hello@nafasi.io

# Rate Limiting (Optional - defaults provided)
MAX_CONVERSATIONS_PER_IP_PER_HOUR=5
SPAM_SCORE_THRESHOLD=3
```

## Setup Instructions

### 0. Create .env.local File

Before starting, you need to create the `.env.local` file in the **root directory** of your project (same location as `package.json`):

**Option 1: Copy from example**
```bash
cp .env.example .env.local
```

**Option 2: Create manually**
1. In your project root, create a new file named `.env.local`
2. Copy the environment variables template from above
3. Fill in the actual values as you obtain them from the steps below

**IMPORTANT:**
- `.env.local` is gitignored and should NEVER be committed to version control
- After creating or modifying `.env.local`, restart your Next.js dev server
- All environment variables will be loaded automatically by Next.js

### 1. OpenAI API Key

**How to Create:**
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an OpenAI account
3. Click **"+ Create new secret key"**
4. Give it a name (e.g., "Nafasi Chatbot")
5. Select permissions (recommended: **Restricted** with only "Model capabilities" enabled)
6. Click **"Create secret key"**
7. **IMPORTANT:** Copy the key immediately - you won't be able to see it again
8. Add to `.env.local` as `OPENAI_API_KEY=sk-proj-...`

**Cost Considerations:**
- Assistants API charges per token (input + output)
- Monitor usage at [https://platform.openai.com/usage](https://platform.openai.com/usage)
- Set up billing limits to prevent unexpected charges

### 2. OpenAI Assistant ID

**How to Create:**
1. Go to [https://platform.openai.com/assistants](https://platform.openai.com/assistants)
2. Click **"+ Create"**
3. Configure your assistant:
   - **Name:** Nafasi AI Assistant
   - **Model:** `gpt-4o` (recommended) or `gpt-4-turbo`
   - **Instructions:** Add your custom system prompt (see below for example)
   - **Tools:** Enable "Code Interpreter" if needed
   - **File Search:** Enable if you want document retrieval
4. Click **"Save"**
5. Copy the Assistant ID (format: `asst_xxxxxxxxxxxxx`)
6. Add to `.env.local` as `OPENAI_ASSISTANT_ID=asst_...`

**Example Assistant Instructions:**
```
You are Nafasi's AI assistant, a friendly and knowledgeable representative of Nafasi, a software development and design agency.

Your role is to:
1. Greet visitors warmly and learn about their project needs
2. Ask relevant questions about their project, timeline, and budget
3. Provide helpful information about Nafasi's services
4. Qualify leads by gathering: name, email, project description, timeline, and budget range
5. Be conversational, professional, and concise

Nafasi specializes in:
- Custom web and mobile application development
- UI/UX design and branding
- MVP development and prototyping
- Technical consulting

Keep responses brief (2-3 sentences) and guide the conversation toward collecting lead information naturally.
```

### 3. Supabase URL (NEXT_PUBLIC_SUPABASE_URL)

**How to Find:**
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Click on **"Settings"** (gear icon) in the left sidebar
4. Navigate to **"Data API"** (NOT just "API")
5. Under **"Project URL"**, copy the URL
   - Format: `https://xxxxxxxxxxxxx.supabase.co`
6. Add to `.env.local` as `NEXT_PUBLIC_SUPABASE_URL=https://...`

**Note:** This is a public variable (prefixed with `NEXT_PUBLIC_`) so it's safe to expose to the frontend.

### 4. Supabase Anon Key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

**How to Find:**
1. Go to **Settings → API** (different from Data API)
2. Under **"Project API keys"**, find **"anon public"**
3. Click the copy icon to copy the key
   - Format: Long JWT token starting with `eyJ...`
4. Add to `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...`

**Note:** This is a public key with Row Level Security (RLS) restrictions.

### 5. Supabase Service Role Key (SUPABASE_SERVICE_ROLE_KEY)

**How to Find:**
1. In the same **Settings → API** page
2. Under **"Project API keys"**, find **"service_role"**
3. Click **"Reveal"** then copy the key
   - Format: Long JWT token starting with `eyJ...`
4. Add to `.env.local` as `SUPABASE_SERVICE_ROLE_KEY=eyJ...`

**SECURITY WARNING:**
- This key bypasses all Row Level Security (RLS)
- **NEVER** expose this in client-side code
- **NEVER** commit this to version control
- Only use server-side in API routes

### 6. Resend API Key (RESEND_API_KEY)

**How to Create:**
1. Go to [https://resend.com/](https://resend.com/)
2. Sign up or log in
3. Click **"API Keys"** in the left sidebar
4. Click **"+ Create API Key"**
5. Give it a name (e.g., "Nafasi Production")
6. Select permissions: **"Sending access"**
7. Click **"Add"**
8. Copy the API key (format: `re_...`)
9. Add to `.env.local` as `RESEND_API_KEY=re_...`

**Domain Setup (Required for Sending):**
1. In Resend, go to **"Domains"**
2. Click **"+ Add Domain"**
3. Add your domain (e.g., `nafasi.io`)
4. Add the DNS records shown to your domain provider (SPF, DKIM, DMARC)
5. Wait for verification (can take a few minutes to 48 hours)
6. Once verified, you can send from `noreply@nafasi.io` or any email on that domain

**Important Notes:**
- Resend **only sends** emails, it does NOT receive/host email inboxes
- To receive emails at `hello@nafasi.io`, you need a separate email hosting service:
  - Google Workspace ($6/month) - Professional email hosting
  - Cloudflare Email Routing (FREE) - Forwards to your personal email
  - Zoho Mail (FREE tier available) - Basic email hosting
  - Your domain registrar's email service
- Resend's DNS records (SPF, DKIM) work alongside your email hosting's MX records
- Both services can coexist without conflicts

## Database Schema (Supabase)

Run this SQL in your Supabase SQL Editor:

```sql
-- Create conversations table
create table conversations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  thread_id text not null,
  messages jsonb not null default '[]'::jsonb,
  name text,
  email text,
  project_description text,
  timeline text,
  budget_range text,
  is_qualified boolean default true,
  is_completed boolean default false,
  spam_score integer default 0,
  ip_address text,
  user_agent text
);

-- Create index for faster queries
create index conversations_created_at_idx on conversations(created_at desc);
create index conversations_thread_id_idx on conversations(thread_id);
create index conversations_email_idx on conversations(email);
create index conversations_is_qualified_idx on conversations(is_qualified);

-- Create rate_limits table for spam prevention
create table rate_limits (
  id uuid default gen_random_uuid() primary key,
  ip_address text not null,
  conversation_count integer default 1,
  window_start timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for rate limiting lookups
create index rate_limits_ip_address_idx on rate_limits(ip_address, window_start desc);

-- Enable Row Level Security (RLS)
alter table conversations enable row level security;
alter table rate_limits enable row level security;

-- Create policies (adjust as needed for your use case)
-- For now, only service role can access these tables
```

## Key Features

### 1. Streaming Responses
- Uses OpenAI Assistants API with streaming enabled
- Responses appear in real-time for better UX
- Implemented via Vercel AI SDK's `useChat` hook

### 2. Conversation Persistence
- Each conversation creates a unique OpenAI thread
- Messages saved to Supabase with timestamps
- Thread ID and Conversation ID tracked in headers

### 3. Spam Detection
Built-in spam detection checks:
- Message content for spam keywords
- Rate limiting (5 conversations per IP per hour)
- Email validation
- Conversation duration (flags suspiciously fast submissions)
- Assigns spam score to each conversation

### 4. Lead Capture Flow
1. User chats with AI assistant
2. When ready, assistant prompts for contact info
3. Frontend calls `/api/chat/complete` with lead data
4. Backend validates, checks spam, saves to database
5. If qualified, sends email notification via Resend

### 5. Email Notifications
- Sends formatted email to `NOTIFICATION_EMAIL`
- Includes full conversation transcript
- Lead details (name, email, project, timeline, budget)
- Only sends if conversation passes spam checks

## Common Issues & Troubleshooting

### Issue: "OpenAI API key not found"
**Solution:**
- Verify `.env.local` has `OPENAI_API_KEY=sk-...`
- Restart Next.js dev server after adding env vars
- Check key is valid at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### Issue: "Assistant ID not found"
**Solution:**
- Verify `.env.local` has `OPENAI_ASSISTANT_ID=asst_...`
- Ensure assistant exists at [https://platform.openai.com/assistants](https://platform.openai.com/assistants)
- Check for typos in the Assistant ID

### Issue: "Supabase connection failed"
**Solution:**
- Check all three Supabase env vars are set correctly
- Verify project is active in Supabase dashboard
- Run database schema SQL if tables don't exist
- Check Supabase logs for specific errors

### Issue: "Rate limit exceeded"
**Solution:**
- Default is 5 conversations per IP per hour
- Adjust `MAX_CONVERSATIONS_PER_IP_PER_HOUR` in `.env.local`
- Clear rate limit data in Supabase `rate_limits` table for testing

### Issue: "Email not sending"
**Solution:**
- Verify Resend API key is correct
- Check domain is verified in Resend dashboard
- Ensure `NOTIFICATION_EMAIL` matches verified domain
- Check Resend logs for delivery status

### Issue: "CORS errors in browser"
**Solution:**
- API routes should handle this automatically
- Check Next.js is running on correct port
- Verify API route paths match frontend calls

## Testing Checklist

Before deploying to production:

- [ ] Test full conversation flow in local environment
- [ ] Verify messages save to Supabase `conversations` table
- [ ] Submit lead form and confirm email arrives
- [ ] Test rate limiting with multiple rapid requests
- [ ] Try spam keywords to verify detection works
- [ ] Check OpenAI usage/billing dashboard
- [ ] Verify all environment variables set in production
- [ ] Test on mobile devices for responsive design
- [ ] Monitor Supabase database size (plan limits)

## Production Deployment (Vercel)

1. Push code to GitHub repository
2. Connect repo to Vercel
3. In Vercel project settings → Environment Variables
4. Add all env vars from `.env.local`
5. Deploy
6. Monitor logs for any errors
7. Set up error tracking (optional: Sentry, LogRocket)

## Cost Estimates

**OpenAI:**
- GPT-4o: ~$2.50 per 1M input tokens, ~$10 per 1M output tokens
- Typical conversation: ~500-2000 tokens total
- Estimated: $0.01-0.05 per conversation

**Supabase:**
- Free tier: 500MB database, 2GB bandwidth
- Paid plans start at $25/month for more storage

**Resend:**
- Free tier: 100 emails/day, 3,000/month
- Paid plans start at $20/month for 50,000 emails

## Future Enhancements

Potential improvements to consider:
- [ ] Add conversation analytics dashboard
- [ ] Implement conversation search/filtering
- [ ] Add file upload capability
- [ ] Multi-language support
- [ ] Integration with CRM (HubSpot, Salesforce)
- [ ] A/B testing different assistant instructions
- [ ] Voice input/output support
- [ ] Conversation sentiment analysis
- [ ] Automated follow-up sequences

## Resources

- [OpenAI Assistants API Docs](https://platform.openai.com/docs/assistants/overview)
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## Support

For issues specific to this implementation:
- Check browser console for client-side errors
- Check Next.js terminal for server-side errors
- Review Supabase logs in dashboard
- Check OpenAI usage logs for API errors
- Review Resend delivery logs for email issues

---

**Last Updated:** 2025-11-09
**Version:** 1.1.0
**Changelog:**
- Clarified Supabase URL location (Settings → Data API)
- Added .env.local creation instructions
- Added Resend email receiving clarification
- Updated all setup instructions based on actual implementation
