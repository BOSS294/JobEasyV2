# Setup and Run

This guide helps you run ResumeMatch locally.

---

## Prerequisites

- Node.js (LTS recommended)
- npm
- PostgreSQL database
- Google OAuth credentials (optional, for Google login)

---

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Configure Environment Variables

Create a `.env` file in project root with:

```env
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.PROJECT_REF:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres"
NEXTAUTH_SECRET="your_random_secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

Notes:
- `DATABASE_URL` is required.
- `DIRECT_URL` is required for Prisma migrations.
- `NEXTAUTH_SECRET` is required for auth token/session signing.
- Google keys are needed only for Google provider sign-in.

---

## 3. Generate Prisma Client and Apply Migrations

```bash
npx prisma generate
npx prisma migrate dev
```

If DB already has schema and you only need to sync client:

```bash
npx prisma generate
```

For production deploys (for example Vercel), run:

```bash
npm run db:deploy
```

---

## 4. Run Development Server

```bash
npm run dev
```

Default URL:
- `http://localhost:3000`

---

## Available Scripts

From `package.json`:

- `npm run dev` -> starts Next.js dev server with Turbopack
- `npm run build` -> `prisma generate && next build`
- `npm run start` -> runs production server
- `npm run lint` -> lint checks

---

## Optional: Scraping and Data Ingestion

### Scrape jobs into JSON

```bash
node scraping/run.js
```

### Ingest JSON into DB

```bash
node scraping/utils/saveToDb.js
```

---

## First Smoke Test Checklist

1. Open `/signup`, register, then login.
2. Open `/resume`, upload `.pdf` or `.docx`.
3. Confirm redirect to `/job-recommendation`.
4. Verify jobs are displayed with match percentages.

---

## Common Setup Pitfalls

- Missing `DATABASE_URL`
- Google OAuth callback mismatch
- No jobs in DB (recommendation page loads but no useful cards)
- Running on Windows path assumptions while code uses `/tmp` for uploads (see troubleshooting doc)
