# Call for Papers MVP

A minimal, working MVP for https://callforpapers.dev built with **Nuxt 4**, **@nuxt/ui**, and **yarn**.

## Features

- 🔍 **Search & Filter CFPs** - Find conferences, workshops, and meetups worldwide
- 📝 **Submit CFPs** - Community-driven submissions with moderation
- 💾 **Saved Searches** - Save and reuse search criteria
- 👨‍💼 **Admin Moderation** - Review and approve submissions
- 📱 **Responsive Design** - Works on all devices
- 🌙 **Dark Mode** - Light and dark themes
- ⚡ **SSR Ready** - Server-side rendering for SEO
- 🔗 **SEO Optimized** - JSON-LD, sitemap, robots.txt

## Tech Stack

- **Framework**: Nuxt 4 + Nitro
- **UI**: @nuxt/ui (Tailwind CSS + Headless UI)
- **Package Manager**: yarn
- **Validation**: Zod
- **Data**: In-memory mock adapters (easily replaceable)
- **Deployment**: Vercel (configured)

## Quick Start

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Set up environment** (optional):
   ```bash
   cp .env.example .env
   # Edit environment variables if needed
   ```

3. **Start development server**:
   ```bash
   yarn dev
   ```

4. **Open in browser**: http://localhost:3000

## Manual Test Checklist

### ✅ Basic Setup
- [ ] `yarn install` completes successfully
- [ ] `yarn dev` starts server without errors
- [ ] Home page loads at http://localhost:3000
- [ ] No console errors in browser
- [ ] Light/dark mode toggle works

### ✅ Data & Search
- [ ] Visit `/search` - at least 12 CFPs render with pagination
- [ ] Search by keyword (e.g., "JavaScript") - results filter correctly
- [ ] Filter by country (e.g., "United States") - results filter correctly
- [ ] Filter by topic (e.g., "React") - results filter correctly
- [ ] Filter by format (e.g., "Conference") - results filter correctly
- [ ] Filter by deadline (e.g., "Closing this week") - results filter correctly
- [ ] Pagination works - click page 2 and back
- [ ] URL updates with filters and preserves state on reload
- [ ] Clear filters button works

### ✅ CFP Details
- [ ] Click on a CFP card - navigates to detail page `/cfp/[slug]`
- [ ] Detail page shows all information (title, location, deadline, topics, perks)
- [ ] "Submit Proposal" button opens external CFP URL
- [ ] "Visit Website" button opens external conference URL
- [ ] JSON-LD structured data is present (view page source)

### ✅ Submit Flow
- [ ] Visit `/submit` - form renders correctly
- [ ] Fill out conference info (name, website, city, country)
- [ ] Fill out CFP info (title, URL, topics, deadline, format)
- [ ] Add multiple topics using the topic input
- [ ] Select speaker perks (travel, hotel, honorarium)
- [ ] Submit form - shows success message
- [ ] Form resets after successful submission

### ✅ Admin Moderation
- [ ] Visit `/admin/moderation` - redirects to login page
- [ ] Login with token "dev-admin" - redirects to moderation queue
- [ ] See submitted CFP from previous test in the queue
- [ ] Click "Approve & Publish" - item disappears from queue
- [ ] Approved CFP now appears in `/search` results
- [ ] Approved CFP has a working detail page at `/cfp/[slug]`

### ✅ Saved Searches
- [ ] Visit `/account/saved-searches` - page loads
- [ ] Click "New Search" - modal opens
- [ ] Fill out search name and filters
- [ ] Save search - appears in list
- [ ] Click "Run Search" - navigates to search with filters applied
- [ ] Refresh page - saved search persists during session
- [ ] Delete saved search - removes from list

### ✅ SEO & API
- [ ] Visit `/api/feeds/sitemap.xml` - loads XML with CFP slugs
- [ ] Visit `/api/robots.txt` - loads robots.txt with sitemap reference
- [ ] View source on search page - meta tags and content present for SSR
- [ ] View source on CFP detail page - meta tags and JSON-LD present

### ✅ Error Handling
- [ ] Visit invalid CFP slug (e.g., `/cfp/invalid`) - shows 404 error
- [ ] Try invalid search params (e.g., `/search?page=-1`) - API returns 400 JSON
- [ ] Submit empty form on `/submit` - shows validation errors
- [ ] Test network error simulation - UI shows appropriate error states

