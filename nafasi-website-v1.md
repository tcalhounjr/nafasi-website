# Nafasi Website - Version 1 Complete Plan

## Overview

**Version 1 Goal:** Complete marketing website with AI chatbot lead qualification + Client Portal subdomain for project onboarding, contract management, progress tracking, and milestone payments.

**Release Target:** Q1 2025

---

## Architecture Overview

### Main Domain: nafasi.co
**Purpose:** Marketing, lead generation, company information
**Stack:** Next.js 16, React, Chakra UI v3, OpenAI Assistant API
**Status:** ✅ Complete (with country/timezone enhancement)

**Features:**
- Hero section with particle animation
- Value propositions
- Services showcase
- Experience/portfolio
- Technologies carousel
- Problems we solve
- AI-powered chatbot for lead qualification
- Email notifications for qualified leads

### Subdomain: client.nafasi.co
**Purpose:** Client onboarding and project management portal
**Stack:** Next.js 16, React, Chakra UI v3, Supabase Auth, Stripe
**Status:** 🔨 To Be Built

**Features:**
- Secure authentication (OAuth + JWT)
- Project acceptance/rejection
- Digital contract signing
- Project progress tracking (GitHub integration)
- Milestone-based payments (Stripe)
- Document repository
- Communication hub

---

## Technical Stack Recommendations

### Authentication & Authorization

#### **Option 1: Supabase Auth (Recommended)**
**Cost:** Free tier (50,000 MAU), then $25/month
**Pros:**
- Built-in OAuth providers (Google, GitHub, Microsoft)
- JWT token management handled automatically
- Row Level Security (RLS) for data access
- Email/password + magic links included
- Session management out of the box
- Already using Supabase for chatbot

**Implementation:**
```typescript
// lib/auth/supabase-auth.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabaseAuth = createClientComponentClient()

// Sign in with OAuth
await supabaseAuth.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://client.nafasi.co/auth/callback'
  }
})

// Access JWT token
const { data: { session } } = await supabaseAuth.auth.getSession()
const jwt = session?.access_token
```

**OAuth Providers to Enable:**
- ✅ Google (professional email addresses)
- ✅ GitHub (tech-savvy clients)
- ✅ Microsoft (enterprise clients)
- ⚠️ Email/Password (backup option)

#### **Option 2: NextAuth.js (Auth.js v5)**
**Cost:** Free (self-hosted)
**Pros:**
- Popular Next.js authentication library
- Multiple OAuth providers
- Custom JWT handling
- Edge-compatible (Next.js middleware)

**Note:** Requires more custom setup compared to Supabase Auth

**Recommendation:** Use **Supabase Auth** for seamless integration with existing database and automatic JWT management.

---

### Document Signing Integration

#### **Option 1: DocuSeal (Recommended)**
**Cost:** Free (self-hosted) or $29/month (cloud)
**GitHub:** https://github.com/docusealco/docuseal
**Pros:**
- Open source, can self-host on Vercel/Railway
- API-first design
- PDF form builder
- Template management
- Audit trail included
- No per-envelope fees
- Embeddable signing interface

**Implementation:**
```typescript
// lib/documents/docuseal.ts
import axios from 'axios'

const docuseal = axios.create({
  baseURL: process.env.DOCUSEAL_API_URL,
  headers: {
    'X-Auth-Token': process.env.DOCUSEAL_API_KEY
  }
})

// Create signature request
const { data } = await docuseal.post('/api/submissions', {
  template_id: 'nafasi_standard_contract',
  send_email: false,
  values: {
    client_name: client.name,
    client_email: client.email,
    project_description: project.description,
    total_amount: project.budget,
    start_date: project.startDate
  }
})

// Get embedded signing URL
const signingUrl = data.submission_url
```

#### **Option 2: SignRequest**
**Cost:** Free tier (10 docs/month), then $8/month
**Pros:**
- Simple API
- Good documentation
- Legally binding signatures
- Audit trails

**Cons:**
- Limited free tier
- Less customization

#### **Option 3: PandaDoc**
**Cost:** $19/month (Essentials plan)
**Pros:**
- Professional features
- E-signature + document analytics
- Template library

**Cons:**
- Most expensive option
- Overkill for simple contracts

**Recommendation:** Use **DocuSeal (self-hosted)** for cost-effectiveness and full control. Deploy on Railway or Fly.io for $5-10/month.

---

### JWT Strategy

#### **Recommended Approach: Supabase JWT + API Route Protection**

