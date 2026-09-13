# Content Hardening Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every fabricated fact (names, stats, dates, quotes, view counts) with honest copy, and wire every dead-end CTA on the site to a shared email-capture modal that builds the newsletter list.

**Architecture:** One new reusable client component (`NotifyModal`) replaces every non-functional CTA across 6 files. A parallel de-fabrication sweep touches 7 content files, removing unverifiable specific claims while preserving the persuasive tone and legitimate qualitative copy. A final sweep fixes silent form-failure across 5 existing forms and replaces the old 52-item checklist with a short punch-list.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, lucide-react icons, Formspree (client-side POST, no backend).

## Global Constraints

- No visual/color-system redesign in this pass — reuse existing Tailwind classes and card/shadow patterns exactly as they appear elsewhere in the codebase.
- No new dependencies.
- Do not invent replacement facts (numbers, names, dates) — qualitative copy only where a specific claim is removed.
- This project has **no automated test runner** (no Jest/Vitest configured — verify by checking `package.json` scripts, which only has `dev`/`build`/`start`/`lint`). Every task's "test" step is therefore: `npm run build` (catches TypeScript errors across the whole project) followed by a manual check in `npm run dev`. This is a deliberate substitution for unit tests, not a shortcut — do not skip the manual check.
- Every `NotifyModal` usage needs a unique `source` string — this is what lets Formspree submissions be segmented later. Reuse the exact `source` values given in each task; don't invent new ones.
- Commit after each task with `git add <files touched in that task>` — never `git add -A`.

---

### Task 1: `NotifyModal` component + wire into Footer social icons

**Files:**
- Create: `components/shared/NotifyModal.tsx`
- Modify: `components/shared/Footer.tsx`

**Interfaces:**
- Produces: `NotifyModal` component, default export from `components/shared/NotifyModal.tsx`:
  ```ts
  interface NotifyModalProps {
    trigger: (open: () => void) => React.ReactNode
    title: string
    description?: string
    source: string
  }
  ```
  Every later task imports this as `import NotifyModal from '@/components/shared/NotifyModal'`.
- Consumes: `submitToFormspree`, `FORMSPREE_NEWSLETTER_ID` from `@/lib/formspree` (existing, unchanged — see `lib/formspree.ts`).

- [ ] **Step 1: Create the `NotifyModal` component**

Write `components/shared/NotifyModal.tsx`:

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { submitToFormspree, FORMSPREE_NEWSLETTER_ID } from '@/lib/formspree'

