import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'The Plug AI — Get Connected. Get Skilled. Get into AI.',
    template: '%s | The Plug AI',
  },
  description:
    'The Plug AI teaches real people in real communities how to use AI tools — for free jobs, better pay, and bigger futures. Founded by Stefan.',
  keywords: [
    'AI education',
    'community learning',
    'free AI training',
    'AI for beginners',
    'underserved communities',
    'AI tools',
    'The Plug AI',
  ],
  openGraph: {
    title: 'The Plug AI — AI Is For You. Not Just Them.',
    description:
      'Free AI education for communities that have been left behind. Workshops, lessons, and resources to help you get skilled and get ahead.',
    type: 'website',
    siteName: 'The Plug AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Plug AI',
    description: 'Get Connected. Get Skilled. Get into AI.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-[#0A0A0A] text-[#F5F5F5] antialiased overflow-x-hidden">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
