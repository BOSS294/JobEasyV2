# Scraping and Data Ingestion

This document explains how job data is collected and loaded into the application database.

---

## Pipeline Overview

```text
scraping/run.js
  -> scraping/scrapers/Hiringcafe.js (Puppeteer)
    -> data/hiring-cafe-jobs.json
      -> scraping/utils/saveToDb.js
        -> Jobs + Skills tables in PostgreSQL
```

---

## Step 1: Scraping

Entry script: `scraping/run.js`

Behavior:
1. Executes scraper function.
2. Logs number of jobs scraped.
3. Saves jobs JSON with `saveToFile` utility.

Current scraper file is named `Hiringcafe.js`, but function inside is named `scrapeFoundit`.
This naming mismatch is harmless at runtime but can confuse maintainers.

---

## Step 2: Persist to JSON

Utility: `scraping/utils/savetoFile.js`

Writes output to:
- `data/hiring-cafe-jobs.json`

JSON file acts as:
- inspection checkpoint
- replay source for DB ingestion
- fallback data snapshot

---

## Step 3: Save to Database

Utility: `scraping/utils/saveToDb.js`

For each job:
- create `Jobs` row with mapped fields,
- parse experience,
- normalize location,
- connect or create related skills.

Skill relation uses Prisma:
- `connectOrCreate` with unique skill names

---

## Data Mapping Notes

Example mapping in `saveToDb.js`:
- `job.title` -> `Jobs.JobName`
- `job.company` -> `Jobs.CompanyName`
- `job.salary` -> `Jobs.Salary`
- `job.experience` -> `Jobs.Experience` via parser
- `job.location` -> `Jobs.Location`
- `job.posted` -> `Jobs.Description`

---

## Operational Commands

```bash
node scraping/run.js
node scraping/utils/saveToDb.js
```

---

## Quality Risks and Improvements

1. Add schema validation for scraped payload before ingestion.
2. Add dedupe strategy for jobs (unique key by source URL/title/company/date).
3. Add logging with counts for inserted vs skipped records.
4. Add retry and backoff handling in scraper.
5. Rename scraper function/file for clarity.
