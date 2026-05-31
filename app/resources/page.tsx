import SectionHeader from '@/components/SectionHeader'
import ResourceCard from '@/components/ResourceCard'
import ToolCard from '@/components/ToolCard'
import EmailCapture from '@/components/shared/EmailCapture'
import { resources } from '@/lib/data/resources'
import { tools } from '@/lib/data/tools'
import { Play, BookOpen } from 'lucide-react'

const videoPlaceholders = [
  {
    id: 'v1',
    title: 'ChatGPT From Zero: Your First 20 Minutes',
    duration: '18 min',
    views: '12K views',
  },
  {
    id: 'v2',
    title: 'How to Write a Resume Using AI (Full Walkthrough)',
    duration: '24 min',
    views: '8K views',
  },
  {
    id: 'v3',
    title: 'Canva AI Tutorial: Make a Flyer in 10 Minutes',
    duration: '11 min',
    views: '6K views',
  },
]

export default function ResourcesPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-4 md:px-8 bg-[#F5F3FF] border-b border-[#EDE9FE] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-900/10 blur-[80px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <SectionHeader
            eyebrow="Free Resources"
            title={
              <>
                Everything You Need,{' '}
                <span className="text-gradient">All Free</span>
              </>
            }
            subtitle="Downloads, guides, tools, and videos — a full library to support your AI learning journey. No paywalls. No credit cards. Just plug in."
          />
        </div>
      </section>

      {/* Free Downloads */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10 gap-4">
            <SectionHeader
              eyebrow="Free Downloads"
              title="Take These With You"
              align="left"
              className="max-w-lg"
            />
            <span className="text-[#6B5A8E] text-sm hidden md:block">
              {resources.length} resources available
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, i) => (
              <ResourceCard key={resource.id} resource={resource} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Tools */}
      <section className="py-16 px-4 md:px-8 bg-[#F5F3FF] border-y border-[#EDE9FE]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Recommended Tools"
            title={
              <>
                The Tools We{' '}
                <span className="text-gradient">Actually Use</span>
              </>
            }
            subtitle="We only recommend tools that are actually useful for everyday people. No tech bro flex — just real tools that work."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Library */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Video Library"
            title={
              <>
                Watch & Learn
              </>
            }
            subtitle="Short, practical video tutorials. No 3-hour courses. Just the stuff you can actually use."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {videoPlaceholders.map((video, i) => (
              <div
                key={video.id}
                className="bg-white border border-[#EDE9FE] rounded-2xl overflow-hidden group cursor-pointer hover:border-purple-700 transition-colors duration-300"
              >
                {/* Thumbnail placeholder */}
                <div className="relative h-44 bg-[#F0EEFF] flex items-center justify-center group-hover:bg-[#EDE9FE] transition-colors">
                  <div className="w-14 h-14 rounded-full bg-black/60 border border-[#D8D0F7] flex items-center justify-center group-hover:bg-purple-700/80 transition-colors duration-300">
                    <Play size={22} className="text-white ml-1" fill="white" />
                  </div>
                  <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-lg">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-[#1A0533] text-sm leading-snug mb-2 group-hover:text-purple-700 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[#6B5A8E] text-xs">{video.views}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-[#D8D0F7] hover:border-purple-600 text-[#6B5A8E] hover:text-purple-700 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
            >
              <BookOpen size={16} />
              View Full Video Library on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Email Capture CTA */}
      <section className="py-16 px-4 md:px-8 bg-[#F5F3FF] border-t border-[#EDE9FE]">
        <div className="max-w-4xl mx-auto">
          <EmailCapture
            headline="Get New Resources First"
            subtext="Every time we drop a new guide, cheatsheet, or tool — subscribers get it first. Join the list and stay ahead."
            buttonLabel="Get Early Access"
          />
        </div>
      </section>
    </div>
  )
}
