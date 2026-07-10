import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import Features from '@/components/sections/Features'
import WhoIsThisFor from '@/components/sections/WhoIsThisFor'
import FeaturedWorkshop from '@/components/sections/FeaturedWorkshop'
import StartLearning from '@/components/sections/StartLearning'
import EmailCapture from '@/components/shared/EmailCapture'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <WhoIsThisFor />
      <FeaturedWorkshop />
      <StartLearning />
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <EmailCapture source="home" />
        </div>
      </section>
    </>
  )
}
