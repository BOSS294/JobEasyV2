# Database and Prisma

This page documents schema design and DB access patterns.

---

## Database Engine

- PostgreSQL
- Prisma ORM client

Datasource config is in `prisma/schema.prisma` via `DATABASE_URL`.

---

## Models

### `Users`

Fields:
- `UserID` (PK, auto increment)
- `Email` (unique)
- `Password`

### `Jobs`

Fields:
- `JobId` (PK)
- `JobName`
- `CompanyName`
- `Location` (nullable)
- `Description` (nullable)
- `Salary` (nullable)
- `Experience` (nullable int)
- `Duration` (updatedAt timestamp)
- relation to `Skill[]`

### `Skill`

Fields:
- `id` (PK)
- `name` (unique)
- relation to `Jobs[]`

---

## Relationships

- Jobs <-> Skill is many-to-many through Prisma-generated join table `_JobsToSkill`.

This enables:
- one job to have multiple skills
- one skill to map to multiple jobs

---

## Prisma Client Usage

Singleton client in `db/index.ts` prevents creating many Prisma instances in development hot-reload cycles.

Usage examples:
- `prisma.users.findUnique`
- `prisma.users.create`
- `prisma.jobs.findMany`
- `skills.connectOrCreate` while ingesting scraped jobs

---

## Migration History Highlights

- Initial users/jobs tables
- Renamed user identity field from `Name` to `Email`
- Added `Skill` model and many-to-many join
- Added `Jobs.Experience`

---

## Data Integrity Considerations

1. Skill names are unique, but case normalization strategy should be consistent during ingestion.
2. Experience parsing from scraped data currently takes first range segment (e.g., `3-5 years` -> `3`).
3. Password storage must be upgraded to hashed format.

---

## Useful Prisma Commands

```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio
```
