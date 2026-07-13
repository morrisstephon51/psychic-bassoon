# Iterate: fix dead interactions + lesson SEO (2026-07-11)

## Context
Content overhaul (#4) and DB keep-awake (#5) are merged and live; `/api/health` = `db: up`.
Hardened the lesson pages — the highest-traffic SEO surface.

## Done
- [x] 1. Broken `/#email-capture` sidebar anchor → repointed CTA to `/resources` (where the AI
       Starter Kit it advertises actually lives). No `#email-capture` refs remain anywhere.
- [x] 2. Dead "Share This Lesson" button → new `ShareButton` client component: Web Share API on
       mobile, clipboard-copy fallback with a "Link Copied!" state on desktop.
- [x] 3. No-op `hover:bg-green-500` → `hover:bg-green-400` (real hover feedback).
- [x] 4. Per-article OpenGraph (type: article, per-lesson url/title/description) + Twitter card.
- [x] 5. Article JSON-LD structured data on every lesson page (Google can surface them as articles).
- [x] 6. Canonical URL per lesson.

## Verification (production server, localhost:3123)
- `npm run build` passes — all 10 lesson routes prerender.
- Rendered HTML confirmed: JSON-LD Article present, og:type=article, per-lesson og:url,
  canonical link, Share button, CTA → /resources. Client chunk loads (share is interactive).

## Next
- [ ] 7. Commit, push, draft PR
