# Troubleshooting and Known Issues

This page tracks common problems, root causes, and practical fixes.

---

## 1. Resume Upload Works But Parsing Fails

### Symptoms
- Error message returned from resume processing
- No `resumeData` generated

### Likely Causes
- Unsupported format (only `.pdf`, `.docx` supported in parser)
- Corrupt file
- Parser dependency/runtime issue

### Fixes
1. Confirm file extension is `.pdf` or `.docx`.
2. Try with a simpler resume file.
3. Check server logs for parser error details.
4. Validate `pdf-parse` and `mammoth` are installed.

---

## 2. Temp File Path Problem on Windows

### Symptoms
- File write failures in `handleResume`
- Path-related exceptions

### Root Cause
- Current code writes temp file to `/tmp/...`, which is Unix-style.

### Recommended Fix
- Replace fixed `/tmp` path with Node `os.tmpdir()`.

---

## 3. No Jobs Displayed on Recommendation Page

### Symptoms
- Recommendation screen loads but no useful cards

### Likely Causes
- Empty jobs table
- Skill mismatch due to normalization differences
- localStorage `resumeData` missing

### Fixes
1. Confirm `resumeData` exists in browser localStorage.
2. Ensure DB has jobs and skills loaded.
3. Run scraping and ingestion scripts.
4. Check whether extracted skills are too sparse/noisy.

---

## 4. Login Fails With Credentials

### Symptoms
- Invalid credentials error despite known account

### Likely Causes
- Email case mismatch
- wrong password value in DB
- user not created

### Fixes
1. Verify user row exists in `Users` table.
2. Confirm email normalization and entered value.
3. Inspect NextAuth credential provider logs.

---

## 5. Google Sign-In Not Working

### Symptoms
- OAuth error or redirect loop

### Likely Causes
- Missing client id/secret
- callback URL mismatch in Google console

### Fixes
1. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
2. Register correct callback URL in Google app config.
3. Restart app after env updates.

---

## 6. Prisma Errors During Build/Run

### Symptoms
- Prisma client missing
- migration drift errors

### Fixes
1. Run `npx prisma generate`.
2. Run `npx prisma migrate dev` (local development).
3. Ensure `DATABASE_URL` points to expected database.

---

## 7. Security Gap: Plain Text Passwords

### Current Status
- Credentials auth compares plain text values from DB.

### Risk
- High risk in production.

### Mitigation Priority
1. Add password hashing (`bcrypt`).
2. Migrate existing user records.
3. Add login rate limiting.

---

## 8. Parsing Accuracy Limitations

### Observed Gaps
- Section extraction depends heavily on heading names (`Skills`, `Experience`)
- Experience calculations may over-count overlapping ranges

### Improvements
1. Expand heading aliases.
2. Add overlap-aware date interval unioning.
3. Add parser confidence + fallback prompts.

---

## 9. Scraper Maintenance Issues

### Observed Gaps
- Naming mismatch (`Hiringcafe.js` file vs function name)
- Source site selectors can break if layout changes

### Improvements
1. Align names for clarity.
2. Add selector fallback logic.
3. Add monitoring alert for low scrape count.
