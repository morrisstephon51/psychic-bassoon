# AGENTS.md — The Plug AI Website (psychic-bassoon)

> This file is the source of truth for any coding agent working in this repo.
> Read it fully before writing a single line of code.

---

## Project Overview

**Name:** The Plug AI  
**Live URL:** https://psychic-bassoon-cam6stef.vercel.app → theplugai.net (production)  
**Tagline:** Get Connected. Get Skilled. Get into AI.  
**Mission:** AI literacy education for faith leaders, community health workers, and first-generation students in Chicago's south suburban Cook County area.  
**Repo:** morrisstephon51/psychic-bassoon

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Database | Supabase (Postgres) — project: `the-plug-ai` |
| Email | GoDaddy Outlook via SMTP (Nodemailer) |
| Deployment | Vercel |

---

## Brand Tokens

All colors, fonts, and gradients live in `lib/brand.ts`. Never hardcode hex values — import from there.

| Token | Value |
|---|---|
| Primary text | `#1A0533` |
| Secondary text | `#6B5A8E` |
| Primary purple | `#7C3AED` |
| Primary green | `#22C55E` |
| Card border | `#EDE9FE` |
| Heading font | Space Grotesk |
| Body font | Inter |

---

## Folder Structure

```
/
├── app/
│   ├── layout.tsx                    # Root layout — Navbar + Footer + metadata
│   ├── page.tsx                      # Homepage
│   ├── contact/page.tsx              # Intake form (active)
│   ├── about/ learn/ community/      # Future scope — do not scaffold unless requested
│   └── api/
│       └── contact/route.ts          # POST: DB insert + email notification
├── components/
│   ├── shared/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── EmailCapture.tsx
│   └── sections/                     # Homepage sections
├── lib/
│   ├── brand.ts                      # Brand tokens
│   ├── utils.ts
│   ├── supabase/
│   │   └── server.ts                 # Service role client (API routes only)
│   └── mailer.ts                     # Nodemailer + sendContactNotification()
└── public/
```

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| React components | PascalCase `.tsx` | `SectionHeader.tsx` |
| Utility files | camelCase `.ts` | `mailer.ts` |
| API routes | folder + `route.ts` | `app/api/contact/route.ts` |
| Supabase tables | snake_case | `contacts` |
| CSS | Tailwind utilities only | `bg-white rounded-xl` |
| Env vars | SCREAMING_SNAKE_CASE | `SMTP_HOST` |

---

## Environment Variables

Add to `.env.local` (gitignored) and to Vercel project settings.

```
# Supabase — project: the-plug-ai
NEXT_PUBLIC_SUPABASE_URL=https://dyoveisuiynyzurfjjhk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key — Supabase dashboard → Settings → API>
SUPABASE_SERVICE_ROLE_KEY=<service role key — Supabase dashboard → Settings → API>

# GoDaddy SMTP
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_USER=<your GoDaddy email address>
SMTP_PASS=<your GoDaddy email password>
SMTP_TO=<receiving address for notifications>
SMTP_FROM=<sending address — must match GoDaddy account>
```

**Never reference `SUPABASE_SERVICE_ROLE_KEY` outside `/app/api/`.**

---

## Supabase Schema

`contacts` table (already applied — do not re-run):

```sql
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  zip_code text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default now()
);
alter table contacts enable row level security;
-- No client inserts — service role via API route only
```

---

## Contact Form — `/contact`

**Fields (all required):** name · email · phone · zip_code · subject (dropdown) · message

**Submit flow:**
1. Client POSTs to `/api/contact`
2. API inserts into `contacts` via service role
3. `sendContactNotification()` fires non-blocking (email failure never blocks DB insert)
4. Client shows success state

**Subject options:** Workshop Request · Partnership · Media / Press · General Question

---

## Email — GoDaddy SMTP

- `lib/mailer.ts` exports `sendContactNotification(data: ContactData)`
- Config: `host: smtpout.secureserver.net`, `port: 587`, `secure: false`, `requireTLS: true`
- Email failure logs to console and does NOT surface an error to the user

---

## Hard Rules

1. **App Router only.** No `/pages` directory.
2. **Tailwind only.** No CSS Modules, no inline styles.
3. **TypeScript only.** No `.js` files.
4. **Never call Supabase from client components.** API routes only.
5. **Never hardcode credentials.** Always use env vars.
6. **Never scaffold out-of-scope pages** without explicit request.
7. **Always ask before modifying the Supabase schema.**

---

## /btw — Clarity Interview

Auto-trigger when scope is fuzzy, goal is ambiguous, or "done" is unmeasurable.

Ask in one message:
1. **Goal / Why** — What outcome do you actually want?
2. **Constraints** — What must NOT change?
3. **Success criteria** — How will you know it's done right?
4. **Priority** — If something gets cut, what matters most?

Synthesize a 3-line brief, confirm, then execute.

---

*Last updated: June 2026 — Stefan Morris, Founder*
