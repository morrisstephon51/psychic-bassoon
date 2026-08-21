# Content Hardening Pass — Design

## Context

The Plug AI marketing site (Next.js 14, `app/` router) is fully built but was seeded with
fabricated placeholder content during earlier development: invented testimonials attributed to
named people, fake stats, dead registration links, and non-functional "coming soon" states. A
prior session catalogued all of this in `tasks/content-checklist.md` (52 items).

Styling is explicitly out of scope for this pass (separate future work). The goal here is: no
fabricated facts presented as real, no dead-end links, all forms behave honestly, and a short
final punch-list of the real-world facts only Stefan can supply.

## Goals

1. Every CTA that currently goes nowhere (`href: null`, `href: '#'`, disabled `<span>`) leads to
   a working email-capture flow that builds the newsletter list, tagged by source.
2. No copy states a specific fact (a name, a count, a quote, a date, a view count) that hasn't
   been verified as real. Persuasive tone is preserved; specific unverified claims are not.
3. Forms report actual success/failure instead of always showing a success state.
4. Tool logos no longer depend on `via.placeholder.com`.
5. Replace the 52-item checklist with a short list of exactly what's left for Stefan.

## Non-goals

- Visual redesign (color system, typography, animation) — deferred, tracked separately.
- Building the actual Discord server, social accounts, YouTube channel, or Formspree account —
  those are Stefan's to create; the code just needs to behave correctly once they exist.
- CMS or admin UI for managing workshops/testimonials — out of scope, premature for current scale.

## Component: `NotifyModal`

A single reusable client component replacing every dead-end CTA on the site.

**Interface:**
```ts
interface NotifyModalProps {
  trigger: (open: () => void) => React.ReactNode  // render-prop so callers keep their own button styling
  title: string           // "Get notified when workshop registration opens"
  description?: string    // optional supporting line
  source: string           // segmentation tag, e.g. "workshop-ai-101", "discord", "instagram-tiktok"
}
```

**Behavior:**
- Renders its trigger inline (no layout shift); clicking opens a centered modal overlay (reuses
  the existing card/shadow visual language already in the codebase — light surface, rounded-2xl,
  border, shadow-card).
- Modal contains: title, description, single email input, submit button, close button, and an
  `Escape`/backdrop-click dismiss.
- On submit: calls `submitToFormspree(FORMSPREE_NEWSLETTER_ID, { email, source, _subject: `Notify me: ${source} — The Plug AI` })`.
- On `{ ok: true }`: show inline success state ("You're on the list — we'll email you.") for 2.5s,
  then auto-close.
- On `{ ok: false }` (network failure OR `FORMSPREE_NEWSLETTER_ID` unset): show an inline error
  state — "Something went wrong. Email us directly at hello@theplugai.net" — modal stays open so
  the user can retry or copy the email address. Never silently claim success.
- Locks body scroll while open; focuses the email input on open for accessibility.

**Call sites (all existing dead-ends converted):**

| Location | Current state | New state |
|---|---|---|
| `WorkshopCard.tsx` — "Reserve Your Spot" | `href={workshop.registrationUrl}` = `'#'` | `NotifyModal` trigger, `source: workshop-<id>` |
| `community/page.tsx` — Discord card | `href: null`, renders disabled div despite `cta: 'Join Waitlist'` | `NotifyModal` trigger, `source: 'discord'` |
| `community/page.tsx` — Instagram/TikTok card | `href: null` | `NotifyModal` trigger, `source: 'social-ig-tiktok'` |
| `resources/page.tsx` — video library CTA | inert div, `cursor-not-allowed` | `NotifyModal` trigger, `source: 'video-library'` |
| `Footer.tsx` — 4 social icons | disabled `<span>`, `opacity-50` | `NotifyModal` trigger per icon, `source: 'footer-<platform>'` |
| `contact/page.tsx` — sidebar social list | inert `<div>`, `opacity-50` wrapper | `NotifyModal` trigger per row, `source: 'contact-<platform>'` |

The community page's "Weekly Newsletter" channel card already links to `#newsletter` (a real
working `EmailCapture` section further down the page) — left as-is, it's already honest and
functional.

## De-fabrication sweep

Principle: remove the specific unverifiable claim, keep the surrounding value proposition. Do
not invent replacement facts.

