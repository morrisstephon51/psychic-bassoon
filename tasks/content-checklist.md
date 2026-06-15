# The Plug AI — Content Checklist

Audit of all placeholder content, dummy data, and missing assets across every page.
Each item notes: what's there now → what's needed → who fills it.

---

## Priority Summary

| Priority | Items | What Blocks It |
|----------|-------|----------------|
| **Ship-blocker** | #51–52 (Formspree env vars), #17–22 (workshop registration links) | Forms don't work; workshop registrations go nowhere |
| **Legal / trust risk** | #6 (testimonials), #31–33 (member spotlights), #3–5 (stats) | Fabricated social proof is a legal and credibility risk |
| **Broken UI** | #11–16 (resource images), #43–48 (tool logos), #26 (newsletter anchor) | Broken images and dead anchors look unfinished |
| **Coming soon → live** | #25, #27, #35–38, #50 (social accounts), #7–10 (video library) | Depends on creating the accounts/channels |
| **Polish** | #40–41 (founder photo/links), #34 (challenge rotation) | Improves credibility but doesn't block launch |

---

## Homepage (`/`)

### Hero Section
- [ ] **#1** Activity ticker shows 7 hardcoded names (Deja W., Marcus T., Tyrone B., etc.) cycling every 3.8s → Confirm these are real members OR wire to live data **| You / Dev**
- [ ] **#2** Stat: "500+ community members trained" → Verify actual count and update **| You**

### Social Proof Bar
- [ ] **#3** "500+ People Trained" → Confirm real number **| You**
- [ ] **#4** "12+ Live Workshops" → Confirm real number **| You**
- [ ] **#5** "6 Cities Reached" → Confirm real number **| You**

### Testimonials Section
- [ ] **#6** 5 hardcoded testimonials (Deja Williams / Chicago, Marcus Thompson / Atlanta, Ruth Jenkins / Detroit, Pastor Kevin Moore / Memphis, Aaliyah Carter / Houston) → Confirm each person is real and gave consent to be quoted, OR replace with verified testimonials **| You**

---

## Resources Page (`/resources`)

### Video Library Section
- [ ] **#7** "ChatGPT From Zero: Your First 20 Minutes" — "12K views" (fake) → Replace with real YouTube video + real view count, OR remove section until channel exists **| You**
- [ ] **#8** "How to Write a Resume Using AI (Full Walkthrough)" — "8K views" (fake) → Same **| You**
- [ ] **#9** "Canva AI Tutorial: Make a Flyer in 10 Minutes" — "6K views" (fake) → Same **| You**
- [ ] **#10** "Full Video Library — Coming Soon on YouTube" button → Link to real YouTube channel once created **| You**

### Resource Card Thumbnails
All 6 thumbnail paths point to images that don't exist in `/public/images/resources/`.

- [ ] **#11** `/images/resources/starter-kit.jpg` → Upload real image to `public/images/resources/` **| Designer / You**
- [ ] **#12** `/images/resources/cheatsheet.jpg` → Same **| Designer / You**
- [ ] **#13** `/images/resources/resume-prompts.jpg` → Same **| Designer / You**
- [ ] **#14** `/images/resources/business-playbook.jpg` → Same **| Designer / You**
- [ ] **#15** `/images/resources/challenge.jpg` → Same **| Designer / You**
- [ ] **#16** `/images/resources/churches.jpg` → Same **| Designer / You**

---

## Workshops Page (`/workshops`)

### Upcoming Events — Registration Links
All 6 workshops have `registrationUrl: '#'` — "Register Free" button goes nowhere.

- [ ] **#17** AI 101: Your First Steps → Add real Eventbrite / Zoom / Google Form URL **| You**
- [ ] **#18** AI for Job Seekers → Same **| You**
- [ ] **#19** AI for Small Business Owners → Same **| You**
- [ ] **#20** AI Basics for Seniors → Same **| You**
- [ ] **#21** Church & Nonprofit Leaders → Same **| You**
- [ ] **#22** Youth AI Camp → Same **| You**

