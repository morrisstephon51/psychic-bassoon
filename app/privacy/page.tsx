import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — The Plug AI',
  description: 'How The Plug AI collects, uses, and protects your information.',
}

const sections = [
  {
    heading: 'What We Collect',
    body: "We collect only what you give us: your email address when you subscribe to the newsletter or join a waitlist, and the details you enter in our contact and workshop request forms (name, email, and your message). We don't run invasive trackers, and we don't buy data about you from anyone.",
  },
  {
    heading: 'How We Use It',
    body: 'Your email is used to send you the things you signed up for — lessons, guides, workshop announcements, and community updates. Contact and workshop request details are used to respond to you. That is the whole list.',
  },
  {
    heading: 'What We Never Do',
    body: 'We never sell your information. We never rent it. We never share it with advertisers. This project exists to serve the community, not to monetize it.',
  },
  {
    heading: 'Where Your Data Lives',
    body: 'Form submissions and email subscriptions are stored securely with Supabase, our database provider, and are only accessible to The Plug AI team. The website is hosted on Vercel.',
  },
  {
    heading: 'Unsubscribing & Deletion',
    body: 'Every email we send includes a way to unsubscribe. If you want your information deleted entirely — email address, form submissions, everything — contact us through the contact page and we will remove it.',
  },
  {
    heading: 'Questions',
    body: 'If anything here is unclear, or you want to know exactly what we have stored about you, reach out through the contact page. A real person reads every message.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="pt-24">
      <section className="py-16 px-4 md:px-8 bg-[#F5F3FF] border-b border-[#EDE9FE]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#1A0533] mb-4">Privacy Policy</h1>
          <p className="text-[#6B5A8E]">Plain English, like everything else we do. Last updated July 2026.</p>
        </div>
      </section>
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-heading font-bold text-xl text-[#1A0533] mb-3">{s.heading}</h2>
              <p className="text-[#6B5A8E] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
