import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="pt-24 bg-[#FAFAFA] min-h-screen">
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#6B5A8E] hover:text-purple-700 text-sm transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="mb-10">
            <p className="text-purple-600 text-sm font-semibold tracking-wide uppercase mb-2">Legal</p>
            <h1 className="font-heading font-bold text-4xl text-[#1A0533] mb-3">Privacy Policy</h1>
            <p className="text-[#9385B5] text-sm">Last updated: June 2026</p>
          </div>

          <div className="space-y-10 text-[#6B5A8E]">
            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">1. What We Collect</h2>
              <p className="text-sm leading-relaxed">
                When you sign up for our newsletter, download a resource, or submit a form on The Plug AI
                website, we collect your email address and any additional information you voluntarily
                provide (such as your name or organization). We do not collect data through advertising
                networks or invasive tracking. Basic, anonymized page view counts may be collected through
                standard hosting analytics.
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">2. How We Use Your Information</h2>
              <p className="text-sm leading-relaxed mb-3">We use the information you provide to:</p>
              <ul className="list-disc list-inside space-y-1.5 text-sm">
                <li>Send you the newsletter and resources you requested</li>
                <li>Respond to workshop requests and contact form submissions</li>
                <li>Notify you of new free resources, guides, and workshops</li>
                <li>Improve our content and offerings</li>
              </ul>
              <p className="text-sm leading-relaxed mt-3">
                We do not sell, rent, or share your personal information with third parties for their
                marketing purposes.
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">3. Email Communications</h2>
              <p className="text-sm leading-relaxed">
                If you subscribe to our newsletter or download a resource, we will send you email
                communications about new content, workshops, and AI tips. You can unsubscribe at any time
                by clicking the &ldquo;unsubscribe&rdquo; link at the bottom of any email, or by contacting us
                directly. We use Formspree to process form submissions. Your email address may be stored in
                their secure system in accordance with their privacy policy.
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">4. Cookies</h2>
              <p className="text-sm leading-relaxed">
                Our website may use essential cookies necessary for the site to function. We do not use
                advertising cookies, tracking pixels from social media platforms, or cross-site tracking
                technologies. If you have a browser set to block cookies, the website will still function
                normally.
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">5. Your Rights</h2>
              <p className="text-sm leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1.5 text-sm">
                <li>Request a copy of the data we hold about you</li>
                <li>Request that we delete your data</li>
                <li>Unsubscribe from email communications at any time</li>
                <li>Correct any inaccurate information</li>
              </ul>
              <p className="text-sm leading-relaxed mt-3">
                To exercise any of these rights, contact us at the email address listed on our{' '}
                <Link href="/contact" className="text-purple-600 hover:text-purple-700 underline">
                  contact page
                </Link>
                .
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">6. Security</h2>
              <p className="text-sm leading-relaxed">
                We take reasonable steps to protect the information you provide. Our website is served over
                HTTPS. Form submissions are handled by Formspree, which uses industry-standard security
                practices. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">7. Changes to This Policy</h2>
              <p className="text-sm leading-relaxed">
                We may update this Privacy Policy from time to time. When we do, we will update the
                &ldquo;Last updated&rdquo; date at the top of this page. Continued use of our site after changes
                constitutes acceptance of the updated policy.
              </p>
            </div>

            <div className="bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">8. Contact Us</h2>
              <p className="text-sm leading-relaxed">
                Questions about this Privacy Policy? Reach us through our{' '}
                <Link href="/contact" className="text-purple-600 hover:text-purple-700 underline">
                  contact page
                </Link>
                . We respond within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