### Workshop Dates & Locations
- [ ] **#23** Dates (e.g. "July 15, 2026") → Confirm against actual schedule; mark tentative dates clearly **| You**
- [ ] **#24** Venues (e.g. "Chicago Cultural Center") → Confirm bookings; update or mark "Location TBD" if not locked **| You**

---

## Community Page (`/community`)

### Community Channels
- [ ] **#25** Discord: disabled button, "Coming soon" badge, `href: null` → Add real Discord invite link once server is live **| You**
- [ ] **#26** Newsletter: `href: '#newsletter'` — anchor doesn't exist on page → Add `id="newsletter"` to the email form section (1-line code fix) **| Dev**
- [ ] **#27** Instagram & TikTok: disabled, "Launching soon" badge → Add real profile URLs once accounts are created **| You**
- [ ] **#28** Newsletter badge shows "1,200+ subscribers" → Confirm actual count **| You**
- [ ] **#29** Stat: "500+ active members" → Confirm actual count **| You**
- [ ] **#30** "Questions answered daily" → Remove or change until Discord actually exists **| Dev**

### Member Spotlights
- [ ] **#31** Tyrone B., Chicago — new job story → Confirm real person with consent, OR label clearly as "example story" **| You**
- [ ] **#32** Sister Gloria, Memphis — Medicare story → Same **| You**
- [ ] **#33** Keisha M., Atlanta — daycare story → Same **| You**

### Challenge of the Week
- [ ] **#34** Static: "Use AI to Write One Email Today" — never rotates → Update manually each week, OR build simple CMS/rotation logic **| You / Dev**

---

## Contact Page (`/contact`)

### Social Links Sidebar
- [ ] **#35** Instagram: disabled, opacity-50 → Replace with real `@theplugai` URL **| You**
- [ ] **#36** YouTube: disabled, opacity-50 → Replace with real channel URL **| You**
- [ ] **#37** TikTok: disabled, opacity-50 → Replace with real profile URL **| You**
- [ ] **#38** "Social pages launching soon — check back!" copy → Remove once accounts go live **| Dev**

### Contact Email
- [ ] **#39** `hello@theplugai.com` shown as contact address → Confirm inbox is monitored and Formspree routes there correctly **| You**

---

## About Page (`/about`)

### Founder Section
- [ ] **#40** Avatar: purple circle with "S" initial → Upload real headshot of Stefan **| Photographer / You**
- [ ] **#41** No social links for Stefan → Add LinkedIn URL (and Twitter/Instagram if applicable) **| You**
- [ ] **#42** Achievements: "500+ People Trained", "12+ Workshops", "6 Cities" → Same verification needed as homepage stats (#3–5) **| You**

---

## Recommended Tools Section

### Tool Card Logos
All 6 logos use `via.placeholder.com` URLs — these are temp colored squares, not real logos.

- [ ] **#43** ChatGPT logo → Replace with real OpenAI/ChatGPT logo SVG or PNG **| Dev**
- [ ] **#44** Claude logo → Replace with real Anthropic logo **| Dev**
- [ ] **#45** Google Gemini logo → Replace with real Gemini logo **| Dev**
- [ ] **#46** Canva AI logo → Replace with real Canva logo **| Dev**
- [ ] **#47** Perplexity AI logo → Replace with real Perplexity logo **| Dev**
- [ ] **#48** Notion AI logo → Replace with real Notion logo **| Dev**

### Tool URLs
- [ ] **#49** Verify all tool `href` values link to current, correct product pages **| Dev**

---

## Footer (global)

- [ ] **#50** All 4 social icons: `href: null`, opacity-50, "Social pages launching soon 🚀" → Replace with real URLs; remove coming-soon copy **| You**

---

## Formspree Integration (affects ALL forms)

- [ ] **#51** `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` not set in Vercel → Create Formspree account → create a form → add ID to Vercel Environment Variables **| You**
- [ ] **#52** `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID` not set in Vercel → Same; gates all resource downloads + newsletter signups **| You**

---

## How to Use This Checklist

1. Check off each item `[x]` as it's completed
2. Start with ship-blockers (#51–52, #17–22) — these make key features non-functional
3. Address legal/trust items (#6, #31–33) before any press or public launch
4. Items marked **Dev** can be fixed in code; items marked **You** need real-world content from Stefan
