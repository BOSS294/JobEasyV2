# Authentication and Authorization

ResumeMatch uses NextAuth for session management with two auth providers.

---

## Providers

Defined in `app/lib/auth.ts`:

1. **Google Provider**
   - Uses `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

2. **Credentials Provider**
   - Accepts `Email` and `Password`
   - Looks up user in Prisma `Users` table
   - Validates password by direct equality check

---

## Auth Route

`app/api/auth/[...nextauth]/route.ts` exports NextAuth handler for GET/POST.

---

## Session Wiring

`app/Providers.tsx` wraps app with `SessionProvider`.

On protected-ish UI path `/resume`:
- `useSession` checks auth state
- if unauthenticated, user is redirected to `/signup`

---

## Signup Flow

`actions/signup.ts`:
1. Reads `email` and `password` from form data
2. Lowercases/normalizes email
3. Checks uniqueness
4. Creates user in DB
5. Redirects to `/signup`

---

## Callbacks

Configured in `NEXT_AUTH_CONFIG`:
- `jwt`: stores user id in token
- `session`: exposes token uid as `session.user.id`
- `redirect`: currently always returns `baseUrl`

Custom sign-in page:
- `pages.signIn = '/signup'`

---

## Security Notes (Important)

Current behavior:
- Credentials passwords are stored in plain text in DB.

This is not production-safe.

Recommended hardening:
1. Hash passwords with `bcrypt` before save.
2. Compare with `bcrypt.compare` in authorize callback.
3. Add basic password policy and rate limiting.
4. Add CSRF and brute-force protections for credentials login.
5. Consider email verification for account activation.
