import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community',
  description:
    'Learning is better together. Join The Plug AI community — the newsletter is live today, with Discord and social channels opening as we grow. Early members become founders.',
  alternates: { canonical: '/community' },
  openGraph: {
    title: 'Community | The Plug AI',
    description:
      'Join a community learning AI together. Newsletter subscribers get the first invites as new channels open.',
    type: 'website',
    url: '/community',
    siteName: 'The Plug AI',
  },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children
}
