# Thomas Calhoun Jr. Personal Brand Platform - Technical Documentation

## Executive Summary

This is a full-stack web application serving as Thomas Calhoun Jr.'s personal brand platform. It showcases his expertise as a "Catalyst for the Culture" with the IDEAS methodology, targeting SMB clients seeking transformative organizational change. The platform features a public-facing portfolio site and a secure admin dashboard for content management.

## Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **Wouter** - Lightweight routing (~1.2KB)
- **TanStack Query v5** - Server state management
- **React Hook Form** - Form handling with Zod validation
- **ReactQuill** - Rich text editor for project descriptions
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server framework
- **TypeScript** - Type-safe server code
- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL (Neon)** - Serverless database
- **express-session** - Session management
- **passport-local** - Authentication strategy
- **OpenID Connect** - Replit OAuth integration

### Development Tools
- **tsx** - TypeScript execution for development
- **esbuild** - Production bundling
- **drizzle-kit** - Database migrations
- **Tailwind CSS** - Styling utilities

## Application Architecture

### Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/       # shadcn/ui components
│   │   │   └── ...       # Custom components
│   │   ├── pages/        # Route-based page components
│   │   ├── lib/          # Utilities and configurations
│   │   ├── App.tsx       # Main app with routing
│   │   └── main.tsx      # React entry point
│   └── index.html        # HTML template
├── server/                # Backend Express application
│   ├── routes.ts         # API endpoints
│   ├── storage.ts        # Database layer (IStorage interface)
│   ├── auth.ts           # Authentication logic
│   ├── index.ts          # Server entry point
│   └── vite.ts           # Vite integration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Drizzle schemas and Zod validation
├── db/                   # Database configuration
│   └── index.ts          # Database connection setup
└── attached_assets/      # Static media files (logos, images)
```

### Data Flow
1. **Public Access**: Visitors view portfolio content via React frontend
2. **API Requests**: Frontend queries REST API using TanStack Query
3. **Authentication**: Admin authenticates via Replit OAuth
4. **Session Management**: Express sessions stored in PostgreSQL
5. **Database Operations**: Drizzle ORM queries PostgreSQL database
6. **Cache Management**: TanStack Query handles client-side caching and invalidation

## Database Schema

### Tables

#### `users`
- `id` (serial, primary key)
- `username` (text, unique)
- `displayName` (text)
- `replitId` (text, unique) - Replit OAuth identifier
- `createdAt` (timestamp)

#### `organizations`
- `id` (serial, primary key)
- `name` (text) - Organization name
- `type` (text) - Category: 'government', 'private', 'personal', 'education'
- `description` (text, nullable)
- `logoUrl` (text, nullable) - URL or path to logo image
- `website` (text, nullable)
- `sortOrder` (integer, default 0)

#### `projects`
- `id` (serial, primary key)
- `title` (text) - Project name
- `shortDescription` (text) - Brief summary for cards
- `description` (text) - Full rich-text description (HTML)
- `organizationId` (integer, foreign key to organizations)
- `startDate` (date, nullable)
- `endDate` (date, nullable)
- `imageUrl` (text, nullable) - Project thumbnail
- `headerImageUrl` (text, nullable) - Detail page header image
- `tags` (text array) - Searchable keywords
- `isPublished` (boolean, default true)
- `sortOrder` (integer, default 0)
- `createdAt` (timestamp)

**Ordering Logic**: Projects are ordered by `endDate DESC, startDate DESC, createdAt DESC` within their respective categories.

#### `education`
- `id` (serial, primary key)
- `institution` (text) - School/university name
- `degree` (text) - Degree or certification earned
- `field` (text, nullable) - Field of study
- `startDate` (date, nullable)
- `endDate` (date, nullable)
- `description` (text, nullable)
- `logoUrl` (text, nullable) - Institution logo
- `sortOrder` (integer, default 0)

#### `socialLinks`
- `id` (serial, primary key)
- `platform` (text) - Platform name (e.g., 'linkedin', 'twitter', 'github')
- `url` (text) - Full URL to profile
- `sortOrder` (integer, default 0)

#### `siteSettings`
- `id` (serial, primary key)
- `key` (text, unique) - Setting identifier
- `value` (text) - Setting value (JSON or plain text)
- `description` (text, nullable)

#### `sessions`
- Session storage for express-session (managed by connect-pg-simple)

### Relationships
- `projects.organizationId` → `organizations.id` (many-to-one)
- Projects can be categorized by organization type through this relationship

## API Endpoints

### Public Endpoints (No Authentication Required)

#### Projects
- `GET /api/projects` - Get all published projects with organization data
- `GET /api/projects/:id` - Get single project with organization
- `GET /api/projects/by-type/:type` - Get projects filtered by organization type

#### Organizations
- `GET /api/organizations` - Get all organizations
- `GET /api/organizations/:id` - Get single organization

#### Education
- `GET /api/education` - Get all education entries
- `GET /api/education/:id` - Get single education entry

#### Social Links
- `GET /api/social-links` - Get all social media links

#### Settings
- `GET /api/settings` - Get all site settings
- `GET /api/settings/:key` - Get specific setting by key

### Protected Endpoints (Admin Authentication Required)

#### Authentication
- `POST /api/auth/login` - Admin login (username/password)
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check` - Check authentication status

