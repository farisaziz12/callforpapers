# MVP Notes & Production Migration

This document outlines how to evolve the MVP into a production-ready application by replacing mock adapters with real services.

## Current Mock Adapters & Replacement Strategy

### 1. ICfpDirectory (Data Storage)

**Current**: In-memory JavaScript arrays with seeded data
**Replace with**: Database + CMS

#### Recommended Stack
- **Database**: PostgreSQL with Prisma ORM
- **CMS**: Strapi or direct database access
- **Hosting**: Railway, Supabase, or PlanetScale

#### Migration Steps
1. **Schema Design**:
   ```sql
   CREATE TABLE conferences (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     website_url VARCHAR(500),
     city VARCHAR(100),
     country VARCHAR(100),
     platform VARCHAR(50),
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE cfps (
     id SERIAL PRIMARY KEY,
     conference_id INTEGER REFERENCES conferences(id),
     title VARCHAR(255) NOT NULL,
     slug VARCHAR(255) UNIQUE NOT NULL,
     cfp_url VARCHAR(500) NOT NULL,
     topics TEXT[], -- PostgreSQL array
     format VARCHAR(20) CHECK (format IN ('conference', 'workshop', 'meetup', 'online')),
     opens_at TIMESTAMP,
     closes_at TIMESTAMP NOT NULL,
     travel_covered BOOLEAN DEFAULT FALSE,
     hotel_covered BOOLEAN DEFAULT FALSE,
     honorarium_provided BOOLEAN DEFAULT FALSE,
     notes TEXT,
     status VARCHAR(20) DEFAULT 'published',
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE moderation_queue (
     id SERIAL PRIMARY KEY,
     payload JSONB NOT NULL,
     submitted_at TIMESTAMP DEFAULT NOW(),
     status VARCHAR(20) DEFAULT 'pending'
   );
   ```

2. **Create Prisma Adapter**:
   ```typescript
   // server/adapters/prisma/cfp-directory.ts
   import { PrismaClient } from '@prisma/client'

   export class PrismaCfpDirectory implements ICfpDirectory {
     constructor(private prisma: PrismaClient) {}

     async list(params: SearchParams) {
       const where = {
         status: 'published',
         ...(params.q && {
           OR: [
             { title: { contains: params.q, mode: 'insensitive' } },
             { topics: { has: params.q } }
           ]
         }),
         ...(params.country && { conference: { country: params.country } }),
         ...(params.format && { format: params.format }),
         ...(params.closesBefore && { closes_at: { lte: params.closesBefore } })
       }

       const [items, total] = await Promise.all([
         this.prisma.cfp.findMany({
           where,
           include: { conference: true },
           skip: (params.page - 1) * params.pageSize,
           take: params.pageSize,
           orderBy: { closes_at: 'asc' }
         }),
         this.prisma.cfp.count({ where })
       ])

       return { items: items.map(this.mapToDTO), total }
     }

     // ... other methods
   }
   ```

3. **Update Container**:
   ```typescript
   // server/adapters/container.ts
   export function getCfpDirectory(): ICfpDirectory {
     if (process.env.NODE_ENV === 'production') {
       return new PrismaCfpDirectory(prisma)
     }
     return new MockCfpDirectory() // Keep for development
   }
   ```

### 2. ISearch (Search Engine)

**Current**: Simple JavaScript array filtering
**Replace with**: Algolia or Meilisearch

#### Algolia Integration
```typescript
// server/adapters/algolia/search.ts
import { SearchClient } from 'algoliasearch'

export class AlgoliaSearch implements ISearch {
  constructor(private client: SearchClient) {}

  async search(params: SearchParams) {
    const filters = []
    if (params.country) filters.push(`country:${params.country}`)
    if (params.format) filters.push(`format:${params.format}`)
    if (params.closesBefore) filters.push(`closes_at_timestamp < ${new Date(params.closesBefore).getTime()}`)

    const result = await this.client.search([{
      indexName: 'cfps',
      query: params.q || '',
      filters: filters.join(' AND '),
      page: (params.page || 1) - 1,
      hitsPerPage: params.pageSize || 12,
      attributesToRetrieve: ['*']
    }])

    return {
      hits: result.results[0].hits,
      total: result.results[0].nbHits
    }
  }
}
```

#### Sync Strategy
- Use database triggers or application-level hooks to sync CFP changes to Algolia
- Batch import script for initial data migration
- Consider using Algolia's automatic faceting for dynamic filters

### 3. IAuth (Authentication)

**Current**: Simple token-based mock
**Replace with**: Auth0, Supabase Auth, or NextAuth

#### Supabase Auth Example
```typescript
// server/adapters/supabase/auth.ts
export class SupabaseAuth implements IAuth {
  async getCurrentUser(event: H3Event) {
    const token = getCookie(event, 'sb-access-token') ||
                  getHeader(event, 'authorization')?.replace('Bearer ', '')

    if (!token) {
      return { id: 'anonymous', role: 'user' }
    }

    const { data: user, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return { id: 'anonymous', role: 'user' }
    }

    const isAdmin = user.user.app_metadata?.role === 'admin'

    return {
      id: user.user.id,
      role: isAdmin ? 'admin' : 'user'
    }
  }
}
```

#### Features to Add
- User registration/login with email
- Social logins (GitHub, Google, Twitter)
- Email verification
- Password reset
- User profiles
- Role-based permissions

### 4. IEmail (Notifications)

**Current**: No-op mock
**Replace with**: SendGrid, Mailgun, or Resend

