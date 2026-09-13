# The Plug AI — Content Punch-List

Everything fabricated has been removed and every dead-end CTA now captures an email
instead. What's left is real-world information only Stefan can supply.

## Ship-blockers

- [ ] **Formspree account** — create one, then add to Vercel env vars:
  - `NEXT_PUBLIC_FORMSPREE_CONTACT_ID`
  - `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID`
  Until these are set, every form on the site shows an honest error message
  ("Something went wrong — email us directly") instead of a fake success.

## Real facts to supply when available

- [ ] Real stats (people trained, workshops run, cities reached) — currently removed
      from the Hero, SocialProof bar, Community page, and About page rather than
      shown as invented numbers.
- [ ] Real testimonials, with explicit consent from each person to publish their
      name/city/quote — currently replaced with a generic outcomes section on the
      homepage.
- [ ] Workshop dates, venues, and format for each of the 6 topics on `/workshops` —
      currently shown as topic previews with a "Notify Me" button instead of fake
      dates/venues/spot-counts.
- [ ] Any completed past workshops (date, location, attendee count, with permission
      to publish specifics) — the "Past Workshops" section was removed entirely
      rather than left with unverifiable claims.
- [ ] Social account URLs once live: Discord, Instagram, TikTok, YouTube, LinkedIn —
      every icon/button referencing these currently opens an email-capture modal
      tagged by platform (e.g. `source: 'footer-instagram'`) so you'll have a
      pre-built waitlist to announce to when each launches.
- [ ] Founder photo + LinkedIn URL for the About page (currently a purple circle
      with "S").
- [ ] Confirm or correct the specific numbers in the About page milestone
      timeline ("12 people show up... one attendee gets a job interview 6 days
      later" in Early 2025; general growth language in 2026 — the invented
      "500+/12+/6" figures were removed from that entry).
- [ ] Real video content for `/resources` — the video library section is now a
      single honest "Notify Me" card instead of 3 fake videos with invented view
      counts.

## How to use this

Nothing above is code work — it's information only you have. Once you have an
item, hand it over and it gets wired in directly (real dates back into
`lib/data/workshops.ts`, real testimonials into `TestimonialsSection.tsx`, etc.).
