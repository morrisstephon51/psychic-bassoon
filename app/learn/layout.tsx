import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learn AI — Free Lessons, No Experience Needed',
  description:
    'Every lesson is written in plain English — no jargon, no prerequisites. Pick a topic that matters to your life and start learning AI for free.',
  alternates: { canonical: '/learn' },
  openGraph: {
    title: 'Learn AI — Free Lessons | The Plug AI',
    description:
      'Free, plain-English AI lessons for real life. No experience needed — pick a topic and start.',
    type: 'website',
    url: '/learn',
    siteName: 'The Plug AI',
  },
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children
}