```typescript
// middleware.ts (Next.js 16)
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession()

  // Protect client portal routes
  if (req.nextUrl.pathname.startsWith('/client') && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/client/:path*', '/api/client/:path*']
}
```

**JWT Claims Structure:**
```json
{
  "sub": "user-uuid",
  "email": "client@example.com",
  "role": "client",
  "nafasi_client_id": "client-uuid",
  "aud": "authenticated",
  "exp": 1234567890
}
```

**Database Schema for User Roles:**
```sql
-- Extend Supabase auth.users with profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT NOT NULL DEFAULT 'client',
  client_id UUID REFERENCES clients(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);
```

---

## Database Schema (Supabase)

### New Tables for Client Portal

```sql
-- =====================================================
-- CLIENTS TABLE
-- =====================================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Basic Information (from chatbot lead)
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  company_name TEXT,
  country TEXT,
  timezone TEXT,

  -- Contact Information
  phone TEXT,
  address TEXT,

  -- Status
  status TEXT DEFAULT 'lead', -- lead, active, inactive, churned

  -- Metadata
  source TEXT DEFAULT 'chatbot', -- chatbot, referral, direct
  lead_conversation_id UUID REFERENCES conversations(id),
  notes JSONB DEFAULT '[]'::jsonb
);

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Relationships
  client_id UUID REFERENCES clients(id) NOT NULL,

  -- Project Details
  name TEXT NOT NULL,
  description TEXT,
  type TEXT, -- web_app, mobile_app, process_improvement

  -- Timeline & Budget
  estimated_start_date DATE,
  estimated_end_date DATE,
  estimated_budget INTEGER, -- in cents
  actual_budget INTEGER, -- in cents

  -- Status
  status TEXT DEFAULT 'pending_acceptance',
  -- pending_acceptance, contract_pending, in_progress,
  -- completed, cancelled

  -- Contract
  contract_template_id TEXT,
  contract_signed_at TIMESTAMP WITH TIME ZONE,
  contract_document_url TEXT,

  -- GitHub Integration
  github_repo_url TEXT,
  github_project_number INTEGER,

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

-- =====================================================
-- MILESTONES TABLE
-- =====================================================
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Relationships
  project_id UUID REFERENCES projects(id) NOT NULL,

  -- Milestone Details
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL, -- 1, 2, 3, etc.

  -- Payment
  amount INTEGER NOT NULL, -- in cents
  percentage DECIMAL(5,2), -- percentage of total project

  -- Status
  status TEXT DEFAULT 'pending',
  -- pending, in_progress, completed,
  -- ready_for_payment, paid

  -- Dates
  target_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,

  -- Deliverables
  deliverables JSONB DEFAULT '[]'::jsonb,
  -- [{ name: string, description: string, completed: boolean }]

  -- Payment Information
  stripe_payment_intent_id TEXT,
  stripe_invoice_id TEXT
);

-- =====================================================
-- DOCUMENTS TABLE
-- =====================================================
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Relationships
  project_id UUID REFERENCES projects(id),
  client_id UUID REFERENCES clients(id),

  -- Document Details
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  -- contract, proposal, invoice, deliverable, misc

  description TEXT,

  -- Storage
  storage_path TEXT NOT NULL, -- Supabase Storage path
  file_size_bytes INTEGER,
  mime_type TEXT,

  -- Signing (for contracts)
  requires_signature BOOLEAN DEFAULT false,
  docuseal_submission_id TEXT,
  signed_at TIMESTAMP WITH TIME ZONE,
  signed_by_email TEXT,

  -- Access
  is_public BOOLEAN DEFAULT false,
  uploaded_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- ACTIVITY LOG TABLE
-- =====================================================
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Relationships
  project_id UUID REFERENCES projects(id),
  client_id UUID REFERENCES clients(id),
  user_id UUID REFERENCES auth.users(id),

  -- Activity Details
  action TEXT NOT NULL,
  -- project_accepted, contract_signed, milestone_completed,
  -- payment_made, document_uploaded, comment_added

  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Display
  is_visible_to_client BOOLEAN DEFAULT true
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_milestones_project_id ON milestones(project_id);
CREATE INDEX idx_milestones_status ON milestones(status);
CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_documents_client_id ON documents(client_id);
CREATE INDEX idx_activity_log_project_id ON activity_log(project_id);
CREATE INDEX idx_activity_log_client_id ON activity_log(client_id);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Clients can view their own data
CREATE POLICY "Clients can view own data"
  ON clients FOR SELECT
  USING (
    auth.jwt() ->> 'email' = email OR
    auth.jwt() ->> 'role' = 'admin'
  );

-- Clients can view their own projects
CREATE POLICY "Clients can view own projects"
  ON projects FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM clients WHERE email = auth.jwt() ->> 'email'
    ) OR
    auth.jwt() ->> 'role' = 'admin'
  );

-- Clients can update specific project fields
CREATE POLICY "Clients can update project status"
  ON projects FOR UPDATE
  USING (
    client_id IN (
      SELECT id FROM clients WHERE email = auth.jwt() ->> 'email'
    )
  )
  WITH CHECK (
    -- Only allow updating status to 'accepted' or 'cancelled'
    status IN ('accepted', 'cancelled')
  );

-- Similar policies for milestones, documents, activity_log...
```

