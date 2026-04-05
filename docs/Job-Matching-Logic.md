# Job Matching Logic

This page explains how candidate inputs are translated into recommended jobs.

---

## Inputs to Matching

Matching runs on `/job-recommendation` using values from localStorage key `resumeData`.

Expected structure:
```json
{
  "Skills": "react, javascript, node.js",
  "Experience": "2 years 3 months"
}
```

Client normalization:
- `Skills` -> split by comma, trim, lowercase
- `Experience` -> first numeric token extracted via regex

---

## Query Layer

Server action: `actions/filterJobs.ts`

Prisma query semantics:
- Include jobs where at least one related skill name matches candidate skill list.
- If experience exists, filter jobs with `Experience <= candidateExperience`.
- Include related `skills` for rendering and scoring.

---

## Match Percentage Algorithm

On the client (`app/job-recommendation/page.tsx`):

For each job:
1. Extract job skill names.
2. Intersect with candidate skills.
3. Compute:

```text
matchPercent = round((matchedSkillsCount / totalJobSkillsCount) * 100)
```

4. Attach `matchPercent` to job object for UI badge.

---

## Search and Filter UX

Search box filters displayed jobs by:
- Job name
- Company name
- Any listed skill

Filtering is client-side on already fetched results.

---

## Strengths of Current Logic

- Fast and understandable
- Explicit many-to-many skill matching
- Easy to tune by adding skills or thresholds

---

## Limitations

- No weighted skill importance (all skills treated equally)
- No semantic similarity (e.g., `JS` vs `JavaScript` unless normalized upstream)
- No location/salary preference matching
- Experience extraction uses first number only from string

---

## Improvement Ideas

1. Add weighted scoring model:
   - exact skills (high weight)
   - related skills (medium weight)
   - experience proximity (additional weight)

2. Add candidate/job normalization dictionary:
   - `js -> javascript`, `ts -> typescript`, etc.

3. Add rank tiers:
   - Excellent ($>=80$)
   - Good ($60$ to $79$)
   - Moderate ($40$ to $59$)
   - Low (<$40$)

4. Add optional filters:
   - location, salary, remote/hybrid, seniority

5. Persist recommendation sessions in DB for analytics.
