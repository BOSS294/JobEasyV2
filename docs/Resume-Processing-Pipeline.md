# Resume Processing Pipeline

This document explains the complete resume-processing flow from upload to structured output.

---

## End-to-End Sequence

```text
User uploads file on /resume
  -> Client calls handleResume(file)
    -> Server writes temp file
      -> extractText(tempPath)
        -> PDF or DOCX extraction
          -> nlpExtraction(rawText)
            -> Skills + Experience output
  -> Client stores output in localStorage
  -> Redirect to /job-recommendation
```

---

## Step 1: File Submission

Page: `app/resume/page.tsx`

User can provide input in two ways:
- File upload (`.pdf`, `.docx`)
- Manual fallback (`Skills`, `Experience`)

Priority:
1. If file exists, parsing pipeline is used.
2. If no file, manual values become structured payload.

---

## Step 2: Server Orchestration

File: `actions/handleResume.ts`

`handleResume` handles:
- browser File -> ArrayBuffer conversion,
- temp file write,
- delegation to `extractText`,
- return type normalization.

Important detail:
- temp path is currently built with `/tmp`, which is Unix-style and may fail on Windows environments if `/tmp` does not exist.

---

## Step 3: Format-Specific Extraction

File: `actions/extractText.ts`

`extractText` checks extension:
- `.pdf` -> `pdf-parse`
- `.docx` -> `mammoth.extractRawText`

Unsupported extensions trigger an error message.

---

## Step 4: NLP and Rule-Based Structuring

File: `actions/nlpExtraction.ts`

Main function: `nlpExtraction(dataText)`

Pipeline details:
1. `cleanResumeText`: normalizes delimiters/spaces.
2. `extractSkills`: extracts only text under Skills section heading.
3. `enhanceSkillsWithNLP`: fallback using compromise and known tech keywords.
4. `extractExperience`: extracts Experience section.
5. `calculateTotalExperience`: parses date ranges and computes total duration.

Output:
```ts
{
  Skills: "...",
  Experience: "..."
}
```

---

## Experience Duration Logic

`calculateTotalExperience`:
- normalizes dash variants (`–`, `—`, `to` -> `-`)
- regex-matches date range pairs
- parses each date
- sums months across ranges
- returns `X years Y months`

Potential caveat:
- overlapping date ranges are added independently, so overlap can over-count in some resumes.

---

## Failure Modes and Fallbacks

- Missing Skills section -> fallback NLP enhancement may still infer skills.
- Missing Experience section -> returns `Experience not found`.
- Parsing error -> returns message object.
- Manual input path bypasses extraction dependencies entirely.

---

## Suggested Improvements

1. Use OS-safe temp paths (`os.tmpdir()` in Node).
2. Add stricter file-size and mime validation.
3. Add parser confidence score to output.
4. Expand section heading support (`Technical Skills`, `Professional Experience`, etc.).
5. Deduplicate overlapping date intervals before summing experience.