#### SendGrid Implementation
```typescript
// server/adapters/sendgrid/email.ts
export class SendGridEmail implements IEmail {
  async sendDigest(userId: string, savedSearchId: string) {
    const user = await getUserById(userId)
    const search = await getSavedSearchById(savedSearchId)
    const newCfps = await findNewCfpsForSearch(search.filters)

    if (newCfps.length === 0) return 'ok'

    await sgMail.send({
      to: user.email,
      from: 'noreply@callforpapers.dev',
      templateId: 'cfp-digest',
      dynamicTemplateData: {
        user_name: user.name,
        search_name: search.name,
        cfps: newCfps,
        unsubscribe_url: `${process.env.SITE_URL}/unsubscribe/${userId}`
      }
    })

    return 'ok'
  }
}
```

#### Email Features
- Welcome emails
- CFP deadline reminders
- Weekly/monthly digests based on saved searches
- Moderation notifications for admins
- Unsubscribe management

### 5. ISavedSearches (User Data)

**Current**: In-memory map
**Replace with**: Database tables

#### Schema Extension
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  filters JSONB NOT NULL,
  email_frequency VARCHAR(20) DEFAULT 'never', -- 'never', 'daily', 'weekly'
  last_emailed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Additional Production Features

### Analytics & Monitoring

1. **Web Analytics**: Plausible or Google Analytics
2. **Error Tracking**: Sentry
3. **Performance Monitoring**: Vercel Analytics or DataDog
4. **Uptime Monitoring**: StatusCake or Uptime Robot

### Content Management

1. **Admin Dashboard**:
   - CFP statistics
   - User management
   - Content moderation queue
   - Analytics overview

2. **Content Validation**:
   - URL checking (ensure CFP links are valid)
   - Duplicate detection
   - Spam filtering

3. **Data Quality**:
   - Conference verification
   - Automated deadline updates
   - Link health monitoring

### Performance Optimizations

1. **Caching Strategy**:
   ```typescript
   // Enable Redis caching for search results
   const cacheKey = `search:${JSON.stringify(params)}`
   const cached = await redis.get(cacheKey)
   if (cached) return JSON.parse(cached)

   const result = await search.search(params)
   await redis.setex(cacheKey, 300, JSON.stringify(result)) // 5min cache
   return result
   ```

2. **Image Optimization**:
   - Conference logos
   - Speaker photos
   - Optimized formats (WebP, AVIF)

3. **CDN Setup**:
   - Static assets via Vercel Edge
   - API response caching
   - Geographic distribution

### Security Enhancements

1. **Rate Limiting**:
   ```typescript
   // server/lib/rate-limit.ts
   export async function checkRateLimit(event: H3Event, key: string, limit: number) {
     const ip = getClientIP(event)
     const rateLimitKey = `rate_limit:${key}:${ip}`

     const current = await redis.incr(rateLimitKey)
     if (current === 1) {
       await redis.expire(rateLimitKey, 3600) // 1 hour window
     }

     if (current > limit) {
       throw createError({
         statusCode: 429,
         statusMessage: 'Too Many Requests'
       })
     }
   }
   ```

2. **Input Sanitization**:
   - HTML sanitization for user content
   - URL validation
   - XSS protection

3. **CSRF Protection**:
   - CSRF tokens for form submissions
   - SameSite cookie settings

### API Enhancements

1. **Versioning**: `/api/v1/...`
2. **Pagination**: Cursor-based for large datasets
3. **Filtering**: Advanced search operators
4. **Sorting**: Multiple sort criteria
5. **Bulk Operations**: Batch CFP imports
6. **Webhooks**: Notify external services of changes

## Migration Checklist

### Phase 1: Database Setup
- [ ] Set up PostgreSQL database
- [ ] Install and configure Prisma
- [ ] Create schema and run migrations
- [ ] Implement database adapters
- [ ] Test with local development

### Phase 2: Authentication
- [ ] Set up Supabase/Auth0 project
- [ ] Implement auth adapter
- [ ] Add user registration/login pages
- [ ] Update middleware for real auth
- [ ] Test user flows

### Phase 3: Search Enhancement
- [ ] Set up Algolia/Meilisearch
- [ ] Implement search adapter
- [ ] Create data sync pipeline
- [ ] Test search performance
- [ ] Deploy search infrastructure

### Phase 4: Email System
- [ ] Set up SendGrid/Mailgun
- [ ] Create email templates
- [ ] Implement email adapter
- [ ] Set up email scheduling
- [ ] Test notification flows

### Phase 5: Production Deploy
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Deploy to Vercel/Railway
- [ ] Set up monitoring
- [ ] Performance testing

### Phase 6: Advanced Features
- [ ] Add analytics tracking
- [ ] Implement admin dashboard
- [ ] Set up error monitoring
- [ ] Add content validation
- [ ] Performance optimizations

## Environment Variables (Production)

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..." # For Prisma migrations

# Authentication
SUPABASE_URL="https://..."
SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Search
ALGOLIA_APP_ID="..."
ALGOLIA_API_KEY="..."
ALGOLIA_SEARCH_KEY="..."

# Email
SENDGRID_API_KEY="..."
SENDGRID_FROM_EMAIL="noreply@callforpapers.dev"

# Analytics
SENTRY_DSN="..."
PLAUSIBLE_DOMAIN="callforpapers.dev"

# Caching
REDIS_URL="redis://..."

# Admin
ADMIN_ACCESS_TOKEN="production-secret-token"
SITE_URL="https://callforpapers.dev"
```

This migration strategy allows for gradual evolution from MVP to production while maintaining the adapter pattern's flexibility.