#### Projects Management
- `POST /api/projects` - Create new project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

#### Organizations Management
- `POST /api/organizations` - Create new organization
- `PATCH /api/organizations/:id` - Update organization
- `DELETE /api/organizations/:id` - Delete organization

#### Education Management
- `POST /api/education` - Create education entry
- `PATCH /api/education/:id` - Update education entry
- `DELETE /api/education/:id` - Delete education entry

#### Social Links Management
- `POST /api/social-links` - Create social link
- `PATCH /api/social-links/:id` - Update social link
- `DELETE /api/social-links/:id` - Delete social link

## Key Features

### Public Portfolio Features

1. **Hero Section**
   - Professional headshot and TCJR logo
   - "SMB Catalyst" badge
   - "Age of IDEAS" brand positioning
   - CTA button with Calendly integration
   - Grayscale theme with TCJR red (#8B0000) accents

2. **Project Showcase**
   - Categorized by organization type (government, private, personal)
   - Carousel display with organization logos
   - Short descriptions on landing page
   - Rich-text full descriptions on detail pages
   - Custom header images per project
   - Date-based chronological ordering (most recent first)

3. **IDEAS Methodology Section**
   - Interactive explanation of service approach
   - Visual presentation of methodology phases

4. **Education Display**
   - Institution logos at full size
   - Degree and field information
   - Date ranges for completion

5. **Social Media Links**
   - Authentic brand-colored icons
   - LinkedIn, Twitter, YouTube, Instagram, GitHub support

6. **Call-to-Action**
   - "Leading Change" messaging
   - Embedded Calendly for consultation booking

### Admin Dashboard Features

1. **Authentication**
   - Secure login via Replit OAuth
   - Session-based authentication with PostgreSQL storage
   - Protected routes and API endpoints

2. **Project Management**
   - Create, update, delete projects
   - Rich-text editor (ReactQuill) for descriptions
   - Upload project images and header images
   - Assign projects to organizations
   - Set start/end dates
   - Tag management
   - Publish/unpublish toggle

3. **Organization Management**
   - CRUD operations for organizations
   - Logo upload support
   - Type categorization (government, private, personal, education)
   - Website URL tracking

4. **Education Management**
   - CRUD operations for education entries
   - Institution logo management
   - Degree and field tracking
   - Date range support

5. **Social Links Management**
   - CRUD operations for social profiles
   - Platform icon mapping
   - URL validation

## Frontend Components

### Pages
- **Home.tsx** - Landing page with hero, projects carousel, IDEAS section, education, CTA
- **ProjectDetail.tsx** - Individual project detail page with rich-text description
- **AdminDashboard.tsx** - Admin panel with tabbed interface for content management
- **Login.tsx** - Admin authentication page

### Key Components
- **ProjectCarousel.tsx** - Categorized project display with organization logos
- **ProjectCard.tsx** - Individual project card with short description
- **EducationCard.tsx** - Education entry display with institution logo
- **SocialLinks.tsx** - Social media icon links
- **SimpleProjectForm.tsx** - Admin form for project CRUD
- **SimpleOrganizationForm.tsx** - Admin form for organization CRUD
- **SimpleEducationForm.tsx** - Admin form for education CRUD
- **SimpleSocialLinkForm.tsx** - Admin form for social link CRUD

### Styling Strategy
- **Theme**: Grayscale with TCJR red (#8B0000) accents
- **Typography**: Inter font family from Google Fonts
- **Color Scheme**:
  - Primary: Grayscale (black, white, grays)
  - Accent: TCJR Red (#8B0000, darker variant #6B0000 for hovers)
  - Social icons: Authentic brand colors (LinkedIn blue, Twitter blue, etc.)

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server (Express + Vite)
npm run dev
```

The development server runs on a single port with Vite middleware integrated into Express.

### Database Management
```bash
# Push schema changes to database
npm run db:push

# Force push (if data loss warning)
npm run db:push --force

# Generate migrations (if needed)
npm run db:generate
```

### Production Build
```bash
# Build frontend and backend
npm run build

# Start production server
npm start
```

Build process:
1. Vite builds React app to `dist/public/`
2. esbuild bundles Express server to `dist/index.js`
3. Production server serves static assets and API

## Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string (provided by Replit/Neon)
- `SESSION_SECRET` - Secret key for session encryption

### Replit-Specific
- `REPL_ID` - Replit environment identifier (used for OAuth)
- `NODE_ENV` - Environment mode (development/production)

## External Integrations

### Calendly
- **Purpose**: Lead generation and consultation booking
- **Integration**: Embedded iframe on public pages
- **Account**: thomas-nafasi/ideas-session

### Replit Authentication
- **Purpose**: Secure admin access
- **Method**: OpenID Connect OAuth
- **Provider**: Replit platform

### Neon PostgreSQL
- **Purpose**: Serverless database hosting
- **Features**: Connection pooling, automatic scaling

## Security Considerations

1. **Authentication**: Replit OAuth for admin access
2. **Sessions**: Secure HTTP-only cookies stored in PostgreSQL
3. **API Protection**: Middleware checks for authenticated sessions on protected routes
4. **SQL Injection Prevention**: Drizzle ORM with parameterized queries
5. **XSS Protection**: React's built-in escaping for rendered content
6. **CORS**: Configured for same-origin requests

## Design Philosophy

### Brand Identity
- **Visual Theme**: Professional grayscale with strategic TCJR red accents
- **Target Audience**: SMB executives and decision-makers
- **Brand Positioning**: "Catalyst for the Culture" with IDEAS methodology
- **Tone**: Professional, transformative, thought leadership

### User Experience
- **Public Site**: Minimal friction, clear CTAs, visual storytelling
- **Admin Dashboard**: Efficient content management with simple forms
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Performance**: Optimized images, code splitting, efficient queries

## Future Considerations

### Potential Enhancements
- Blog/thought leadership section
- Testimonials and case studies
- Analytics and tracking integration
- Newsletter subscription
- Multi-language support
- Advanced search and filtering
- Image optimization service
- CDN integration for assets

### Scalability
- Current architecture supports horizontal scaling
- Database connection pooling ready for increased traffic
- Static asset caching via Express
- Session store scales with PostgreSQL

## Maintenance Notes

### Regular Tasks
- Review and update project portfolio
- Monitor session table size
- Update social media links
- Refresh education credentials
- Review and update IDEAS methodology content

### Code Maintenance
- Keep dependencies updated (npm audit)
- Monitor database query performance
- Review and optimize bundle sizes
- Test authentication flows regularly

## Support and Documentation

### Internal Documentation
- `replit.md` - Project overview and changelog
- `SITE_DOCUMENTATION.md` - This comprehensive technical guide
- Inline code comments for complex logic
- Type definitions in `shared/schema.ts`

### External Resources
- Drizzle ORM: https://orm.drizzle.team/
- shadcn/ui: https://ui.shadcn.com/
- TanStack Query: https://tanstack.com/query/latest
- React Hook Form: https://react-hook-form.com/

---

**Last Updated**: November 2, 2025  
**Version**: 1.0  
**Platform**: Replit
