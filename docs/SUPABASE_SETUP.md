# Supabase Integration Setup Guide

This guide will help you set up the Supabase database for the Call for Papers platform.

## Prerequisites

- Supabase account (sign up at https://supabase.com)
- Node.js and Yarn installed
- Supabase CLI installed (included as dev dependency)

## Setup Steps

### 1. Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in the project details:
   - Project name: `callforpapers` (or your preferred name)
   - Database password: (choose a strong password)
   - Region: (choose closest to your users)
4. Wait for the project to be created (~2 minutes)

### 2. Get Your Project Credentials

1. Go to Project Settings > API
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)
   - **Service Role Key** (starts with `eyJ...`) - Keep this secret!

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```bash
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

### 4. Run Database Migrations

You have two options to set up the database schema:

#### Option A: Using Supabase CLI (Recommended for Development)

1. Initialize Supabase locally:
   ```bash
   npx supabase init
   ```

2. Link to your remote project:
   ```bash
   npx supabase link --project-ref your-project-ref
   ```

3. Push migrations:
   ```bash
   npx supabase db push
   ```

#### Option B: Manual SQL Execution (Quick Start)

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy the contents of `supabase/migrations/20250101000000_initial_schema.sql`
5. Paste and execute the SQL

### 5. Verify Setup

1. Check that tables are created:
   - Go to Table Editor in Supabase dashboard
   - You should see: `cfps`, `moderation_queue`, `saved_searches`

2. Test the connection:
   ```bash
   yarn dev
   ```

   The app should now use Supabase instead of mock data.

## Database Schema

### Tables

#### `cfps`
Main table for approved Call for Papers:
- Stores conference/event details
- CFP deadlines and timeline
- Speaker perks (travel, hotel, honorarium)
- Topics and format

#### `moderation_queue`
Pending CFP submissions:
- Submissions from users via the submit form
- Status: pending, approved, rejected
- Admin approves items to move them to `cfps` table

#### `saved_searches`
User saved search filters:
- Store search parameters for quick access
- Associated with user_id

### Row Level Security (RLS)

The schema includes RLS policies for security:

- **CFPs**: Public read access, admin-only write
- **Moderation Queue**: Public can submit, admins can manage
- **Saved Searches**: Users can only access their own

## Type Safety

The integration is fully type-safe using generated TypeScript types:

- `server/lib/database.types.ts` - Generated from Supabase schema
- All queries are type-checked at compile time
- DTOs ensure consistency between database and API

## Regenerating Types

If you modify the database schema:

```bash
npx supabase gen types typescript --local > server/lib/database.types.ts
```

Or from remote project:

```bash
npx supabase gen types typescript --project-id your-project-ref > server/lib/database.types.ts
```

## Switching Between Mock and Supabase

The application automatically switches between mock data and Supabase based on environment variables:

- **With `SUPABASE_URL` and `SUPABASE_ANON_KEY`**: Uses Supabase
- **Without these variables**: Uses in-memory mock data

This allows development without requiring Supabase setup.

## Local Development with Supabase

For a complete local development setup with Supabase:

1. Install Docker Desktop

2. Start Supabase locally:
   ```bash
   npx supabase start
   ```

3. This starts:
   - PostgreSQL database (port 54322)
   - Studio UI (http://localhost:54323)
   - API gateway (port 54321)

4. Stop when done:
   ```bash
   npx supabase stop
   ```

## Production Deployment

1. Ensure environment variables are set in your hosting platform (Vercel, etc.)
2. Run migrations on production database
3. Configure RLS policies for production security
4. Set up database backups in Supabase dashboard

## Troubleshooting

### "Missing Supabase environment variables"
- Check `.env` file exists and has correct values
- Restart dev server after changing environment variables

### Type errors in Supabase adapter
- Regenerate types: `npx supabase gen types typescript`
- Ensure migration was applied successfully

### RLS policy blocking queries
- Check you're using the correct client (admin vs public)
- Verify JWT token contains correct role
- Review policies in Supabase dashboard > Authentication > Policies

## Next Steps

- Set up authentication (Supabase Auth)
- Configure email notifications
- Add full-text search with Postgres
- Set up database backups
- Monitor with Supabase metrics
