# ResumeMatch Wiki

Welcome to the official project wiki for ResumeMatch (repository: `jobeasy`).

ResumeMatch is a Next.js application that helps users find relevant jobs by:
- parsing uploaded resumes (`.pdf` and `.docx`),
- extracting skills and experience using NLP + pattern logic,
- matching that data against jobs stored in PostgreSQL,
- showing ranked recommendations in a clean dashboard.

---

## Who This Wiki Is For

- Developers onboarding to the codebase
- Maintainers extending matching logic and features
- Contributors working on scraping, ingestion, auth, or UI

---

## Documentation Index

1. [Architecture](./Architecture.md)
2. [Setup and Run](./Setup-and-Run.md)
3. [Feature Walkthrough](./Feature-Walkthrough.md)
4. [Core Functions](./Core-Functions.md)
5. [Resume Processing Pipeline](./Resume-Processing-Pipeline.md)
6. [Job Matching Logic](./Job-Matching-Logic.md)
7. [Authentication and Authorization](./Authentication-and-Authorization.md)
8. [Database and Prisma](./Database-and-Prisma.md)
9. [Scraping and Data Ingestion](./Scraping-and-Data-Ingestion.md)
10. [Configuration and Environment](./Configuration-and-Environment.md)
11. [Troubleshooting and Known Issues](./Troubleshooting-and-Known-Issues.md)

---

## Product Summary

### Main User Flow

1. User signs in or registers.
2. User uploads resume (or enters skills/experience manually).
3. App extracts structured candidate info (`Skills`, `Experience`).
4. App fetches matching jobs from DB.
5. App computes match percentage and renders recommendations.

### Tech Stack

- **Frontend:** Next.js App Router, React 19, Tailwind CSS, Framer Motion
- **Backend:** Next.js Server Actions
- **Auth:** NextAuth (Google + Credentials)
- **Database:** PostgreSQL with Prisma ORM
- **Parsing/NLP:** `pdf-parse`, `mammoth`, `compromise`, `date-fns`
- **Scraping:** Puppeteer scripts + ingestion utilities

---

## Scope Notes

- The app currently uses **server actions** heavily rather than REST APIs.
- Authentication is session-based through NextAuth.
- Credential passwords are currently stored in plain text (see security notes in docs).
- Resume extraction depends on heading quality in uploaded documents.

---

## Recommended Read Order

If you are new:
1. Setup and Run
2. Architecture
3. Feature Walkthrough
4. Resume Processing Pipeline
5. Job Matching Logic

If you are contributing:
1. Core Functions
2. Database and Prisma
3. Troubleshooting and Known Issues