---

## Client Portal Features - Detailed

### 1. Authentication Flow

**Pages:**
- `/auth/login` - OAuth provider selection + email/password
- `/auth/callback` - OAuth callback handler
- `/auth/signup` - New client registration (optional, prefer invitation)
- `/auth/forgot-password` - Password reset

**User Journey:**
1. Client receives email: "Your Nafasi project proposal is ready!"
2. Email contains magic link or invitation to create account
3. Client clicks link → `/auth/invite?token=...`
4. Choose OAuth provider or create password
5. Redirect to `/client/dashboard`

### 2. Dashboard (`/client/dashboard`)

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Header: Nafasi Logo | Hi, [Name] | Settings ☰  │
├─────────────────────────────────────────────────┤
│ Sidebar                │ Main Content           │
│ • Dashboard            │ ┌───────────────────┐  │
│ • Projects             │ │ Active Projects   │  │
│ • Documents            │ │                   │  │
│ • Billing              │ │ [Project Cards]   │  │
│ • Support              │ └───────────────────┘  │
│                        │                        │
│                        │ ┌───────────────────┐  │
│                        │ │ Pending Actions   │  │
│                        │ │ • Sign contract   │  │
│                        │ │ • Review proposal │  │
│                        │ └───────────────────┘  │
└────────────────────────┴────────────────────────┘
```

**Dashboard Widgets:**
- Active projects count
- Pending actions (contracts to sign, payments due)
- Recent activity feed
- Upcoming milestones
- Total spent / budget remaining

### 3. Project Details (`/client/projects/[id]`)

**Tabs:**

#### **Overview Tab**
- Project name, description, type
- Timeline (start date, end date, progress bar)
- Budget breakdown
- Project status badge
- GitHub repository link (if available)

#### **Milestones Tab**
```
Milestone 1: Discovery & Planning ✅ Paid
├─ Amount: $2,500
├─ Status: Completed
├─ Deliverables:
│  ✅ Requirements document
│  ✅ Technical architecture
│  ✅ Project timeline
└─ Payment: Paid on Jan 15, 2025

Milestone 2: MVP Development 🔄 In Progress
├─ Amount: $5,000
├─ Status: In Progress (60% complete)
├─ Target Date: Feb 28, 2025
├─ Deliverables:
│  ✅ User authentication
│  🔄 Core features
│  ⏳ Testing & QA
└─ Payment: Due on completion

Milestone 3: Launch & Support ⏳ Pending
├─ Amount: $2,500
├─ Status: Not Started
├─ Target Date: Mar 15, 2025
└─ Payment: Due on completion
```

**Pay Milestone Button:**
- Only visible when milestone status = "ready_for_payment"
- Triggers Stripe Checkout
- Updates status to "paid" on success

#### **Documents Tab**
- List of all project documents
- Categories: Proposals, Contracts, Invoices, Deliverables
- Upload capability (for client to share requirements docs)
- Download links
- Signature status for contracts

#### **Progress Tab (GitHub Integration)**
- Recent commits (last 10)
- Pull requests status
- Issues (filtered by milestone)
- Deployment status
- **API Used:** GitHub REST API (public repos) or GitHub App (private repos)

**Implementation:**
```typescript
// lib/integrations/github.ts
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
})