### ✅ Performance
- [ ] Initial page load feels fast
- [ ] Navigation between pages is responsive
- [ ] Search filters update without noticeable delay
- [ ] No memory leaks during extended use

## Project Structure

```
├── app/
│   ├── components/          # Reusable Vue components
│   │   ├── CfpCard.vue     # CFP listing card
│   │   ├── FilterBar.vue   # Search filters
│   │   └── DeadlinePill.vue # Deadline status badge
│   ├── layouts/
│   │   └── default.vue     # Main layout with header/footer
│   ├── middleware/
│   │   └── admin.ts        # Admin route protection
│   └── pages/              # File-based routing
│       ├── index.vue       # Homepage
│       ├── search.vue      # Search & filter CFPs
│       ├── submit.vue      # Submit new CFP
│       ├── cfp/[slug].vue  # CFP detail page
│       ├── account/
│       │   └── saved-searches.vue
│       └── admin/
│           ├── login.vue
│           └── moderation.vue
├── server/
│   ├── adapters/           # Data access layer
│   │   ├── interfaces/     # TypeScript interfaces
│   │   ├── mocks/         # In-memory implementations
│   │   └── container.ts   # Dependency injection
│   ├── api/               # Nitro API routes
│   │   ├── search.get.ts
│   │   ├── submit.post.ts
│   │   ├── cfps/[slug].get.ts
│   │   ├── admin/moderation.*
│   │   ├── account/saved-searches.*
│   │   └── feeds/sitemap.xml.get.ts
│   └── lib/               # Server utilities
│       ├── env.ts         # Centralized environment config
│       ├── validate.ts    # Zod validation helpers
│       └── response.ts    # API response helpers
├── packages/schemas/       # Shared TypeScript types
│   ├── dto.ts             # Data transfer objects
│   └── zod.ts            # Validation schemas
├── nuxt.config.ts         # Nuxt configuration
└── package.json           # Dependencies and scripts
```

## Architecture Notes

### Adapter Pattern
All data access goes through adapter interfaces in `server/adapters/interfaces/`. The mock implementations in `server/adapters/mocks/` can be easily swapped for real providers:

- `ICfpDirectory` → Replace with database + CMS
- `ISearch` → Replace with Algolia/Elasticsearch
- `IEmail` → Replace with SendGrid/Mailgun
- `IAuth` → Replace with Auth0/Supabase
- `ISitemap` → Keep current implementation

### Data Flow
1. **Pages** call server API routes via `$fetch()` or `useFetch()`
2. **API routes** validate input with Zod schemas
3. **API routes** call adapter interfaces from container
4. **Mock adapters** maintain in-memory data during process lifetime
5. **Container** provides singleton instances of adapters

### Mock Data
The mock CFP directory seeds ~12 CFPs on startup with:
- Variety of countries, topics, and formats
- Different deadline ranges (some closing soon)
- Mix of speaker perks and compensation
- Realistic conference names and details

## Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Lint code with ESLint
yarn typecheck    # Type check with vue-tsc
yarn format       # Format code with Prettier
```

## Deployment

The project is configured for **Vercel** deployment:

1. Connect repository to Vercel
2. Set environment variables if needed
3. Deploy - Nuxt will automatically detect Vercel

Environment variables:
- `ADMIN_ACCESS_TOKEN` (default: "dev-admin")
- `SITE_URL` (default: "http://localhost:3000")
- `SUPABASE_URL` (optional - for database features)
- `SUPABASE_ANON_KEY` (optional - for database features)
- `SUPABASE_SERVICE_ROLE_KEY` (optional - for admin operations)

See `server/lib/env.ts` for centralized environment configuration.

## Known Limitations (MVP Scope)

- **No real database** - Uses in-memory storage (resets on restart)
- **No authentication** - Admin uses simple token, users are anonymous
- **No email notifications** - Email adapter is a no-op mock
- **No payments** - Not needed for CFP directory
- **No advanced search** - Basic filtering only
- **No user accounts** - Saved searches use fixed demo user
- **No analytics** - No tracking or metrics collection
- **No rate limiting** - No API protection beyond basic validation
- **No tests** - Manual testing only (as requested)

## Next Steps

See `docs/mvp-notes.md` for detailed notes on:
- How to replace each mock adapter with real services
- Database schema recommendations
- API integration examples
- Production deployment considerations
