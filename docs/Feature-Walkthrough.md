# Feature Walkthrough

This page explains user-facing features and how they are implemented.

---

## 1. Landing Experience

The homepage includes:
- sticky navigation,
- hero banner,
- feature section,
- trust/stats section,
- final call-to-action.

Primary entry actions:
- upload resume (`/resume`)
- open auth (`/signup`)

Main components:
- `components/LandingPage/Navbar.tsx`
- `components/LandingPage/Banner1.tsx`
- `components/LandingPage/FeatureBanner.tsx`
- `components/ResumeMatchStats.tsx`
- `components/LandingPage/CallToAction.tsx`

---

## 2. Authentication

The app supports:
- Credentials login (email + password)
- Google OAuth login

Flow summary:
1. New user submits sign-up form.
2. `registerUser` server action saves user in DB.
3. Login uses NextAuth `credentials` provider.
4. Session is managed by `SessionProvider`.

---

## 3. Resume Upload and Manual Input

On `/resume` page users can either:
- upload `.pdf` or `.docx` resume, or
- manually type `Skills` and `Experience`.

Behavior:
- If file exists: parse resume and extract data.
- Else if manual fields exist: use manual values.
- Store result in localStorage as `resumeData`.
- Redirect to `/job-recommendation`.

---

## 4. Job Recommendations

On `/job-recommendation`:
1. Resume data is read from localStorage.
2. Skills and numeric experience are normalized.
3. `filterJobs` server action fetches matching jobs.
4. Client computes match percentage per job:
   - `matchPercent = round(matchedSkills / totalJobSkills * 100)`
5. Jobs are searchable by role/company/skill.

---

## 5. Data Ingestion Utilities

The scraping toolchain allows maintainers to update job inventory:
- Puppeteer scraper collects jobs from target source.
- Jobs are saved to `data/hiring-cafe-jobs.json`.
- Ingestion utility writes jobs and skills to DB.

---

## 6. Visual and Interaction Features

- Tailwind-based responsive layouts
- Framer Motion section/card/button animations
- Drag-and-drop file UX in resume upload page
- Search field with real-time filtering on recommendations page

---

## 7. Current Product Constraints

- Resume parsing depends on heading quality and formatting
- Experience parser handles date ranges but not all formats
- No pagination in recommendations currently
- Credentials passwords are not hashed yet (critical improvement area)