export async function getProjectProgress(repoUrl: string) {
  const [owner, repo] = repoUrl.split('github.com/')[1].split('/')

  // Get commits
  const { data: commits } = await octokit.repos.listCommits({
    owner,
    repo,
    per_page: 10
  })

  // Get PRs
  const { data: prs } = await octokit.pulls.list({
    owner,
    repo,
    state: 'all',
    per_page: 5
  })

  // Get issues
  const { data: issues } = await octokit.issues.listForRepo({
    owner,
    repo,
    state: 'open'
  })

  return { commits, prs, issues }
}
```

#### **Activity Tab**
- Chronological activity feed
- Filterable by type (commits, payments, documents, communications)
- Timestamps in client's timezone

### 4. Contract Signing Flow

**Workflow:**
1. Nafasi admin creates project → status: `pending_acceptance`
2. System generates contract from template using DocuSeal API
3. Client receives email notification
4. Client logs in → Dashboard shows "Contract Ready to Sign"
5. Click "Review Contract" → embedded DocuSeal signing interface
6. Client reviews and signs digitally
7. DocuSeal webhook → update project status → `contract_signed`
8. Email confirmation sent to both parties
9. Project moves to `in_progress` status

**Contract Template Variables:**
- `{{client_name}}`
- `{{client_email}}`
- `{{client_company}}`
- `{{project_name}}`
- `{{project_description}}`
- `{{total_amount}}`
- `{{milestones}}` (formatted list)
- `{{start_date}}`
- `{{end_date}}`
- `{{signature_date}}` (auto-filled)

### 5. Payment Flow (Stripe)

**Stripe Integration:**
```typescript
// lib/payments/stripe.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
})

export async function createMilestonePayment(
  milestoneId: string,
  amount: number,
  clientEmail: string
) {
  // Create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // in cents
    currency: 'usd',
    customer_email: clientEmail,
    metadata: {
      milestone_id: milestoneId,
      type: 'milestone_payment'
    },
    automatic_payment_methods: {
      enabled: true
    }
  })

  return paymentIntent
}

export async function createCheckoutSession(
  milestoneId: string,
  amount: number,
  clientEmail: string,
  projectName: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: clientEmail,
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${projectName} - Milestone Payment`,
          description: `Milestone payment for ${projectName}`
        },
        unit_amount: amount
      },
      quantity: 1
    }],
    success_url: `${process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL}/projects/${projectId}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL}/projects/${projectId}`,
    metadata: {
      milestone_id: milestoneId
    }
  })

  return session
}
```

**Webhook Handler:**
```typescript
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/utils/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return new Response('Webhook signature verification failed', {
      status: 400
    })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const milestoneId = session.metadata?.milestone_id

    // Update milestone status
    await supabaseAdmin()
      .from('milestones')
      .update({
        status: 'paid',
        paid_at: new Date().toISOString(),
        stripe_payment_intent_id: session.payment_intent as string
      })
      .eq('id', milestoneId)

    // Log activity
    await supabaseAdmin()
      .from('activity_log')
      .insert({
        milestone_id: milestoneId,
        action: 'payment_made',
        description: `Payment received: $${(session.amount_total || 0) / 100}`,
        metadata: { session_id: session.id }
      })

    // Send confirmation email
    // ... email logic
  }

  return new Response('Webhook processed', { status: 200 })
}
```

---

## File Structure

```
nafasi-website/
├── app/
│   ├── (marketing)/              # Main website
│   │   ├── page.tsx
│   │   ├── components/
│   │   │   ├── Hero.tsx
│   │   │   ├── ValueProps.tsx
│   │   │   ├── Chatbot/
│   │   │   └── ...
│   │   └── api/
│   │       └── chat/
│   │
│   ├── (client-portal)/          # Client portal (subdomain)
│   │   ├── layout.tsx            # Portal-specific layout
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx          # Project list
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # Project details
│   │   │       ├── milestones/
│   │   │       ├── documents/
│   │   │       └── activity/
│   │   ├── documents/
│   │   ├── billing/
│   │   └── settings/
│   │
│   ├── auth/
│   │   ├── login/
│   │   ├── callback/
│   │   ├── signup/
│   │   └── invite/
│   │
│   └── api/
│       ├── client/               # Client portal API routes
│       │   ├── projects/
│       │   ├── milestones/
│       │   ├── documents/
│       │   └── activity/
│       ├── webhooks/
│       │   ├── stripe/
│       │   └── docuseal/
│       └── integrations/
│           └── github/
│
├── lib/
│   ├── auth/
│   │   ├── supabase-auth.ts
│   │   └── jwt-utils.ts
│   ├── payments/
│   │   └── stripe.ts
│   ├── documents/
│   │   └── docuseal.ts
│   ├── integrations/
│   │   └── github.ts
│   └── utils/
│
├── components/
│   ├── client-portal/
│   │   ├── ProjectCard.tsx
│   │   ├── MilestoneProgress.tsx
│   │   ├── DocumentList.tsx
│   │   ├── ActivityFeed.tsx
│   │   └── PaymentButton.tsx
│   └── ui/                       # Shared UI components
│
├── middleware.ts                 # Auth protection
└── .env.local
```