| File | Fabricated content removed | Replacement |
|---|---|---|
| `Hero.tsx` | `activityFeed` array + `ActivityTicker` component (7 invented names/wins, fake "Live" indicator) | Deleted entirely |
| `Hero.tsx` | "500+ community members trained" badge | Non-numeric badge, e.g. "Free workshops. Real AI skills." |
| `SocialProof.tsx` | `StatCounter` values 500+/12+/6 (People Trained / Live Workshops / Cities Reached) | 4 non-numeric badges: "100% Free", "No Experience Needed", "Beginner-Friendly", "Community-Powered" (drops `StatCounter` import for these; keep component file since About page's achievement grid uses plain numbers, not `StatCounter`) |
| `TestimonialsSection.tsx` | 5 testimonials with invented names/cities/quotes | Replaced with an outcomes-focused section ("What you'll walk away with") — 3-4 cards describing concrete outcomes (e.g. "A rewritten resume", "A working ChatGPT account", "One AI tool added to your week") with no attributed names/quotes. Reuses existing card visual language. |
| `community/page.tsx` | `memberSpotlights` array (3 named people, invented stories) | Replaced with a single "Be one of our first stories" card — invites the visitor to share their own win via the contact form, once they have one |
| `community/page.tsx` | "500+ active members" hero stat | Removed from the stat row (keep "Free to join" and "Growing every week", which are honest) |
| `community/page.tsx` | Newsletter channel card badge "1,200+ subscribers" | Badge removed (channel card keeps name/description/CTA, no fabricated count) |
| `about/page.tsx` | `achievements` grid (500+/6/12+/100%) | Keep only "100% Free to Attend" (a policy, not a historical claim); other 3 removed from the grid layout (becomes a 2-up or restyled single-stat row — mechanical layout adjustment, not a design change) |
| `about/page.tsx` | 2026 milestone text ("500+ people trained, 12+ workshops across 6 cities") | Reworded to qualitative language ("The Plug AI starts reaching more cities and more communities") — flagged in punch-list for Stefan to confirm/replace with real numbers later |
| `about/page.tsx` | Founder narrative + earlier milestones (2024 idea, early/mid-2025) | **Kept as-is** — this is Stefan's own story, not a third-party fabrication; flagged in punch-list for him to confirm specific numbers (e.g. "12 people show up... one attendee gets a job interview 6 days later") |
| `resources/page.tsx` | `videoPlaceholders` (3 fake videos with invented view counts) | Removed; replaced with a single honest card — "Video library launching soon" + `NotifyModal` trigger |
| `lib/data/workshops.ts` | `upcomingWorkshops` — specific dates (3 of 6 already in the past relative to today), specific venues, fabricated `spotsRemaining`/`totalSpots` | Restructured: drop `date`, `time`, `location`, `spotsRemaining`, `totalSpots`, `registrationUrl` fields from the type; keep `title`, `description`, `topics`, `format` (In-Person/Virtual patterns are real content categories, not fabricated facts). Cards become topic previews with a `NotifyModal` CTA instead of a fake countdown. |
| `lib/data/workshops.ts` | `pastWorkshops` (3 invented completed events with attendee counts and a quote attributed to an unnamed "pastor") | Removed entirely — a past event either happened or didn't; there's no honest "TBD" framing for a claimed completed fact |
| `WorkshopCard.tsx`, `FeaturedWorkshop.tsx` | Consume the removed date/spot fields | Updated to the new topic-card shape; "Reserve Your Spot" → `NotifyModal`; spots-remaining progress bar removed |
| `WorkshopsPage` past-workshops section | Renders `pastWorkshops` | Section removed from the page |

Everything not listed above (audience descriptions in `WhoIsThisFor`, the 4 values in `about`,
mission copy, workshop topic lists, tool descriptions) is evaluative/qualitative copy, not a
falsifiable factual claim, and is left as-is.

## Tool logos

`lib/data/tools.ts` currently points `logoUrl` at `via.placeholder.com` — an external dependency
that (a) looks unfinished, (b) is a runtime dependency on a third party that could disappear, and
(c) scraping real trademarked logos without a licensing check is a legal question this pass
shouldn't quietly resolve either way. Replacement: self-hosted rounded-badge treatment — each
tool's initials/wordmark on its real brand color (already partially the pattern, just inlined as
an SVG/CSS badge instead of fetched from a placeholder service). No new network dependency, no
trademark exposure, ships now. `ToolCard.tsx` updated to render the badge instead of `<img
src={logoUrl}>`. `tools.ts` keeps `color` (already present) and drops `logoUrl`.

## Form error handling

`submitToFormspree` already returns `{ ok: boolean }` but every current call site
(`EmailCapture`, `Footer`, `WorkshopsPage` request form, `ContactPage`, `CommunityPage`
ambassador form) ignores `ok` and unconditionally sets `submitted = true`. Each of these adds an
`ok` check: on `false`, show an inline error state ("Something went wrong — email us directly at
hello@theplugai.net") instead of the success state, and leave the form re-submittable.

## Data flow

No new backend. All submissions continue to go through the existing `submitToFormspree` helper
straight to Formspree's REST endpoint client-side — `NotifyModal` is a new caller of the same
helper, tagged with a `source` field for segmentation once Stefan has a Formspree account with
the newsletter form wired up (existing punch-list item, unchanged by this pass).

## Testing / verification

- `npm run build` must pass (catches type errors from the `Workshop` type change).
- Manually exercise each `NotifyModal` call site in the dev server: open, submit a test email,
  confirm the success state renders; temporarily unset `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID` to
  confirm the error state renders instead of a false success.
- Grep sweep after changes: no remaining `via.placeholder.com`, no remaining `href: null` /
  `href="#"` / `href='#'` outside of intentional same-page anchors (`#newsletter`, `#request`).
- Visually confirm the workshops page no longer shows any date-bearing content (past or future) —
  full removal of fabricated dates, not just past ones, since none were ever confirmed real.

## Final punch-list (replaces `tasks/content-checklist.md`)

Written as a new `tasks/content-checklist.md` at the end of implementation, containing only:
1. Formspree account + `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` / `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID`
2. Real stats (people trained, workshops run, cities reached) once countable
3. Real testimonials with explicit consent to publish name/city/quote
4. Workshop dates/venues once locked, to repopulate the (removed) date fields
5. Social account URLs (Discord, Instagram, TikTok, YouTube, LinkedIn) once live
6. Founder photo + LinkedIn URL
7. Milestone numbers on the About page timeline to confirm or correct
