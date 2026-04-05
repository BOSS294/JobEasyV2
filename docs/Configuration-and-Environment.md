# Configuration and Environment

This page lists core project config and required runtime settings.

---

## Environment Variables

Required:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
NEXTAUTH_SECRET="long_random_secret"
```

Optional (if Google auth enabled):

```env
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

---

## Next.js Configuration

File: `next.config.ts`

Current config:
- enables `serverComponentsExternalPackages` for `pdf-parse`

Purpose:
- ensures compatibility when using `pdf-parse` inside server-side components/actions.

---

## TypeScript Configuration

File: `tsconfig.json`

Notable settings:
- `strict: true`
- path alias `@/* -> ./*`
- `moduleResolution: bundler`
- Next.js plugin enabled

---

## Tailwind Configuration

File: `tailwind.config.ts`

Content paths include:
- `pages/**/*`
- `components/**/*`
- `app/**/*`

Custom extension:
- `dropShadow.glow`

Global stylesheet:
- `app/globals.css`
- enables smooth scrolling and Tailwind layers

---

## Package/Build Notes

From `package.json`:
- Build step explicitly runs Prisma generate before Next build.

```json
"build": "prisma generate && next build"
```

This is important for environments where Prisma client is not pre-generated.

---

## Deployment Checklist

1. Provide all required env vars.
2. Ensure DB is reachable from deployment target.
3. Run Prisma migrations in target environment.
4. Verify NextAuth callbacks/redirects.
5. Confirm resume parsing dependencies work in server runtime.