---

## Environment Variables

```bash
# Existing (Marketing Site)
OPENAI_API_KEY=sk-proj-...
OPENAI_ASSISTANT_ID=asst_...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
NOTIFICATION_EMAIL=hello@nafasi.io

# New (Client Portal)
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# DocuSeal
DOCUSEAL_API_URL=https://docuseal.nafasi.co/api
DOCUSEAL_API_KEY=ds_...

# GitHub Integration
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_...
GITHUB_APP_ID=123456
GITHUB_APP_PRIVATE_KEY=...

# Client Portal
NEXT_PUBLIC_CLIENT_PORTAL_URL=https://client.nafasi.co
CLIENT_PORTAL_JWT_SECRET=...

# OAuth (if not using Supabase Auth)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

---

## Deployment Architecture

### Vercel Configuration

**Root Project:** nafasi.co (main website)
**Subdomain Project:** client.nafasi.co (client portal)

**Option 1: Monorepo with Vercel Subdomains**
- Single repository
- Two Vercel projects pointing to same repo
- Different root directories or build configurations
- Shared components in `/components/ui`

**Option 2: Separate Repositories**
- nafasi-website (main site)
- nafasi-client-portal (subdomain)
- Shared component library published to npm

**Recommendation:** Option 1 (Monorepo) for easier code sharing and unified versioning.

**Vercel Project Settings (client.nafasi.co):**
```json
{
  "buildCommand": "next build",
  "framework": "nextjs",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_CLIENT_PORTAL_URL": "https://client.nafasi.co"
  }
}
```

**Custom Domains:**
- Main: `nafasi.co` → Vercel project #1
- Client: `client.nafasi.co` → Vercel project #2

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [x] Main website complete
- [x] AI chatbot complete
- [ ] Set up client portal Next.js project structure
- [ ] Implement Supabase Auth (OAuth providers)
- [ ] Create database schema for clients/projects/milestones
- [ ] Set up middleware for route protection

### Phase 2: Core Portal Features (Week 3-4)
- [ ] Dashboard page with project overview
- [ ] Project list and detail pages
- [ ] Basic document upload/download
- [ ] Activity feed implementation
- [ ] Responsive design for all portal pages

### Phase 3: Contract Management (Week 5-6)
- [ ] DocuSeal self-hosting setup
- [ ] Contract template creation
- [ ] Embedded signing interface
- [ ] Webhook integration for signature completion
- [ ] Email notifications for contract events

### Phase 4: Payment Integration (Week 7-8)
- [ ] Stripe account setup and verification
- [ ] Milestone payment creation flow
- [ ] Stripe Checkout integration
- [ ] Webhook handling for payment events
- [ ] Invoice generation and email delivery
- [ ] Payment history view

### Phase 5: GitHub Integration (Week 9)
- [ ] GitHub API integration
- [ ] Commit history display
- [ ] PR and issue tracking
- [ ] Project board synchronization (optional)
- [ ] Real-time updates via webhooks

### Phase 6: Polish & Testing (Week 10-11)
- [ ] End-to-end testing (Playwright/Cypress)
- [ ] Mobile responsiveness verification
- [ ] Performance optimization
- [ ] Security audit (auth flows, RLS policies)
- [ ] User acceptance testing with beta client

### Phase 7: Launch (Week 12)
- [ ] Production environment setup
- [ ] DNS configuration for subdomain
- [ ] SSL certificates
- [ ] Monitoring and error tracking (Sentry)
- [ ] Documentation for internal team
- [ ] Soft launch with 1-2 pilot clients

---

## Cost Breakdown

### Monthly Recurring Costs

| Service | Plan | Cost | Notes |
|---------|------|------|-------|
| Vercel | Pro | $20 | Main site + client portal |
| Supabase | Free/Pro | $0-25 | Free up to 50K MAU, then $25 |
| Stripe | Pay-per-use | 2.9% + $0.30 | Per transaction |
| DocuSeal | Self-hosted | $10 | Railway/Fly.io hosting |
| GitHub API | Free | $0 | Public repos or GitHub App |
| Resend | Free/Starter | $0-20 | 100/day free, then $20 |
| Domain | Namecheap | $12/year | .co domain |
| **Total** | | **~$50-75/month** | Scales with usage |

### One-Time Costs
- Development: In-house (no cost)
- SSL Certificates: Free (Let's Encrypt via Vercel)
- Initial DocuSeal setup: 2-4 hours

---

## Security Considerations

### Authentication
- ✅ OAuth 2.0 with trusted providers (Google, GitHub, Microsoft)
- ✅ JWT tokens with short expiration (1 hour)
- ✅ Refresh token rotation
- ✅ Rate limiting on auth endpoints
- ✅ CSRF protection (Next.js built-in)

### Authorization
- ✅ Row Level Security (RLS) in Supabase
- ✅ Middleware protection for all `/client` routes
- ✅ API route authentication checks
- ✅ Role-based access control (client vs admin)

### Data Protection
- ✅ HTTPS only (enforced by Vercel)
- ✅ Encrypted database connections (Supabase)
- ✅ Secure document storage (Supabase Storage)
- ✅ PII handling compliance (GDPR-ready)
- ✅ No sensitive data in client-side code

### Payment Security
- ✅ Stripe handles all card data (PCI compliant)
- ✅ No storing of payment methods
- ✅ Webhook signature verification
- ✅ Idempotency keys for payment operations

### Document Security
- ✅ Signed URLs for document access
- ✅ Audit trail for document access
- ✅ Encryption at rest (DocuSeal + Supabase)
- ✅ E-signature legal compliance

---

## Success Metrics

### Client Portal KPIs
- **Activation Rate:** % of invited clients who create accounts (Target: 80%)
- **Contract Signing Time:** Average time from invite to signed contract (Target: <48 hours)
- **Payment Success Rate:** % of milestone payments completed successfully (Target: 95%)
- **Client Satisfaction:** NPS score from portal users (Target: >50)
- **Support Tickets:** Number of portal-related support requests (Target: <5% of clients)

### Technical Metrics
- **Portal Uptime:** 99.9% availability
- **Page Load Time:** <2 seconds for all portal pages
- **Auth Success Rate:** >99% successful logins
- **Payment Processing Time:** <5 seconds from click to Stripe redirect

---

## Future Enhancements (V2)

### Phase 8+ (Post-V1 Launch)
- [ ] Mobile app (React Native) for clients
- [ ] In-app messaging/chat between client and Nafasi team
- [ ] Automated project status reports (weekly/monthly emails)
- [ ] Integration with project management tools (Asana, Jira)
- [ ] White-label option for enterprise clients
- [ ] Multi-currency support (EUR, GBP, etc.)
- [ ] Recurring subscription payments for maintenance
- [ ] Client referral program
- [ ] Advanced analytics dashboard for clients
- [ ] Video call scheduling integration (Calendly)

---

## Risk Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Stripe account hold | High | Low | Maintain compliance, verify account early |
| DocuSeal downtime | Medium | Low | Self-host with redundancy, regular backups |
| OAuth provider outage | Medium | Low | Support email/password as backup |
| Data breach | High | Very Low | Regular security audits, RLS, encryption |
| Scope creep | Medium | Medium | Strict V1 feature freeze, prioritize backlog |
| Client adoption low | High | Medium | User testing, onboarding flow optimization |

---

## Documentation Requirements

### Internal Documentation
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Database schema documentation
- [ ] Runbook for common operations
- [ ] Security incident response plan
- [ ] Deployment checklist

### Client-Facing Documentation
- [ ] Client portal user guide
- [ ] Payment FAQ
- [ ] Contract signing instructions
- [ ] Support contact information
- [ ] Privacy policy and terms of service

---

## Next Steps

1. **Immediate (This Week):**
   - Review and approve this plan
   - Set up client portal Next.js project
   - Configure Supabase Auth with OAuth providers
   - Create initial database migrations

2. **Short Term (Next 2 Weeks):**
   - Build dashboard and project list pages
   - Implement authentication flow
   - Set up DocuSeal instance
   - Begin Stripe integration

3. **Medium Term (Month 2):**
   - Complete all core features
   - Begin testing with internal team
   - Prepare for beta launch with 1-2 clients

4. **Long Term (Month 3+):**
   - Full production launch
   - Monitor metrics and iterate
   - Plan V2 features based on feedback

---

*Last Updated: November 11, 2025*
*Version: 1.0*
*Author: Nafasi Development Team*
