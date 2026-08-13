import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "The Plug AI didn't start with venture capital or a tech pedigree. It started with a simple observation: the people who needed AI most were the ones nobody was teaching it to.",
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | The Plug AI',
    description:
      'Why The Plug AI exists — free AI education built for the communities the tech world forgot.',
    type: 'website',
    url: '/about',
    siteName: 'The Plug AI',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
