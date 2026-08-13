import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Have a question, want to partner, or need to bring a workshop to your community? Get in touch with The Plug AI — we respond within 48 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | The Plug AI',
    description:
      'Reach out to The Plug AI about workshops, partnerships, press, or general questions. We respond within 48 hours.',
    type: 'website',
    url: '/contact',
    siteName: 'The Plug AI',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
