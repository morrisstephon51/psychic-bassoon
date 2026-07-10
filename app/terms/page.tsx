import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — The Plug AI',
  description: 'The terms for using The Plug AI website, lessons, and resources.',
}

const sections = [
  {
    heading: 'What This Site Is',
    body: 'The Plug AI provides free AI education — lessons, downloadable guides, and community workshops. Everything on this site is free to read, download, and share for personal, educational, and community use.',
  },
  {
    heading: 'Educational Content, Not Professional Advice',
    body: 'Our lessons touch on jobs, money, health, and technology. They are educational starting points, not professional advice. For medical, legal, or financial decisions, consult a qualified professional. When our lessons discuss AI tools, remember that AI can be confidently wrong — always verify important information.',
  },
  {
    heading: 'Third-Party Tools',
    body: 'We teach and recommend tools built by other companies (ChatGPT, Canva, Perplexity, and others). We are not affiliated with them, we do not control them, and their own terms and privacy policies apply when you use them. Free tiers and features can change at any time — that is up to those companies, not us.',
  },
  {
    heading: 'Sharing Our Materials',
    body: 'Our downloadable guides are meant to be shared — print them, hand them out at your church or community center, use them in your programs. What we ask: do not sell them, and do not strip out the attribution.',
  },
  {
    heading: 'Workshops',
    body: 'Workshops are free to attend. Registering for a workshop or joining a waitlist means we will contact you about that event. Schedules can change; if a session is rescheduled or cancelled, registered attendees are notified by email.',
  },
  {
    heading: 'Changes to These Terms',
    body: 'If these terms change in any meaningful way, we will update this page and note the date below. Continued use of the site after changes means you accept the updated terms.',
  },
]

export default function TermsPage() {
  return (
    <div className="pt-24">
      <section className="py-16 px-4 md:px-8 bg-[#F5F3FF] border-b border-[#EDE9FE]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#1A0533] mb-4">Terms of Service</h1>
          <p className="text-[#6B5A8E]">Short, readable, and fair. Last updated July 2026.</p>
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
