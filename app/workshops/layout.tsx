import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live AI Workshops',
  description:
    "In-person and virtual AI workshops where you'll walk away with real skills, real accounts set up, and real next steps — in 2 hours or less.",
  alternates: { canonical: '/workshops' },
  openGraph: {
    title: 'Live AI Workshops | The Plug AI',
    description:
      'Hands-on AI workshops for churches, schools, and community groups. Six ready-to-run tracks — leave with working accounts and real skills.',
    type: 'website',
    url: '/workshops',
    siteName: 'The Plug AI',
  },
}

export default function WorkshopsLayout({ children }: { children: React.ReactNode }) {
  return children
}
