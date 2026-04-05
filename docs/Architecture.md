# Architecture

This document explains how ResumeMatch is structured from UI to database.

---

## High-Level Architecture

```text
Client Pages (Next.js App Router)
  -> Server Actions (resume parsing, signup, matching)
    -> Prisma Client
      -> PostgreSQL

Auth Flow
  -> NextAuth (credentials + Google)
    -> Prisma Users table

Data Pipeline (offline scripts)
  -> Puppeteer scraper
    -> JSON data file
      -> Prisma ingestion script
        -> Jobs + Skills tables
```

---

## Project Structure Map

- `app/`: route pages, layout, providers, API routes
- `actions/`: server-side business logic
- `components/`: landing page and stats UI components
- `prisma/`: schema + migrations
- `db/`: Prisma singleton client
- `scraping/`: external job scraping + ingestion tools
- `data/`: stored scraped jobs (`hiring-cafe-jobs.json`)

---

## Runtime Roles

### Client Layer

Key pages:
- `app/page.tsx`: landing page composition
- `app/resume/page.tsx`: resume upload/manual entry and client-side redirect
- `app/job-recommendation/page.tsx`: loads resume data from localStorage and renders matches
- `app/signup/page.tsx`: login/sign-up UI with NextAuth + server action signup

### Server Actions Layer

- `actions/handleResume.ts`: upload handling + orchestration
- `actions/extractText.ts`: file format branching and text extraction
- `actions/nlpExtraction.ts`: parsing skills/experience from raw text
- `actions/filterJobs.ts`: DB query and matching filter
- `actions/signup.ts`: registration

### Auth Layer

- `app/lib/auth.ts`: NextAuth provider + callback config
- `app/api/auth/[...nextauth]/route.ts`: NextAuth route handlers
- `app/Providers.tsx`: wraps app with `SessionProvider`

### Data Layer

- `db/index.ts`: Prisma singleton pattern
- `prisma/schema.prisma`: models (`Users`, `Jobs`, `Skill`)
- `prisma/migrations/*`: schema evolution

### Data Acquisition Layer

- `scraping/run.js`: run scraper + save JSON
- `scraping/scrapers/Hiringcafe.js`: Puppeteer extractor logic
- `scraping/utils/saveToDb.js`: persists JSON into DB

---

## Important Design Decisions

1. **Server Actions over API-heavy backend**
   - Keeps many backend operations colocated with app logic.

2. **Local storage handoff between pages**
   - Resume extraction results are stored in browser localStorage before routing to recommendations.

3. **Skill-first matching model**
   - Job recommendation strength mainly depends on skill overlap and optional experience threshold.

4. **Many-to-many job-skill schema**
   - Prisma relation allows flexible tagging and search.

---

## Tradeoffs

- Simpler development and iteration speed
- But reduced security in some areas (plain credentials storage)
- Resume extraction quality can vary due to semi-structured resumes
- Matching is practical but not deeply semantic yet