interface NotifyModalProps {
  trigger: (open: () => void) => React.ReactNode
  title: string
  description?: string
  source: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function NotifyModal({ trigger, title, description, source }: NotifyModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  const open = () => {
    setStatus('idle')
    setEmail('')
    setIsOpen(true)
  }
  const close = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 50)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (status !== 'success') return
    const closeTimer = setTimeout(close, 2500)
    return () => clearTimeout(closeTimer)
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setStatus('loading')
    const result = await submitToFormspree(FORMSPREE_NEWSLETTER_ID, {
      email,
      source,
      _subject: `Notify me: ${source} — The Plug AI`,
    })
    setStatus(result.ok ? 'success' : 'error')
  }

  return (
    <>
      {trigger(open)}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white border border-[#EDE9FE] rounded-2xl p-6 shadow-card-hover"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-[#9385B5] hover:text-[#1A0533] hover:bg-[#F5F3FF] transition-colors"
              >
                <X size={18} />
              </button>

              {status === 'success' ? (
                <div className="flex flex-col items-center text-center gap-3 py-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 border border-green-200 flex items-center justify-center">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <p className="font-heading font-bold text-lg text-[#1A0533]">You&apos;re on the list</p>
                  <p className="text-[#6B5A8E] text-sm">We&apos;ll email you the moment this is live.</p>
                </div>
              ) : (
                <>
                  <div className="w-11 h-11 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center mb-4">
                    <Mail size={20} className="text-green-600" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#1A0533] mb-1 pr-6">{title}</h3>
                  {description && <p className="text-[#6B5A8E] text-sm mb-4">{description}</p>}

                  <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full bg-[#FAFAFA] border border-[#D8D0F7] focus:border-purple-400 rounded-xl px-4 py-3 text-[#1A0533] text-sm placeholder:text-[#9385B5] focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-3 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? 'Sending…' : 'Notify Me'}
                      {status !== 'loading' && <ArrowRight size={16} />}
                    </button>
                    {status === 'error' && (
                      <p className="flex items-start gap-1.5 text-red-600 text-xs">
                        <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                        <span>
                          Something went wrong. Email us directly at{' '}
                          <a href="mailto:hello@theplugai.net" className="underline">hello@theplugai.net</a>.
                        </span>
                      </p>
                    )}
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Wire it into Footer's social icons**

In `components/shared/Footer.tsx`, replace the imports block:

```tsx
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Instagram, Youtube, Linkedin, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { submitToFormspree, FORMSPREE_NEWSLETTER_ID } from '@/lib/formspree'
```

with:

```tsx
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Instagram, Youtube, Linkedin, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { submitToFormspree, FORMSPREE_NEWSLETTER_ID } from '@/lib/formspree'
import NotifyModal from '@/components/shared/NotifyModal'
```

Replace the `socialLinks` array:

```tsx
const socialLinks = [
  { label: 'Instagram', href: null, icon: Instagram },
  { label: 'YouTube', href: null, icon: Youtube },
  { label: 'LinkedIn', href: null, icon: Linkedin },
]
```

with:

```tsx
const socialLinks = [
  { label: 'Instagram', source: 'footer-instagram', icon: Instagram },
  { label: 'YouTube', source: 'footer-youtube', icon: Youtube },
  { label: 'LinkedIn', source: 'footer-linkedin', icon: Linkedin },
]
```

Replace the social icons render block:

```tsx
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <span
                  key={label}
                  title={`${label} — coming soon`}
                  className="w-9 h-9 rounded-lg bg-white border border-[#EDE9FE] flex items-center justify-center text-[#9385B5] opacity-50 cursor-not-allowed shadow-card"
                >
                  <Icon size={16} />
                </span>
              ))}
              <span
                title="TikTok — coming soon"
                className="w-9 h-9 rounded-lg bg-white border border-[#EDE9FE] flex items-center justify-center text-[#9385B5] opacity-50 cursor-not-allowed shadow-card"
              >
                <TikTokIcon size={16} />
              </span>
            </div>
            <p className="text-[#9385B5] text-xs">Social pages launching soon 🚀</p>
```

with:

```tsx
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ label, source, icon: Icon }) => (
                <NotifyModal
                  key={label}
                  source={source}
                  title={`Get notified when we launch on ${label}`}
                  description="We're not live there yet — leave your email and we'll ping you the moment we are."
                  trigger={(open) => (
                    <button
                      type="button"
                      onClick={open}
                      title={`${label} — coming soon`}
                      className="w-9 h-9 rounded-lg bg-white border border-[#EDE9FE] flex items-center justify-center text-[#9385B5] hover:text-purple-600 hover:border-purple-300 transition-colors shadow-card"
                    >
                      <Icon size={16} />
                    </button>
                  )}
                />
              ))}
              <NotifyModal
                source="footer-tiktok"
                title="Get notified when we launch on TikTok"
                description="We're not live there yet — leave your email and we'll ping you the moment we are."
                trigger={(open) => (
                  <button
                    type="button"
                    onClick={open}
                    title="TikTok — coming soon"
                    className="w-9 h-9 rounded-lg bg-white border border-[#EDE9FE] flex items-center justify-center text-[#9385B5] hover:text-purple-600 hover:border-purple-300 transition-colors shadow-card"
                  >
                    <TikTokIcon size={16} />
                  </button>
                )}
              />
            </div>
            <p className="text-[#9385B5] text-xs">Not live yet — tap any icon above to get notified.</p>
```

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors.

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, open the site, scroll to the footer.
Confirm: clicking any of the 4 social icons opens the modal, typing a valid email and submitting shows a loading state then either the success state (if `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID` is set in `.env.local`) or the red error message with the `mailto:` fallback (if it isn't set — expected right now, since Formspree isn't configured yet per the punch-list). Pressing `Escape` or clicking the backdrop closes the modal.

- [ ] **Step 5: Commit**

```bash
git add components/shared/NotifyModal.tsx components/shared/Footer.tsx
git commit -m "Add NotifyModal component, wire into footer social icons"
```

---

### Task 2: Wire `NotifyModal` into Contact page social sidebar

**Files:**
- Modify: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `NotifyModal` from Task 1.

- [ ] **Step 1: Update imports**

Replace:

```tsx
import { Mail, Instagram, Youtube, Linkedin, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import { submitToFormspree, FORMSPREE_CONTACT_ID } from '@/lib/formspree'
```

with:

```tsx
import { Mail, Instagram, Youtube, Linkedin, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import NotifyModal from '@/components/shared/NotifyModal'
import { submitToFormspree, FORMSPREE_CONTACT_ID } from '@/lib/formspree'
```

- [ ] **Step 2: Drop the unused `href` field from `socialLinks`**

Replace:

```tsx
const socialLinks = [
  { label: 'Instagram', handle: '@theplugai', href: '#', icon: Instagram, color: 'hover:border-pink-600 hover:text-pink-600' },
  { label: 'YouTube', handle: 'The Plug AI', href: '#', icon: Youtube, color: 'hover:border-red-600 hover:text-red-600' },
  { label: 'LinkedIn', handle: 'The Plug AI', href: '#', icon: Linkedin, color: 'hover:border-blue-600 hover:text-blue-600' },
]
```

with:

```tsx
const socialLinks = [
  { label: 'Instagram', handle: '@theplugai', source: 'contact-instagram', icon: Instagram },
  { label: 'YouTube', handle: 'The Plug AI', source: 'contact-youtube', icon: Youtube },
  { label: 'LinkedIn', handle: 'The Plug AI', source: 'contact-linkedin', icon: Linkedin },
]
```

- [ ] **Step 3: Replace the sidebar social block**

Replace:

```tsx
              <h3 className="font-heading font-bold text-lg text-[#1A0533]">Follow Along</h3>
              <p className="text-[#9385B5] text-xs">Social pages launching soon — check back!</p>
              <div className="space-y-3 opacity-50">
                {socialLinks.map(({ label, handle, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#EDE9FE] text-[#6B5A8E] cursor-not-allowed"
                  >
                    <Icon size={18} />
                    <div>
                      <p className="text-sm font-medium text-[#1A0533]">{label}</p>
                      <p className="text-xs">{handle}</p>
                    </div>
                  </div>
                ))}
                <div
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#EDE9FE] text-[#6B5A8E] cursor-not-allowed"
                >
                  <TikTokIcon size={18} />
                  <div>
                    <p className="text-sm font-medium text-[#1A0533]">TikTok</p>
                    <p className="text-xs">@theplugai</p>
                  </div>
                </div>
              </div>
```

with:

```tsx
              <h3 className="font-heading font-bold text-lg text-[#1A0533]">Follow Along</h3>
              <p className="text-[#9385B5] text-xs">Not live yet — tap any icon and we&apos;ll email you when we are.</p>
              <div className="space-y-3">
                {socialLinks.map(({ label, handle, source, icon: Icon }) => (
                  <NotifyModal
                    key={label}
                    source={source}
                    title={`Get notified: ${label}`}
                    description="We're not live there yet — leave your email and we'll ping you the moment we are."
                    trigger={(open) => (
                      <button
                        type="button"
                        onClick={open}
                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#EDE9FE] text-[#6B5A8E] hover:border-purple-300 hover:text-purple-700 transition-colors text-left"
                      >
                        <Icon size={18} />
                        <div>
                          <p className="text-sm font-medium text-[#1A0533]">{label}</p>
                          <p className="text-xs">{handle}</p>
                        </div>
                      </button>
                    )}
                  />
                ))}
                <NotifyModal
                  source="contact-tiktok"
                  title="Get notified: TikTok"
                  description="We're not live there yet — leave your email and we'll ping you the moment we are."
                  trigger={(open) => (
                    <button
                      type="button"
                      onClick={open}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#EDE9FE] text-[#6B5A8E] hover:border-purple-300 hover:text-purple-700 transition-colors text-left"
                    >
                      <TikTokIcon size={18} />
                      <div>
                        <p className="text-sm font-medium text-[#1A0533]">TikTok</p>
                        <p className="text-xs">@theplugai</p>
                      </div>
                    </button>
                  )}
                />
              </div>
```

- [ ] **Step 4: Verify it builds**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Manual verification**

Run: `npm run dev`, visit `/contact`, click each of the 4 sidebar rows (Instagram, YouTube, LinkedIn, TikTok). Confirm each opens `NotifyModal` with the right label in the title.

- [ ] **Step 6: Commit**

```bash
git add app/contact/page.tsx
git commit -m "Wire contact page social sidebar to NotifyModal"
```

---

### Task 3: Restructure workshop data — remove fabricated dates/spots/past events

**Files:**
- Modify: `lib/data/workshops.ts`
- Modify: `components/WorkshopCard.tsx`
- Modify: `components/sections/FeaturedWorkshop.tsx`
- Modify: `app/workshops/page.tsx`
- Modify: `lib/utils.ts`

**Interfaces:**
- Produces: new `Workshop` shape consumed by `WorkshopCard` and `FeaturedWorkshop`:
  ```ts
  export type WorkshopFormat = 'In-Person' | 'Virtual' | 'Hybrid'
  export interface Workshop {
    id: string
    title: string
    format: WorkshopFormat
    description: string
    topics: string[]
  }
  export const upcomingWorkshops: Workshop[]
  ```
  `PastWorkshop` interface and `pastWorkshops` export are deleted.
- Consumes: `NotifyModal` from Task 1, `Button` from `@/components/ui/Button` (existing, unchanged).

- [ ] **Step 1: Rewrite `lib/data/workshops.ts`**

Replace the entire file with:

```ts
export type WorkshopFormat = 'In-Person' | 'Virtual' | 'Hybrid'

export interface Workshop {
  id: string
  title: string
  format: WorkshopFormat
  description: string
  topics: string[]
}

export const upcomingWorkshops: Workshop[] = [
  {
    id: '1',
    title: 'AI 101: Your First Steps Into Artificial Intelligence',
    format: 'In-Person',
    description:
      'A hands-on introduction to AI tools for complete beginners. Bring your phone or laptop — we\'ll walk through ChatGPT, Canva AI, and Perplexity together. No experience needed.',
    topics: ['What is AI?', 'ChatGPT basics', 'Canva AI for graphics', 'Free tools tour'],
  },
  {
    id: '2',
    title: 'AI for Job Seekers: Land More Interviews',
    format: 'Virtual',
    description:
      'Learn how to use AI to write a stronger resume, prep for interviews, find jobs that match your skills, and write standout cover letters — all for free.',
    topics: ['Resume writing with AI', 'Cover letter prompts', 'Interview prep', 'Job search tools'],
  },
  {
    id: '3',
    title: 'AI for Small Business Owners',
    format: 'In-Person',
    description:
      'Marketing, customer service, bookkeeping — learn how AI helps you run your business without hiring a team. Real tools, real use cases, real results.',
    topics: ['AI marketing copy', 'Customer service automation', 'AI for social media', 'Bookkeeping tools'],
  },
  {
    id: '4',
    title: 'AI Basics for Seniors',
    format: 'In-Person',
    description:
      'A gentle, patient introduction to AI tools designed for seniors. Learn voice assistants, how to ask AI questions, and practical daily life uses. Helpers on site.',
    topics: ['Voice assistants', 'ChatGPT basics', 'Healthcare info', 'Staying connected'],
  },
  {
    id: '5',
    title: 'Church & Nonprofit Leaders: AI for Your Organization',
    format: 'Virtual',
    description:
      'Designed specifically for church leaders, nonprofit directors, and community org leaders. Learn how AI can help with outreach, bulletins, fundraising copy, and volunteer coordination.',
    topics: ['AI for outreach', 'Newsletter writing', 'Fundraising copy', 'Event planning with AI'],
  },
  {
    id: '6',
    title: 'Youth AI Camp: For Ages 14–24',
    format: 'In-Person',
    description:
      'A full-day immersive experience for young people. Build your first AI project, learn tools for school and work, and meet others your age who are interested in tech.',
    topics: ['AI tools for school', 'Building with AI', 'Career paths in AI', 'AI safety'],
  },
]
```

- [ ] **Step 2: Remove `formatShortDate` from `lib/utils.ts`**

It will have no remaining callers after Steps 3–4. Replace:

```ts
export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function truncate(text: string, length: number): string {
```

with:

```ts
export function truncate(text: string, length: number): string {
```

(This deletes the `formatShortDate` function and leaves `truncate` in place — do not touch `formatDate`, it's unrelated pre-existing code.)

- [ ] **Step 3: Rewrite `components/WorkshopCard.tsx`**

Replace the entire file with:

```tsx
'use client'

import { motion } from 'framer-motion'
import { Video, Building2, Layers } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import NotifyModal from '@/components/shared/NotifyModal'
import type { Workshop } from '@/lib/data/workshops'

interface WorkshopCardProps {
  workshop: Workshop
  index?: number
}

export default function WorkshopCard({ workshop, index = 0 }: WorkshopCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="bg-white border border-[#EDE9FE] hover:border-purple-300 rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 shadow-card hover:shadow-card-hover"
    >
      <div className="flex items-center gap-2">
        {workshop.format === 'Virtual' ? (
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Video size={18} className="text-blue-600" />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Building2 size={18} className="text-purple-600" />
          </div>
        )}
        <Badge
          label={workshop.format}
          variant="default"
          className={workshop.format === 'Virtual'
            ? 'bg-blue-100 text-blue-700 border-blue-200'
            : 'bg-purple-100 text-purple-700 border-purple-200'
          }
        />
      </div>

      <h3 className="font-heading font-bold text-xl text-[#1A0533] leading-snug">
        {workshop.title}
      </h3>

      <p className="text-[#6B5A8E] text-sm leading-relaxed line-clamp-3">{workshop.description}</p>

      <div className="flex items-center gap-2 flex-wrap">
        {workshop.topics.map((topic) => (
          <span
            key={topic}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs text-[#6B5A8E] bg-[#F5F3FF] border border-[#EDE9FE]"
          >
            <Layers size={10} />
            {topic}
          </span>
        ))}
      </div>

      <NotifyModal
        source={`workshop-${workshop.id}`}
        title={`Get notified: ${workshop.title}`}
        description="We haven't locked a date yet — leave your email and we'll tell you the moment registration opens."
        trigger={(open) => (
          <Button onClick={open} fullWidth size="md">
            Notify Me When This Opens
          </Button>
        )}
      />
    </motion.div>
  )
}
```

- [ ] **Step 4: Rewrite `components/sections/FeaturedWorkshop.tsx`**

Replace the entire file with:

```tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { upcomingWorkshops } from '@/lib/data/workshops'

export default function FeaturedWorkshop() {
  const featured = upcomingWorkshops[0]

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #FAFAFA 60%, #F0FFF4 100%)', border: '1px solid #EDE9FE', boxShadow: '0 4px 32px rgba(107,33,168,0.08)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-green-200/20 blur-2xl pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-50" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-600 text-sm font-semibold tracking-wide uppercase">
                  Coming Up Next
                </span>
              </div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-[#1A0533] mb-4 leading-tight">
                {featured.title}
              </h2>
              <p className="text-[#6B5A8E] text-base leading-relaxed mb-6 max-w-xl">
                {featured.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {featured.topics.map((topic) => (
                  <span key={topic} className="px-3 py-1 bg-white border border-[#EDE9FE] rounded-full text-xs text-[#6B5A8E] shadow-card">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 lg:min-w-[220px]">
              <div className="bg-white border border-[#EDE9FE] rounded-2xl p-6 text-center w-full shadow-card">
                <Zap size={28} className="text-amber-500 fill-amber-500 mx-auto mb-2" />
                <p className="text-[#1A0533] font-heading font-bold text-base">Date not locked yet</p>
                <p className="text-[#9385B5] text-xs mt-1">Get notified the moment it&apos;s scheduled</p>
              </div>

              <motion.a
                href="/workshops"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-2xl text-center transition-colors duration-200 flex items-center justify-center gap-2 text-base shadow-green"
              >
                Notify Me
                <ArrowRight size={18} />
              </motion.a>

              <a href="/workshops" className="text-[#9385B5] hover:text-[#6B5A8E] text-sm transition-colors flex items-center gap-1">
                View all workshops <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Remove the Past Workshops section from `app/workshops/page.tsx`**

Replace the imports:

```tsx
'use client'

import { useState } from 'react'
import { submitToFormspree, FORMSPREE_CONTACT_ID } from '@/lib/formspree'
import { motion } from 'framer-motion'
import { Calendar, Users, MapPin, Building2, ArrowRight, CheckCircle } from 'lucide-react'
import WorkshopCard from '@/components/WorkshopCard'
import SectionHeader from '@/components/SectionHeader'
import { upcomingWorkshops, pastWorkshops } from '@/lib/data/workshops'
```

with:

```tsx
'use client'

import { useState } from 'react'
import { submitToFormspree, FORMSPREE_CONTACT_ID } from '@/lib/formspree'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import WorkshopCard from '@/components/WorkshopCard'
import SectionHeader from '@/components/SectionHeader'
import { upcomingWorkshops } from '@/lib/data/workshops'
```

Replace the "Upcoming Events" section count line:

```tsx
            <div className="flex items-center gap-2 text-sm text-[#6B5A8E]">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {upcomingWorkshops.length} events scheduled
            </div>
```

with:

```tsx
            <div className="flex items-center gap-2 text-sm text-[#6B5A8E]">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {upcomingWorkshops.length} workshop topics ready to go
            </div>
```

Delete the entire "Past Workshops" section — everything from the `{/* Past Workshops */}` comment through its closing `</section>`:

```tsx
      {/* Past Workshops */}
      <section className="py-16 px-4 md:px-8 bg-[#F5F3FF] border-y border-[#EDE9FE]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Past Workshops"
            title="What We've Built Together"
            subtitle="Real workshops, real communities, real impact. Here's a look at where The Plug AI has been."
            align="left"
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastWorkshops.map((pw, i) => (
              <motion.div
                key={pw.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white border border-[#EDE9FE] rounded-2xl p-6 space-y-4"
              >
                {/* Visual header */}
                <div className="h-32 rounded-xl overflow-hidden relative bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center">
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-700/40 border border-purple-600/30 flex items-center justify-center mx-auto mb-1">
                      <Building2 size={20} className="text-purple-300" />
                    </div>
                    <p className="text-purple-300 text-xs font-medium">{pw.location}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[#1A0533] text-base mb-2">{pw.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-[#6B5A8E] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {pw.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {pw.location}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-green-600 text-xs font-semibold mb-3">
                    <Users size={11} />
                    {pw.attendees} attendees
                  </div>
                  <p className="text-[#6B5A8E] text-sm leading-relaxed">{pw.recap}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bring The Plug AI To Your Community */}
```

becomes just:

```tsx
      {/* Bring The Plug AI To Your Community */}
```

- [ ] **Step 6: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors (this is the step that will catch any leftover reference to `date`, `time`, `location`, `spotsRemaining`, `totalSpots`, `registrationUrl`, or `pastWorkshops`).

- [ ] **Step 7: Manual verification**

Run: `npm run dev`. Visit `/` and confirm the Featured Workshop section shows "Date not locked yet" with no fake countdown. Visit `/workshops` and confirm: 6 topic cards with no dates/venues/spot-counts, each "Notify Me When This Opens" button opens the modal, and there is no "Past Workshops" section on the page.

- [ ] **Step 8: Commit**

```bash
git add lib/data/workshops.ts lib/utils.ts components/WorkshopCard.tsx components/sections/FeaturedWorkshop.tsx app/workshops/page.tsx
git commit -m "Remove fabricated workshop dates/spots/past events, wire NotifyModal"
```

---

### Task 4: Community page — wire channels to `NotifyModal`, remove fake spotlights and stats

**Files:**
- Modify: `app/community/page.tsx`

**Interfaces:**
- Consumes: `NotifyModal` from Task 1.

- [ ] **Step 1: Update imports**

Replace:

```tsx
import {
  MessageCircle,
  Mail,
  Instagram,
  Star,
  ArrowRight,
  Trophy,
  Users,
  Zap,
  CheckCircle,
  Clock,
} from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import EmailCapture from '@/components/shared/EmailCapture'
import { submitToFormspree, FORMSPREE_CONTACT_ID } from '@/lib/formspree'
```

with:

```tsx
import {
  MessageCircle,
  Mail,
  Instagram,
  Star,
  ArrowRight,
  Trophy,
  Users,
  Zap,
  CheckCircle,
} from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import EmailCapture from '@/components/shared/EmailCapture'
import NotifyModal from '@/components/shared/NotifyModal'
import { submitToFormspree, FORMSPREE_CONTACT_ID } from '@/lib/formspree'
```

(`Clock` is dropped — it was only used in the disabled-channel fallback being removed in Step 3.)

- [ ] **Step 2: Update the `channels` array and delete `memberSpotlights`**

Replace:

```tsx
const channels = [
  {
    icon: MessageCircle,
    name: 'Discord Community',
    description:
      "Our free Discord server is where members ask questions, share wins, and help each other learn. Coming soon — join the waitlist and we'll ping you the moment it opens.",
    cta: 'Join Waitlist',
    href: null,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100 border-indigo-200',
    glow: 'hover:border-indigo-400',
    badge: 'Coming soon',
    badgeColor: 'bg-indigo-100 text-indigo-600 border-indigo-200',
  },
  {
    icon: Mail,
    name: 'Weekly Newsletter',
    description:
      'Every week: one AI tip you can use immediately, one free tool you might not know about, and one community win to keep you inspired. No fluff. Just plug.',
    cta: 'Subscribe Free',
    href: '#newsletter',
    color: 'text-green-600',
    bg: 'bg-green-100 border-green-200',
    glow: 'hover:border-green-600',
    badge: '1,200+ subscribers',
    badgeColor: 'bg-green-100 text-green-600 border-green-200',
  },
  {
    icon: Instagram,
    name: 'Instagram & TikTok',
    description:
      'Quick AI tips, workshop recaps, community spotlights, and real talk about technology and opportunity. Pages launching soon — follow along when we drop.',
    cta: 'Coming Soon',
    href: null,
    color: 'text-pink-600',
    bg: 'bg-pink-100 border-pink-200',
    glow: 'hover:border-pink-400',
    badge: 'Launching soon',
    badgeColor: 'bg-pink-100 text-pink-600 border-pink-200',
  },
]

const memberSpotlights = [
  {
    name: 'Tyrone B.',
    city: 'Chicago, IL',
    story:
      "Started with zero tech knowledge. Used The Plug AI community to learn ChatGPT basics, then used it to prep for job interviews. Got hired as a customer service lead — first job with benefits in 4 years.",
    win: 'New Job with Benefits',
    emoji: '💼',
  },
  {
    name: 'Sister Gloria',
    city: 'Memphis, TN',
    story:
      "75 years old. Joined the community after a seniors workshop. Now she uses AI to write birthday cards, understand her Medicare statement, and find recipes. Says it's the best thing since sliced bread.",
    win: 'Daily Life Revolution',
    emoji: '✨',
  },
  {
    name: 'Keisha M.',
    city: 'Atlanta, GA',
    story:
      "Single mom running a daycare. Uses Canva AI to make her flyers, ChatGPT to write parent communication, and Notion AI to track her schedule. Saves 10+ hours a week. That's 10 hours back with her kids.",
    win: '10 Hours/Week Saved',
    emoji: '👨‍👩‍👧',
  },
]
```

with:

```tsx
const channels = [
  {
    icon: MessageCircle,
    name: 'Discord Community',
    description:
      "Our free Discord server is where members ask questions, share wins, and help each other learn. Coming soon — get notified the moment it opens.",
    cta: 'Notify Me',
    href: null,
    notifySource: 'discord',
    color: 'text-indigo-600',
    bg: 'bg-indigo-100 border-indigo-200',
    glow: 'hover:border-indigo-400',
    badge: 'Coming soon',
    badgeColor: 'bg-indigo-100 text-indigo-600 border-indigo-200',
  },
  {
    icon: Mail,
    name: 'Weekly Newsletter',
    description:
      'Every week: one AI tip you can use immediately, one free tool you might not know about, and one community win to keep you inspired. No fluff. Just plug.',
    cta: 'Subscribe Free',
    href: '#newsletter',
    notifySource: null,
    color: 'text-green-600',
    bg: 'bg-green-100 border-green-200',
    glow: 'hover:border-green-600',
    badge: 'Free',
    badgeColor: 'bg-green-100 text-green-600 border-green-200',
  },
  {
    icon: Instagram,
    name: 'Instagram & TikTok',
    description:
      'Quick AI tips, workshop recaps, community spotlights, and real talk about technology and opportunity. Pages launching soon — get notified when we drop.',
    cta: 'Notify Me',
    href: null,
    notifySource: 'social-ig-tiktok',
    color: 'text-pink-600',
    bg: 'bg-pink-100 border-pink-200',
    glow: 'hover:border-pink-400',
    badge: 'Launching soon',
    badgeColor: 'bg-pink-100 text-pink-600 border-pink-200',
  },
]
```

- [ ] **Step 3: Update the channel card render to use `NotifyModal`**

Replace:

```tsx
                  {channel.href ? (
                    <motion.a
                      href={channel.href}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-5 rounded-xl text-sm transition-colors duration-200"
                    >
                      {channel.cta}
                      <ArrowRight size={16} />
                    </motion.a>
                  ) : (
                    <div className="mt-auto inline-flex items-center justify-center gap-2 bg-[#EDE9FE] text-[#6B5A8E] font-bold py-3 px-5 rounded-xl text-sm cursor-not-allowed">
                      <Clock size={14} />
                      {channel.cta}
                    </div>
                  )}
```

with:

```tsx
                  {channel.href ? (
                    <motion.a
                      href={channel.href}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-5 rounded-xl text-sm transition-colors duration-200"
                    >
                      {channel.cta}
                      <ArrowRight size={16} />
                    </motion.a>
                  ) : (
                    <NotifyModal
                      source={channel.notifySource as string}
                      title={`Get notified: ${channel.name}`}
                      description="We're not live there yet — leave your email and we'll ping you the moment we are."
                      trigger={(open) => (
                        <motion.button
                          type="button"
                          onClick={open}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-5 rounded-xl text-sm transition-colors duration-200"
                        >
                          {channel.cta}
                          <ArrowRight size={16} />
                        </motion.button>
                      )}
                    />
                  )}
```

- [ ] **Step 4: Replace the Community Spotlights section**

Replace:

```tsx
      {/* Community Spotlights */}
      <section className="py-20 px-4 md:px-8 bg-[#F5F3FF] border-y border-[#EDE9FE]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Community Spotlight"
            title={
              <>
                Members Who{' '}
                <span className="text-gradient">Went Up</span>
              </>
            }
            subtitle="Real community members, real results. This is what happens when you stop waiting for the world to include you."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {memberSpotlights.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white border border-[#EDE9FE] rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center font-heading font-bold text-white text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A0533] text-sm">{member.name}</p>
                    <p className="text-[#6B5A8E] text-xs">{member.city}</p>
                  </div>
                </div>
                <p className="text-[#6B5A8E] text-sm leading-relaxed italic">&ldquo;{member.story}&rdquo;</p>
                <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-3 py-1.5 text-green-600 text-xs font-semibold">
                  <span>{member.emoji}</span>
                  {member.win}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
```

with:

```tsx
      {/* Community Spotlights */}
      <section className="py-20 px-4 md:px-8 bg-[#F5F3FF] border-y border-[#EDE9FE]">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Community Spotlight"
            title={
              <>
                Your Story Could Be{' '}
                <span className="text-gradient">Next</span>
              </>
            }
            subtitle="We're just getting started — spotlights go here once real members have real wins to share. Yours could be the first."
            className="mb-10"
          />
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-6 rounded-xl text-sm transition-colors duration-200"
          >
            Share Your Win
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
```

- [ ] **Step 5: Fix the hero stat row**

Replace:

```tsx
            <div className="flex items-center gap-2">
              <Users size={15} className="text-green-600" />
              500+ active members
            </div>
```

with:

```tsx
            <div className="flex items-center gap-2">
              <Users size={15} className="text-green-600" />
              Open to everyone
            </div>
```

- [ ] **Step 6: Verify it builds**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 7: Manual verification**

Run: `npm run dev`, visit `/community`. Confirm: Discord and Instagram/TikTok cards open `NotifyModal` on click; Newsletter card still scrolls to `#newsletter`; no member spotlight names appear; the hero stat row reads "Open to everyone" not a member count.

- [ ] **Step 8: Commit**

```bash
git add app/community/page.tsx
git commit -m "Wire community channels to NotifyModal, remove fabricated spotlights/stats"
```

---

### Task 5: Resources page — replace fake video cards with `NotifyModal`

**Files:**
- Modify: `app/resources/page.tsx`

**Interfaces:**
- Consumes: `NotifyModal` from Task 1.

- [ ] **Step 1: Update imports and delete `videoPlaceholders`**

Replace:

```tsx
import SectionHeader from '@/components/SectionHeader'
import ResourceCard from '@/components/ResourceCard'
import ToolCard from '@/components/ToolCard'
import EmailCapture from '@/components/shared/EmailCapture'
import { resources } from '@/lib/data/resources'
import { tools } from '@/lib/data/tools'
import { Play, BookOpen } from 'lucide-react'

const videoPlaceholders = [
  {
    id: 'v1',
    title: 'ChatGPT From Zero: Your First 20 Minutes',
    duration: '18 min',
    views: '12K views',
  },
  {
    id: 'v2',
    title: 'How to Write a Resume Using AI (Full Walkthrough)',
    duration: '24 min',
    views: '8K views',
  },
  {
    id: 'v3',
    title: 'Canva AI Tutorial: Make a Flyer in 10 Minutes',
    duration: '11 min',
    views: '6K views',
  },
]
```

with:

```tsx
import SectionHeader from '@/components/SectionHeader'
import ResourceCard from '@/components/ResourceCard'
import ToolCard from '@/components/ToolCard'
import EmailCapture from '@/components/shared/EmailCapture'
import NotifyModal from '@/components/shared/NotifyModal'
import { resources } from '@/lib/data/resources'
import { tools } from '@/lib/data/tools'
import { Play } from 'lucide-react'
```

- [ ] **Step 2: Replace the Video Library section**

Replace:

```tsx
      {/* Video Library */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Video Library"
            title={
              <>
                Watch & Learn
              </>
            }
            subtitle="Short, practical video tutorials. No 3-hour courses. Just the stuff you can actually use."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {videoPlaceholders.map((video, i) => (
              <div
                key={video.id}
                className="bg-white border border-[#EDE9FE] rounded-2xl overflow-hidden group cursor-pointer hover:border-purple-700 transition-colors duration-300"
              >
                {/* Thumbnail placeholder */}
                <div className="relative h-44 bg-[#F0EEFF] flex items-center justify-center group-hover:bg-[#EDE9FE] transition-colors">
                  <div className="w-14 h-14 rounded-full bg-black/60 border border-[#D8D0F7] flex items-center justify-center group-hover:bg-purple-700/80 transition-colors duration-300">
                    <Play size={22} className="text-white ml-1" fill="white" />
                  </div>
                  <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-lg">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-[#1A0533] text-sm leading-snug mb-2 group-hover:text-purple-700 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[#6B5A8E] text-xs">{video.views}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 border border-[#EDE9FE] text-[#9385B5] px-6 py-3 rounded-xl text-sm font-medium cursor-not-allowed">
              <BookOpen size={16} />
              Full Video Library — Coming Soon on YouTube
            </div>
          </div>
        </div>
      </section>
```

with:

```tsx
      {/* Video Library */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            eyebrow="Video Library"
            title={
              <>
                Watch & Learn
              </>
            }
            subtitle="Short, practical video tutorials are in the works. No 3-hour courses. Just the stuff you can actually use."
            className="mb-10"
          />
          <NotifyModal
            source="video-library"
            title="Get notified when videos launch"
            description="We're building out the video library now — leave your email and we'll tell you the moment the first one is live."
            trigger={(open) => (
              <button
                type="button"
                onClick={open}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl text-sm transition-colors duration-200"
              >
                <Play size={16} />
                Notify Me When Videos Launch
              </button>
            )}
          />
        </div>
      </section>
```

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, visit `/resources`, scroll to Video Library. Confirm no fake video cards remain and the "Notify Me When Videos Launch" button opens the modal.

- [ ] **Step 5: Commit**

```bash
git add app/resources/page.tsx
git commit -m "Replace fake video library cards with NotifyModal CTA"
```

---

### Task 6: De-fabricate the Hero section

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Rewrite the file, removing the activity ticker and fake stat badge**

Replace the entire file with:

```tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Users, Zap, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Light gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #FAFAFA 55%, #F0FFF4 100%)' }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-70" />

      {/* Purple blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-purple-300/20 blur-[120px] pointer-events-none" />
      {/* Green blob */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-green-300/15 blur-[100px] pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center py-20">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-2 text-green-700 text-sm font-semibold mb-8"
        >
          <Users size={14} className="flex-shrink-0" />
          <span>Free workshops. Real AI skills.</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-6"
        >
          <span className="text-[#1A0533]">AI Is For </span>
          <span className="text-gradient">You.</span>
          <br />
          <span className="text-[#1A0533]">Not Just</span>{' '}
          <span className="text-[#9385B5] line-through decoration-red-400 decoration-4">Them.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-[#6B5A8E] text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          The Plug AI teaches real people in real communities how to use AI tools —
          for <span className="text-[#1A0533] font-semibold">free jobs</span>,{' '}
          <span className="text-[#1A0533] font-semibold">better pay</span>, and{' '}
          <span className="text-[#1A0533] font-semibold">bigger futures</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="/learn"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-2xl text-lg transition-colors duration-200 shadow-lg shadow-green-500/30 glow-green"
          >
            <Zap size={20} className="fill-black" />
            Get Started Free
            <ArrowRight size={20} />
          </motion.a>
          <motion.a
            href="/community"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 border-2 border-[#D8D0F7] hover:border-purple-500 text-[#1A0533] font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-200 hover:bg-purple-50 bg-white shadow-card"
          >
            <Play size={18} className="fill-purple-600 text-purple-600" />
            Join the Community
          </motion.a>
        </motion.div>

        {/* Social proof mini */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-[#6B5A8E]"
        >
          <span>100% Free to start</span>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#D8D0F7]" />
          <span>No experience needed</span>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#D8D0F7]" />
          <span>Beginner-friendly</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#9385B5] text-xs"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-[#D8D0F7] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#C4B5FD]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

(Removed: `AnimatePresence` import, `useState`/`useEffect` import, `activityFeed` array, `ActivityTicker` function, its usage block, and the 5-avatar "Join 500+ people" row which restated the same fabricated count. `Link` import was already unused in the original file — left as a pre-existing issue, out of scope. Actually: check first — see Step 2.)

- [ ] **Step 2: Confirm the `Link` import is actually needed**

Run: `grep -n "Link" components/sections/Hero.tsx`
If `Link` (from `next/link`) has no JSX usage (the CTAs use plain `motion.a`, not `next/link`'s `Link`), remove the `import Link from 'next/link'` line from the rewritten file too — it was unused before this change as well, but since the whole file is being rewritten in this task, leave it out rather than reintroduce a pre-existing lint warning.

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no unused-import errors.

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, visit `/`. Confirm no rotating "Live" activity ticker appears above the headline, and the badge reads "Free workshops. Real AI skills." instead of a member count.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "Remove fabricated activity ticker and member count from Hero"
```

---

### Task 7: De-fabricate SocialProof stats

**Files:**
- Modify: `components/sections/SocialProof.tsx`

- [ ] **Step 1: Rewrite the file**

Replace the entire file with:

```tsx
'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Sparkles, Heart, Users } from 'lucide-react'

const trustedBy = [
  'Community Organizations', 'Faith Communities', 'Workforce Programs', 'Public Libraries',
  'Youth Centers', 'Senior Services', 'Nonprofits', 'Workforce Centers',
  'Community Colleges', 'Social Services', 'Job Training Programs', 'After-School Programs',
]

const trustBadges = [
  { icon: CheckCircle, label: '100% Free to Start' },
  { icon: Sparkles, label: 'No Experience Needed' },
  { icon: Heart, label: 'Beginner-Friendly' },
  { icon: Users, label: 'Community-Powered' },
]

export default function SocialProof() {
  return (
    <section className="py-16 border-y border-[#EDE9FE] bg-[#F5F3FF] relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[200px] bg-purple-200/30 blur-[60px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[#9385B5] text-sm font-medium tracking-wide uppercase mb-6 px-4"
        >
          Trusted by community orgs, churches, and workforce programs
        </motion.p>

        {/* Scrolling marquee */}
        <div className="overflow-hidden mb-12 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex gap-3 animate-marquee w-max">
            {[...trustedBy, ...trustedBy].map((org, i) => (
              <span
                key={i}
                className="flex-shrink-0 px-4 py-2 rounded-full border border-[#EDE9FE] text-[#6B5A8E] text-sm bg-white whitespace-nowrap shadow-card"
              >
                {org}
              </span>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-4 px-4"
        >
          {trustBadges.map(({ icon: Icon, label }, i) => (
            <div key={label} className="relative flex items-center justify-center gap-2">
              <Icon size={18} className="text-green-600 flex-shrink-0" />
              <span className="font-heading font-semibold text-sm md:text-base text-[#1A0533] text-center">
                {label}
              </span>
              {i < trustBadges.length - 1 && (
                <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 w-px h-8 bg-[#EDE9FE]" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

(Drops the `StatCounter` import and component — `StatCounter` itself, `components/StatCounter.tsx`, stays in the codebase since it's a generic reusable component, not fabricated content; it's just no longer used here. Do not delete `StatCounter.tsx`.)

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Manual verification**

Run: `npm run dev`, visit `/`, scroll to the trust bar below the hero. Confirm it shows 4 non-numeric badges (100% Free to Start / No Experience Needed / Beginner-Friendly / Community-Powered) instead of animated counters.

- [ ] **Step 4: Commit**

```bash
git add components/sections/SocialProof.tsx
git commit -m "Replace fabricated stat counters with honest trust badges"
```

---

### Task 8: Replace fabricated testimonials with an outcomes section

**Files:**
- Modify: `components/sections/TestimonialsSection.tsx`
- Delete: `components/TestimonialCard.tsx`

**Interfaces:**
- `TestimonialsSection` keeps its existing default export name and no-props signature — `app/page.tsx` imports it unchanged.

- [ ] **Step 1: Rewrite `components/sections/TestimonialsSection.tsx`**

Replace the entire file with:

```tsx
'use client'

import { motion } from 'framer-motion'
import { FileText, Sparkles, Clock3, Users } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'

const outcomes = [
  {
    icon: FileText,
    title: 'A stronger resume',
    description: "Rewrite your resume with AI in one sitting — ready to send, not just ready to start.",
  },
  {
    icon: Sparkles,
    title: 'A working AI toolkit',
    description: 'Leave with real accounts set up — ChatGPT, Canva AI, and more — and the confidence to use them.',
  },
  {
    icon: Clock3,
    title: 'Time back in your week',
    description: 'Automate the busywork — social posts, emails, scheduling — so you spend less time on tasks AI can already do.',
  },
  {
    icon: Users,
    title: "A community that's in it with you",
    description: "You're not figuring this out alone. Ask questions, share wins, help each other level up.",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#F5F3FF] relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[400px] bg-purple-200/20 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="What You'll Walk Away With"
          title={<>Real Skills, <span className="text-gradient">Real Fast</span></>}
          subtitle="Every workshop is built around one goal: you leave having actually done something, not just watched a slideshow."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((outcome, i) => {
            const Icon = outcome.icon
            return (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="bg-white border border-[#EDE9FE] rounded-2xl p-6 flex flex-col gap-4 shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center">
                  <Icon size={20} className="text-purple-600" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#1A0533]">{outcome.title}</h3>
                <p className="text-[#6B5A8E] text-sm leading-relaxed">{outcome.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Delete the now-unused `TestimonialCard` component**

Run: `grep -rln "TestimonialCard" app components` and confirm the only remaining match is the file itself (`components/TestimonialCard.tsx`) — the `TestimonialsSection.tsx` reference was just removed in Step 1.

Delete the file:

```bash
rm components/TestimonialCard.tsx
```

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no dangling import errors.

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, visit `/`, scroll to where testimonials used to be. Confirm 4 outcome cards render with no attributed names/quotes/star ratings.

- [ ] **Step 5: Commit**

```bash
git add components/sections/TestimonialsSection.tsx
git rm components/TestimonialCard.tsx
git commit -m "Replace fabricated testimonials with honest outcomes section"
```

---

### Task 9: De-fabricate the About page

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Update imports**

Replace:

```tsx
import { Quote, Target, Eye, Zap, Users, ArrowRight, CheckCircle, TrendingUp, MapPin, Star } from 'lucide-react'
```

with:

```tsx
import { Quote, Target, Eye, Zap, Users, ArrowRight, CheckCircle, Star } from 'lucide-react'
```

(`TrendingUp` and `MapPin` were only used in the `achievements` grid being simplified in Step 3.)

- [ ] **Step 2: Reword the 2026 milestone and delete the `achievements` array**

Replace:

```tsx
const milestones = [
  {
    year: '2024',
    title: 'The Idea',
    description:
      "Stefan sits in a workforce development training and realizes: nobody's teaching AI to the people who need it most. The communities. The overlooked ones. He decides to change that.",
  },
  {
    year: 'Early 2025',
    title: 'First Workshop',
    description:
      'First community workshop. 12 people show up. 11 leave with a working ChatGPT account and a rewritten resume draft. One attendee gets a job interview 6 days later.',
  },
  {
    year: 'Mid 2025',
    title: 'Growing the Community',
    description:
      'Newsletter launches. Discord community opens. Churches and nonprofits start reaching out asking for workshops. The Plug AI starts traveling.',
  },
  {
    year: '2026',
    title: 'Scaling Up',
    description:
      "500+ people trained, 12+ workshops across 6 cities, partnerships with workforce centers and faith communities. Online lessons launch to reach people we can't reach in person — yet.",
  },
]

const achievements = [
  { icon: Users, value: '500+', label: 'People Trained', color: 'text-green-600', bg: 'bg-green-100 border-green-200' },
  { icon: MapPin, value: '6', label: 'Cities Reached', color: 'text-purple-600', bg: 'bg-purple-100 border-purple-200' },
  { icon: TrendingUp, value: '12+', label: 'Live Workshops', color: 'text-blue-600', bg: 'bg-blue-100 border-blue-200' },
  { icon: Star, value: '100%', label: 'Free to Attend', color: 'text-amber-600', bg: 'bg-amber-100 border-amber-200' },
]
```

with:

```tsx
const milestones = [
  {
    year: '2024',
    title: 'The Idea',
    description:
      "Stefan sits in a workforce development training and realizes: nobody's teaching AI to the people who need it most. The communities. The overlooked ones. He decides to change that.",
  },
  {
    year: 'Early 2025',
    title: 'First Workshop',
    description:
      'First community workshop. 12 people show up. 11 leave with a working ChatGPT account and a rewritten resume draft. One attendee gets a job interview 6 days later.',
  },
  {
    year: 'Mid 2025',
    title: 'Growing the Community',
    description:
      'Newsletter launches. Discord community opens. Churches and nonprofits start reaching out asking for workshops. The Plug AI starts traveling.',
  },
  {
    year: '2026',
    title: 'Scaling Up',
    description:
      "The Plug AI starts reaching more cities and more communities — partnerships with workforce centers and faith communities take root. Online lessons launch to reach people we can't reach in person — yet.",
  },
]
```

**Note for the punch-list:** the `Early 2025` and `2026` milestones above still contain specific numeric claims ("12 people show up... one attendee gets a job interview 6 days later"). These describe Stefan's own founding story rather than a third-party quote, so this task leaves them in place rather than deleting his narrative — but Task 12's punch-list must flag them for him to confirm or correct.

- [ ] **Step 3: Replace the achievement grid with a single honest badge**

Replace:

```tsx
                {/* Achievement grid */}
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((a) => {
                    const Icon = a.icon
                    return (
                      <div key={a.label} className={`rounded-xl border p-3 flex items-center gap-3 ${a.bg}`}>
                        <Icon size={16} className={a.color} />
                        <div>
                          <p className={`font-heading font-bold text-base ${a.color}`}>{a.value}</p>
                          <p className="text-[#6B5A8E] text-xs">{a.label}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
```

with:

```tsx
                {/* Achievement badge */}
                <div className="inline-flex items-center gap-2 rounded-xl border bg-amber-100 border-amber-200 px-4 py-3 w-fit">
                  <Star size={16} className="text-amber-600" />
                  <p className="font-heading font-bold text-sm text-amber-600">100% Free to Attend</p>
                </div>
```

- [ ] **Step 4: Verify it builds**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Manual verification**

Run: `npm run dev`, visit `/about`. Confirm the founder card shows one "100% Free to Attend" badge instead of a 4-item stat grid, and the 2026 timeline entry no longer states "500+ people trained, 12+ workshops across 6 cities."

- [ ] **Step 6: Commit**

```bash
git add app/about/page.tsx
git commit -m "Remove fabricated stats from About page achievements and timeline"
```

---

### Task 10: Remove dead `logoUrl` field from tool data

**Files:**
- Modify: `lib/data/tools.ts`

Note: `components/ToolCard.tsx` already renders a self-hosted colored-initial badge (`tool.name.charAt(0)` on `tool.color`) and never reads `tool.logoUrl` — confirmed via `grep -rn "logoUrl" app components lib`, which shows zero JSX/render usages. The `via.placeholder.com` URLs are dead data, not a rendering dependency. No component change needed — just delete the unused field.

- [ ] **Step 1: Remove `logoUrl` from the `Tool` interface and all 6 entries**

Replace:

```ts
export interface Tool {
  id: string
  name: string
  tagline: string
  description: string
  cost: CostTier
  difficulty: DifficultyLevel
  category: string
  learnSlug: string
  logoUrl: string
  color: string
  url: string
}
```

with:

```ts
export interface Tool {
  id: string
  name: string
  tagline: string
  description: string
  cost: CostTier
  difficulty: DifficultyLevel
  category: string
  learnSlug: string
  color: string
  url: string
}
```

Then remove each `logoUrl: 'https://via.placeholder.com/...'` line from the 6 entries in the `tools` array (one line per entry, e.g. `logoUrl: 'https://via.placeholder.com/60x60/10A37F/ffffff?text=GPT',` for ChatGPT — same pattern for Claude, Gemini, Canva AI, Perplexity, Notion AI).

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: build succeeds (confirms no other file reads `tool.logoUrl`).

- [ ] **Step 3: Commit**

```bash
git add lib/data/tools.ts
git commit -m "Remove dead via.placeholder.com logoUrl field from tool data"
```

---

### Task 11: Fix silent-success forms

**Files:**
- Modify: `components/shared/EmailCapture.tsx`
- Modify: `components/shared/Footer.tsx` (newsletter form — separate from Task 1's social icons)
- Modify: `app/workshops/page.tsx` (workshop request form)
- Modify: `app/contact/page.tsx` (contact form)
- Modify: `app/community/page.tsx` (ambassador form)

Every form below currently calls `submitToFormspree` and unconditionally sets `submitted = true`, ignoring the `{ ok: boolean }` result. This task makes each one check `ok` and show an inline error instead of a false success.

- [ ] **Step 1: Fix `components/shared/EmailCapture.tsx`**

Replace:

```tsx
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setLoading(true)
    await submitToFormspree(FORMSPREE_NEWSLETTER_ID, { email, _subject: 'New newsletter signup — The Plug AI' })
    setLoading(false)
    setSubmitted(true)
    setEmail('')
  }
```

with:

```tsx
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setLoading(true)
    setError(false)
    const result = await submitToFormspree(FORMSPREE_NEWSLETTER_ID, { email, _subject: 'New newsletter signup — The Plug AI' })
    setLoading(false)
    if (result.ok) {
      setSubmitted(true)
      setEmail('')
    } else {
      setError(true)
    }
  }
```

Then, in the `compact` branch, replace:

```tsx
  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-white border border-[#EDE9FE] rounded-xl px-4 py-3 text-sm text-[#1A0533] placeholder:text-[#9385B5] focus:outline-none focus:border-purple-400 transition-colors shadow-card"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold px-5 py-3 rounded-xl text-sm transition-colors duration-200 flex items-center gap-2 whitespace-nowrap" disabled={loading}
        >
          {buttonLabel}
          <ArrowRight size={16} />
        </button>
      </form>
    )
  }
```

with:

```tsx
  if (compact) {
    return (
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-white border border-[#EDE9FE] rounded-xl px-4 py-3 text-sm text-[#1A0533] placeholder:text-[#9385B5] focus:outline-none focus:border-purple-400 transition-colors shadow-card"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold px-5 py-3 rounded-xl text-sm transition-colors duration-200 flex items-center gap-2 whitespace-nowrap" disabled={loading}
          >
            {buttonLabel}
            <ArrowRight size={16} />
          </button>
        </form>
        {error && (
          <p className="text-red-600 text-xs mt-2">
            Something went wrong. Email us directly at{' '}
            <a href="mailto:hello@theplugai.net" className="underline">hello@theplugai.net</a>.
          </p>
        )}
      </div>
    )
  }
```

Finally, in the full (non-compact) form, replace:

```tsx
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold px-6 py-3.5 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {loading ? 'Sending…' : buttonLabel}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
      <p className="relative z-10 text-[#9385B5] text-xs mt-4 text-center md:text-right">
        No spam. No games. Unsubscribe anytime.
      </p>
    </motion.section>
```

with:

```tsx
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold px-6 py-3.5 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {loading ? 'Sending…' : buttonLabel}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
      {error && (
        <p className="relative z-10 text-red-600 text-xs mt-3 text-center md:text-right">
          Something went wrong. Email us directly at{' '}
          <a href="mailto:hello@theplugai.net" className="underline">hello@theplugai.net</a>.
        </p>
      )}
      <p className="relative z-10 text-[#9385B5] text-xs mt-4 text-center md:text-right">
        No spam. No games. Unsubscribe anytime.
      </p>
    </motion.section>
```

- [ ] **Step 2: Fix the newsletter form in `components/shared/Footer.tsx`**

Replace:

```tsx
export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await submitToFormspree(FORMSPREE_NEWSLETTER_ID, { email, _subject: 'New newsletter signup — The Plug AI' })
    setLoading(false)
    setSubmitted(true)
    setEmail('')
  }
```

with:

```tsx
export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(false)
    const result = await submitToFormspree(FORMSPREE_NEWSLETTER_ID, { email, _subject: 'New newsletter signup — The Plug AI' })
    setLoading(false)
    if (result.ok) {
      setSubmitted(true)
      setEmail('')
    } else {
      setError(true)
    }
  }
```

Replace:

```tsx
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
              >
                <p className="text-green-700 font-semibold text-sm">You&apos;re plugged in! 🔌</p>
                <p className="text-green-600 text-xs mt-1">Check your inbox for a welcome email.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white border border-[#EDE9FE] rounded-xl px-4 py-2.5 text-sm text-[#1A0533] placeholder:text-[#9385B5] focus:outline-none focus:border-purple-400 transition-colors shadow-card"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-2.5 rounded-xl text-sm transition-colors duration-200"
                >
                  {loading ? 'Sending…' : 'Plug Me In'}
                </button>
              </form>
            )}
```

with:

```tsx
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
              >
                <p className="text-green-700 font-semibold text-sm">You&apos;re plugged in! 🔌</p>
                <p className="text-green-600 text-xs mt-1">Check your inbox for a welcome email.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white border border-[#EDE9FE] rounded-xl px-4 py-2.5 text-sm text-[#1A0533] placeholder:text-[#9385B5] focus:outline-none focus:border-purple-400 transition-colors shadow-card"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-2.5 rounded-xl text-sm transition-colors duration-200"
                >
                  {loading ? 'Sending…' : 'Plug Me In'}
                </button>
                {error && (
                  <p className="text-red-600 text-xs">
                    Something went wrong. Email us at{' '}
                    <a href="mailto:hello@theplugai.net" className="underline">hello@theplugai.net</a>.
                  </p>
                )}
              </form>
            )}
```

- [ ] **Step 3: Fix the workshop request form in `app/workshops/page.tsx`**

Replace:

```tsx
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await submitToFormspree(FORMSPREE_CONTACT_ID, {
      name, org, eventType, attendance, datePref,
      email: contactEmail,
      message,
      _subject: `Workshop Request: ${org} — The Plug AI`,
    })
    setLoading(false)
    setSubmitted(true)
  }
```

with:

```tsx
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const result = await submitToFormspree(FORMSPREE_CONTACT_ID, {
      name, org, eventType, attendance, datePref,
      email: contactEmail,
      message,
      _subject: `Workshop Request: ${org} — The Plug AI`,
    })
    setLoading(false)
    if (result.ok) {
      setSubmitted(true)
    } else {
      setError(true)
    }
  }
```

Replace the submit button block:

```tsx
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-base transition-colors duration-200"
                  >
                    {loading ? 'Sending…' : 'Request a Workshop'}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                  <p className="text-center text-[#9385B5] text-xs">
                    We respond within 48 hours. All workshops are free.
                  </p>
```

with:

```tsx
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-base transition-colors duration-200"
                  >
                    {loading ? 'Sending…' : 'Request a Workshop'}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                  {error && (
                    <p className="text-center text-red-600 text-xs">
                      Something went wrong. Email us directly at{' '}
                      <a href="mailto:hello@theplugai.net" className="underline">hello@theplugai.net</a>.
                    </p>
                  )}
                  <p className="text-center text-[#9385B5] text-xs">
                    We respond within 48 hours. All workshops are free.
                  </p>
```

- [ ] **Step 4: Fix the contact form in `app/contact/page.tsx`**

Replace:

```tsx
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await submitToFormspree(FORMSPREE_CONTACT_ID, {
      name, email, subject,
      message: messageText,
      _subject: `Contact: ${subject} — The Plug AI`,
    })
    setLoading(false)
    setSubmitted(true)
  }
```

with:

```tsx
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const result = await submitToFormspree(FORMSPREE_CONTACT_ID, {
      name, email, subject,
      message: messageText,
      _subject: `Contact: ${subject} — The Plug AI`,
    })
    setLoading(false)
    if (result.ok) {
      setSubmitted(true)
    } else {
      setError(true)
    }
  }
```

Replace the submit button block:

```tsx
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-base transition-colors duration-200"
                  >
                    {loading ? 'Sending…' : 'Send Message'}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                </form>
```

with:

```tsx
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-base transition-colors duration-200"
                  >
                    {loading ? 'Sending…' : 'Send Message'}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                  {error && (
                    <p className="text-center text-red-600 text-xs">
                      Something went wrong. Email us directly at{' '}
                      <a href="mailto:hello@theplugai.net" className="underline">hello@theplugai.net</a>.
                    </p>
                  )}
                </form>
```

- [ ] **Step 5: Fix the ambassador form in `app/community/page.tsx`**

Replace:

```tsx
export default function CommunityPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAmbassador = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await submitToFormspree(FORMSPREE_CONTACT_ID, {
      email,
      _subject: `Ambassador Application — The Plug AI`,
    })
    setLoading(false)
    setSubmitted(true)
  }
```

with:

```tsx
export default function CommunityPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleAmbassador = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const result = await submitToFormspree(FORMSPREE_CONTACT_ID, {
      email,
      _subject: `Ambassador Application — The Plug AI`,
    })
    setLoading(false)
    if (result.ok) {
      setSubmitted(true)
    } else {
      setError(true)
    }
  }
```

Replace the submit button block:

```tsx
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-3.5 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending…' : 'Apply Now'}
                    <ArrowRight size={16} />
                  </button>
                </form>
```

with:

```tsx
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-3.5 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending…' : 'Apply Now'}
                    <ArrowRight size={16} />
                  </button>
                  {error && (
                    <p className="text-red-600 text-xs text-center">
                      Something went wrong. Email us directly at{' '}
                      <a href="mailto:hello@theplugai.net" className="underline">hello@theplugai.net</a>.
                    </p>
                  )}
                </form>
```

- [ ] **Step 6: Verify it builds**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 7: Manual verification**

Run: `npm run dev` with `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` and `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID` unset (their current real state). Submit each of the 5 forms (homepage/about compact email capture, footer newsletter, workshop request, contact form, ambassador application) and confirm every one shows the red error message instead of a false success state.

- [ ] **Step 8: Commit**

```bash
git add components/shared/EmailCapture.tsx components/shared/Footer.tsx app/workshops/page.tsx app/contact/page.tsx app/community/page.tsx
git commit -m "Make all forms report real Formspree success/failure instead of always succeeding"
```

---

### Task 12: Final sweep and punch-list

**Files:**
- Modify: `tasks/content-checklist.md`

- [ ] **Step 1: Grep sweep for anything missed**

Run each of these and confirm the output matches what's expected:

```bash
grep -rn "via.placeholder.com" app components lib
```
Expected: no matches.

```bash
grep -rn "href: null\|href='#'\|href=\"#\"" app components lib --include="*.tsx" --include="*.ts"
```
Expected: no matches (the two legitimate same-page anchors, `#newsletter` and `#request`, use real hash fragments, not `null` or bare `#`).

```bash
grep -rln "ActivityTicker\|activityFeed\|memberSpotlights\|videoPlaceholders\|pastWorkshops" app components lib
```
Expected: no matches.

If any of these greps return a hit, go back and finish the corresponding task before proceeding — this step exists to catch anything a prior task's rewrite missed.

- [ ] **Step 2: Full production build**

Run: `npm run build`
Expected: build succeeds with zero TypeScript errors.

- [ ] **Step 3: Replace `tasks/content-checklist.md`**

Replace the entire file with:

```markdown
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
```

- [ ] **Step 4: Commit**

```bash
git add tasks/content-checklist.md
git commit -m "Replace content checklist with final punch-list of real-world facts needed"
```

---

## Self-Review Notes

- **Spec coverage:** Every row of the spec's "De-fabrication sweep" table maps to a task (Hero→6, SocialProof→7, Testimonials→8, community spotlights/stats→4, about→9, workshops upcoming/past→3, resources video→5). The `NotifyModal` call-site table maps to Tasks 1–5. Form error handling maps to Task 11. Tool logos map to Task 10 (simplified after discovering `logoUrl` was already dead/unrendered — verified via grep before writing the task, noted inline). Final punch-list maps to Task 12.
- **Placeholder scan:** no TBD/TODO; every step has complete code, not a description of code.
- **Type consistency:** `Workshop` interface defined in Task 3 Step 1 is consumed identically in Task 3 Steps 3–4 (`WorkshopCard`, `FeaturedWorkshop`) — same field names (`id`, `title`, `format`, `description`, `topics`), no drift. `NotifyModalProps` defined in Task 1 is consumed with the same three required props (`trigger`, `title`, `source`) plus optional `description` in every later task that uses it (Tasks 1, 2, 3, 4, 5).
