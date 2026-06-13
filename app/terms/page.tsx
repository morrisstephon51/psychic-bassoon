import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
            <h1 className="font-heading font-bold text-4xl text-[#1A0533] mb-3">Terms of Service</h1>
            <p className="text-[#9385B5] text-sm">Last updated: June 2026</p>
          </div>

          <div className="space-y-10 text-[#6B5A8E]">
            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">1. Acceptance of Terms</h2>
              <p className="text-sm leading-relaxed">
                By accessing or using The Plug AI website (theplugai.com), you agree to be bound by these
                Terms of Service. If you do not agree with any part of these terms, you may not use our
                website. These terms apply to all visitors, subscribers, and others who access or use the
                service.
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">2. What We Provide</h2>
              <p className="text-sm leading-relaxed mb-3">
                The Plug AI provides free AI education resources, guides, workshop information, and
                community content. All resources, guides, and cheatsheets available on this website are
                provided free of charge. We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm">
                <li>Modify, update, or remove content at any time</li>
                <li>Change the availability of free resources</li>
                <li>Update workshop schedules and availability</li>
                <li>Discontinue any feature or service with or without notice</li>
              </ul>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">3. Use of Content</h2>
              <p className="text-sm leading-relaxed mb-3">
                All content on The Plug AI website — including guides, cheatsheets, workbooks, and
                written materials — is provided for personal, educational, and non-commercial use. You may:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm mb-3">
                <li>Download and print resources for personal use</li>
                <li>Share resources with community members in an educational context</li>
                <li>Use prompts and frameworks in your personal or professional life</li>
              </ul>
              <p className="text-sm leading-relaxed">
                You may not reproduce, republish, or sell our content for commercial gain without written
                permission. Giving credit to The Plug AI when sharing resources is appreciated.
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">4. User Conduct</h2>
              <p className="text-sm leading-relaxed mb-3">When using our website or submitting forms, you agree not to:</p>
              <ul className="list-disc list-inside space-y-1.5 text-sm">
                <li>Provide false information in workshop requests or contact forms</li>
                <li>Use automated tools to scrape or harvest content from our website</li>
                <li>Attempt to interfere with the security or operation of the website</li>
                <li>Use our platform to distribute spam or harmful content</li>
              </ul>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">5. Disclaimer of Warranties</h2>
              <p className="text-sm leading-relaxed">
                The Plug AI provides all content and resources &ldquo;as is&rdquo; without warranty of any kind. While
                we strive to ensure the accuracy and usefulness of our content, we make no guarantees
                regarding the accuracy, completeness, or applicability of any resource, guide, or
                information. AI is a rapidly evolving field, and some information may become outdated.
                Always verify important information from authoritative sources. Nothing on this site
                constitutes legal, financial, medical, or professional advice.
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">6. Limitation of Liability</h2>
              <p className="text-sm leading-relaxed">
                To the fullest extent permitted by law, The Plug AI and its team shall not be liable for
                any indirect, incidental, special, consequential, or punitive damages arising from your
                use of or inability to use our website or resources. Our total liability for any claim
                shall not exceed the amount you paid to us, if any (most services are free).
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">7. Third-Party Links and Tools</h2>
              <p className="text-sm leading-relaxed">
                Our website contains links to third-party tools (such as ChatGPT, Canva, Google Gemini,
                and others). These links are provided for informational purposes only. We are not
                responsible for the content, privacy practices, or terms of any third-party website. Your
                use of third-party tools is governed by their respective terms of service and privacy
                policies.
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">8. Workshop Participation</h2>
              <p className="text-sm leading-relaxed">
                The Plug AI workshops are offered free of charge. By attending a workshop, you consent to
                photos or video being taken for community documentation purposes. You may opt out by
                informing the workshop facilitator at the start of the event. Workshop availability is
                subject to change and is not guaranteed until confirmed directly by our team.
              </p>
            </div>

            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">9. Changes to Terms</h2>
              <p className="text-sm leading-relaxed">
                We may update these Terms of Service at any time. We will indicate the date of the most
                recent update at the top of this page. Continued use of our website after changes are
                posted constitutes your acceptance of the updated terms.
              </p>
            </div>

            <div className="bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-lg text-[#1A0533] mb-3">10. Contact</h2>
              <p className="text-sm leading-relaxed">
                Questions about these Terms of Service? Contact us through our{' '}
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
