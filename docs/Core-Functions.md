# Core Functions

This document lists the most important functions in the codebase, what they do, inputs/outputs, and where they are used.

---

## Resume Processing

### `handleResume(resume: File)`
Location: `actions/handleResume.ts`

Purpose:
- Orchestrates resume file handling server-side.

Flow:
1. Converts browser `File` into `ArrayBuffer`.
2. Writes temporary file (`/tmp/<file-name>`).
3. Calls `extractText(tempPath)`.
4. Normalizes return shape to `Record<string, string>`.

Returns:
- `{ Skills: string, Experience: string }` on success path
- `{ message: string }` on failure path

---

### `extractText(tempPath: string)`
Location: `actions/extractText.ts`

Purpose:
- Selects parser by extension and sends text to NLP extraction.

Branching:
- `.pdf` -> `extractTextFromPDF`
- `.docx` -> `extractTextFromDOCX`
- otherwise throws unsupported format error

Returns:
- Structured object from `nlpExtraction`

---

### `extractTextFromPDF(tempPath: string)`
Location: `actions/extractText.ts`

Purpose:
- Uses `pdf-parse` to read text from PDF buffer.

---

### `extractTextFromDOCX(tempPath: string)`
Location: `actions/extractText.ts`

Purpose:
- Uses `mammoth` to extract raw text from DOCX buffer.

---

### `nlpExtraction(dataText: string)`
Location: `actions/nlpExtraction.ts`

Purpose:
- Converts raw resume text into final structured candidate data.

Pipeline:
1. `cleanResumeText`
2. `extractSkills`
3. `enhanceSkillsWithNLP` fallback
4. `extractExperience`
5. `calculateTotalExperience`

Output object:
```ts
{
  Skills: string,
  Experience: string
}
```

---

### `calculateTotalExperience(experienceText: string | null)`
Location: `actions/nlpExtraction.ts`

Purpose:
- Parses date ranges and computes total months/years.

Date examples supported:
- `Jan 2020 - Feb 2022`
- `2019 - Present`
- `March 2018 - 2021`

Returns:
- Human-readable string like `3 years 5 months`

---

## Job Matching

### `filterJobs(skills: string[], experience: string)`
Location: `actions/filterJobs.ts`

Purpose:
- Query Prisma for jobs with overlapping skills and optional experience condition.

Query behavior:
- Skill match: relation filter `skills.some.name in [normalized skills]`
- Experience filter: `Experience <= parsedExperience` (if provided)
- Includes related `skills` in result

Returns:
- `jobs[]` from Prisma

---

## Authentication and Signup

### `registerUser(prevState, formData)`
Location: `actions/signup.ts`

Purpose:
- Registers a new credentials user.

Flow:
1. Read `email` and `password` from `FormData`
2. Normalize email
3. Check if user exists
4. Create user in DB
5. Redirect to `/signup`

---

### `authorize(credentials)`
Location: `app/lib/auth.ts`

Purpose:
- Credentials provider validator for NextAuth.

Flow:
1. Validate required fields.
2. Fetch user by email.
3. Compare input password and DB password.
4. Return NextAuth user object when valid.

---

## Client-Side Recommendation Utility

On `app/job-recommendation/page.tsx`:
- `fetchJobs` loads localStorage candidate data and calls `filterJobs`.
- Per-job score calculation determines `matchPercent`.
- Search filter checks role/company/skill text.

---

## Data Ingestion Helpers

### `saveToFile(filename, data)`
Location: `scraping/utils/savetoFile.js`

Purpose:
- Writes scraped jobs to JSON file in `data/`.

### `saveJobs(jobData)`
Location: `scraping/utils/saveToDb.js`

Purpose:
- Inserts jobs and upserts skills relation with `connectOrCreate`.
