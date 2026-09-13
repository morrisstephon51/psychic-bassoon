import type { Metadata } from 'next'
import {
  CheckCircle,
  Clock,
  DollarSign,
  Mail,
  ExternalLink,
  Sparkles,
  Rocket,
} from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import StatCounter from '@/components/StatCounter'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Websites',
  description:
    'The Plug AI builds simple, fast websites for Chicago small businesses — barbers, salons, braiders, and more. Starter sites from $350, live in 5 days.',
  alternates: { canonical: '/websites' },
  openGraph: {
    title: 'The Plug AI — Websites',
    description:
      'Simple, fast websites for Chicago small businesses. Starter sites from $350, live in 5 days. Free preview before you pay anything.',
    type: 'website',
    url: '/websites',
    siteName: 'The Plug AI',
  },
}

const packages = [
  {
    name: 'Starter',
    price: '$350',
    cadence: 'one-time',
    tagline: 'One mobile-friendly page, live in 5 days.',
    features: [
      '1 mobile-friendly page',
      'Live in 5 days',
      '$175 deposit to start',
      'Balance due only after you approve the finished site',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Business',
    price: '$750',
    cadence: 'one-time',
    tagline: 'Up to 5 pages for a business that needs more room.',
    features: [
      'Up to 5 pages',
      'Everything in Starter',
      'Contact form + service pages',
      'Balance due only after you approve the finished site',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Care Plan',
    price: '$50',
    cadence: '/month',
    tagline: 'Optional add-on for hosting, edits, and peace of mind.',
    features: [
      'Hosting included',
      'Ongoing edits',
      'Monthly check-in',
      'Pairs with either package above',
    ],
    cta: 'Ask About Care Plan',
    highlighted: false,
  },
]

const steps = [
  {
    title: 'Free preview',
    description:
      "We build a free preview of your site using info that's already public — your business name, hours, services, and photos. No cost, no obligation.",
  },
  {
    title: '$175 deposit to start',
    description:
      'Like what you see? A $175 deposit gets the real build underway.',
  },
  {
    title: 'You approve the finished site',
    description:
      "We finish the build and send it over for your review. Nothing goes live until you're happy with it.",
  },
  {
    title: 'Balance paid, site goes live',
    description: 'Pay the remaining balance and your new site goes live.',
  },
]

const portfolio = [
  {
    name: 'Forming Paws',
    url: 'https://theplugai.xyz',
    description: 'A live app with member sign-in, chat, and an admin console.',
  },
  {
    name: 'The Plug AI',
    url: 'https://theplugai.info',
    description: 'This site — free AI education built and run by the same team.',
  },
]

export default function WebsitesPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 bg-[#F5F3FF] border-b border-[#EDE9FE] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/15 blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <SectionHeader
            eyebrow="The Plug AI — Websites"
            title={
              <>
                Simple, Fast Websites for{' '}
                <span className="text-gradient">Chicago Small Businesses</span>
              </>
            }
            subtitle="Barbers, salons, braiders, and other Chicago small businesses deserve a website that actually works — without the agency price tag or the months-long wait. We build it, you approve it, then you pay the rest."
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button href="#pricing" variant="primary" size="lg">
              <Sparkles size={18} />
              See Pricing
            </Button>
            <Button href="#portfolio" variant="outline" size="lg">
              See the Work
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-2xl mx-auto">
            <StatCounter value={5} suffix=" days" label="Starter delivery" />
            <StatCounter value={350} prefix="$" label="Starting price" />
            <StatCounter value={175} prefix="$" label="Deposit to start" />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 md:px-8 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Pricing"
            title="Simple, Transparent Packages"
            subtitle="No hidden fees, no surprise invoices. You always see the finished site before the balance is due."
            className="mb-12"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white rounded-2xl p-8 flex flex-col transition-all duration-300 shadow-[0_1px_3px_rgba(107,33,168,0.07),0_4px_16px_rgba(107,33,168,0.04)] hover:shadow-[0_4px_24px_rgba(107,33,168,0.14)] ${
                  pkg.highlighted
                    ? 'border-2 border-purple-400'
                    : 'border border-[#EDE9FE] hover:border-purple-400'
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 border border-green-200 rounded-full px-3 py-1 text-xs font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="font-heading font-bold text-xl text-[#1A0533] mb-1">{pkg.name}</h3>
                <p className="text-[#6B5A8E] text-sm mb-5">{pkg.tagline}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="font-heading font-bold text-4xl text-[#1A0533]">{pkg.price}</span>
                  <span className="text-[#9385B5] text-sm mb-1">{pkg.cadence}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#6B5A8E]">
                      <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  href="#contact"
                  variant={pkg.highlighted ? 'primary' : 'outline'}
                  fullWidth
                >
                  {pkg.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 md:px-8 bg-[#F5F3FF] border-y border-[#EDE9FE]">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="How It Works"
            title="From Preview to Live Site"
            align="left"
            className="mb-12"
          />
          <div className="relative space-y-8">
            <div className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-700 via-green-500 to-[#222]" />
            {steps.map((step, i) => (
              <div key={step.title} className="flex items-start gap-6 pl-12 relative">
                <div className="absolute left-0 w-11 h-11 rounded-full bg-white border-2 border-purple-700 flex items-center justify-center flex-shrink-0 font-heading font-bold text-purple-700">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#1A0533] mb-2">{step.title}</h3>
                  <p className="text-[#6B5A8E] text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 px-4 md:px-8 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Portfolio"
            title="Real Sites We've Built"
            subtitle="Every project ships fast and looks like it belongs to a real business — because it does."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {portfolio.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-[#EDE9FE] hover:border-purple-400 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 shadow-[0_1px_3px_rgba(107,33,168,0.07),0_4px_16px_rgba(107,33,168,0.04)] hover:shadow-[0_4px_24px_rgba(107,33,168,0.14)]"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center flex-shrink-0">
                    <Rocket size={20} className="text-purple-600" />
                  </div>
                  <span className="w-7 h-7 rounded-lg bg-[#F5F3FF] border border-[#EDE9FE] flex items-center justify-center text-[#6B5A8E] group-hover:text-purple-600 group-hover:border-purple-300 transition-colors">
                    <ExternalLink size={13} />
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[#1A0533] text-lg mb-1">{project.name}</h3>
                  <p className="text-[#6B5A8E] text-sm leading-relaxed">{project.description}</p>
                </div>
                <span className="text-green-600 group-hover:text-green-700 text-sm font-semibold transition-colors">
                  {project.url.replace('https://', '')}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-[#F5F3FF] border-t border-[#EDE9FE] scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Get Started"
            title="Let's Build Your Site"
            subtitle="Reach out and we'll put together your free preview — no cost, no obligation."
            className="mb-10"
          />

          <a
            href="mailto:founder@theplugai.info"
            className="inline-flex items-center gap-2.5 bg-white border border-[#EDE9FE] hover:border-purple-400 rounded-xl px-6 py-3 text-[#1A0533] font-semibold text-sm transition-colors mb-8"
          >
            <Mail size={16} className="text-green-600" />
            founder@theplugai.info
          </a>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" disabled fullWidth className="sm:w-auto">
              <Clock size={16} />
              Booking link coming soon
            </Button>
            <Button variant="outline" disabled fullWidth className="sm:w-auto">
              <DollarSign size={16} />
              Deposit link coming soon
            </Button>
          </div>
          <p className="text-[#9385B5] text-xs mt-4">
            No online booking or payment link yet — email us directly and we&apos;ll take it from there.
          </p>
        </div>
      </section>
    </div>
  )
}
