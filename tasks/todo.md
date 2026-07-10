# Content Overhaul — Real Content, No Fake Claims (2026-07-10)

## Brief (confirmed with Stefan)
- **Outcome:** Launch-ready, credible site. Real educational content, real downloads, honest workshop status.
- **Guardrails:** Free stack only. Use existing contact form + email capture patterns. Nothing on the site makes a false claim.
- **Done when:** No stale dates, no `#` links, no placeholder images, no invented social proof; Learn expanded; real PDFs downloadable; `npm run build` passes.

## Tasks
- [x] 1. `lib/data/workshops.ts` — replaced fake events with 6 workshop tracks (no fake dates/venues/spots)
- [x] 2. `lib/data/resources.ts` — real download URLs, emoji/accent instead of placeholder thumbnails, true page counts
- [x] 3. `lib/data/lessons.ts` — added 4 new full lessons (prompts 101, AI job search, AI scams/safety, churches & nonprofits) → 10 total
- [x] 4. `lib/data/tools.ts` — dropped unused placeholder logoUrl field; fixed stale "GPT-3.5" claim in ChatGPT lesson
- [x] 5. `components/ResourceCard.tsx` — gradient/emoji header, no external images
- [x] 6. `components/sections/Hero.tsx` — removed fake activity ticker + "500+" claims; real lesson ticker + honest badges
- [x] 7. `components/sections/SocialProof.tsx` — true stats derived from data (lessons/guides/tools counts, 100% free)
- [x] 8. `components/sections/FeaturedWorkshop.tsx` — workshops-launching-soon CTA with waitlist
- [x] 9. Replaced TestimonialsSection with StartLearning (3 real lessons); deleted TestimonialCard/WorkshopCard
- [x] 10. `app/workshops/page.tsx` — tracks + waitlist + request form wired to /api/workshop-request
- [x] 11. `app/about/page.tsx` — honest stats + roadmap timeline, removed invented milestones/numbers
- [x] 12. `app/community/page.tsx` — removed fake counts/spotlights; founding-member framing; wired forms
- [x] 13. `app/resources/page.tsx` — removed fake video library (fake view counts, dead YouTube link)
- [x] 14. `app/contact/page.tsx` — removed dead social links ("launching soon" + newsletter pointer)
- [x] 15. `components/shared/Footer.tsx` — newsletter wired to /api/subscribe, real privacy/terms links, dynamic year
- [x] 16. `components/shared/EmailCapture.tsx` — real POST to /api/subscribe with source tag + error state
- [x] 17. `app/api/subscribe` + `app/api/workshop-request` routes + SQL migration file
- [x] 18. `app/privacy/page.tsx` + `app/terms/page.tsx`
- [x] 19. `app/sitemap.ts` — added all 10 lesson pages + privacy/terms
- [x] 20. Generated 6 real PDFs into `public/downloads/` (headless Chromium from authored HTML)
- [x] 21. Verified: `npm run build` passes (27 pages); swept for leftover `#` links/placeholders — clean
- [x] 22. Committed, pushed, draft PR #4 open (Vercel preview verified green)

## Review
- Supabase project `the-plug-ai` (dyoveisuiynyzurfjjhk) was **paused**; restored it and applied migrations.
- Discovered the `contacts` table never existed — the live contact form was silently broken. Created
  `contacts`, `subscribers`, and `workshop_requests` tables (RLS on, service-role only). SQL also
  committed to `supabase/migrations/` for reproducibility.
- All fabricated content is gone: testimonials, member spotlights, activity ticker, attendee counts,
  "500+ trained", fake past workshops, fake video views. Every stat on the site is now derived from
  real content counts or is a true statement (100% free).
- PDF source HTML lives in the session scratchpad; regenerate with headless Chromium if content changes.
