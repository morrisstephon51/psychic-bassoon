import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, ArrowLeft, ArrowRight, Share2, CheckCircle, BookOpen } from 'lucide-react'
import { lessons } from '@/lib/data/lessons'
import Badge from '@/components/ui/Badge'

interface LessonPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }))
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = lessons.find((l) => l.slug === params.slug)
  if (!lesson) return {}
  return {
    title: lesson.title,
    description: lesson.description,
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = lessons.find((l) => l.slug === params.slug)
  if (!lesson) notFound()

  const currentIndex = lessons.findIndex((l) => l.slug === params.slug)
  const nextLesson = lessons[currentIndex + 1] ?? null
  const prevLesson = lessons[currentIndex - 1] ?? null

  return (
    <div className="pt-24">
      {/* Top bar */}
      <div className="border-b border-[#EDE9FE] bg-[#F5F3FF] sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-[#6B5A8E] hover:text-purple-700 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            All Lessons
          </Link>
          <div className="flex items-center gap-3">
            <Badge label={lesson.difficulty} variant="difficulty" />
            <div className="flex items-center gap-1.5 text-[#6B5A8E] text-xs">
              <Clock size={12} />
              <span>{lesson.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#F5F3FF] to-[#FAFAFA] border-b border-[#EDE9FE] py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 rounded-full px-3 py-1.5 text-purple-600 text-xs font-semibold mb-4">
            <BookOpen size={12} />
            {lesson.category}
          </div>
          <div className="flex items-start gap-4">
            <span className="text-5xl md:text-6xl leading-none flex-shrink-0">{lesson.emoji}</span>
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A0533] leading-tight mb-4">
                {lesson.title}
              </h1>
              <p className="text-[#6B5A8E] text-lg leading-relaxed max-w-2xl">{lesson.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <article className="space-y-10">
            {lesson.sections.map((section, i) => (
              <div key={i} className="space-y-4">
                <h2 className="font-heading font-bold text-2xl text-[#1A0533]">{section.heading}</h2>
                <div className="text-[#6B5A8E] leading-relaxed space-y-4">
                  {section.content.split('\n\n').map((paragraph, j) => (
                    <p key={j} className="text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Key Takeaway Box */}
            <div className="bg-green-500/8 border border-green-500/25 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={20} className="text-green-600" />
                <h3 className="font-heading font-bold text-lg text-green-600">Key Takeaways</h3>
              </div>
              <ul className="space-y-3">
                {lesson.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#1A0533] text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    </div>
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Try Next */}
            {lesson.nextSteps.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-xl text-[#1A0533] mb-4">What to Try Next</h3>
                <div className="space-y-3">
                  {lesson.nextSteps.map((step) => {
                    const nextLessonData = lessons.find((l) => l.slug === step.slug)
                    return (
                      <Link
                        key={step.slug}
                        href={`/learn/${step.slug}`}
                        className="flex items-center justify-between bg-white border border-[#EDE9FE] hover:border-purple-700 rounded-xl p-4 group transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{nextLessonData?.emoji ?? '📚'}</span>
                          <span className="text-[#1A0533] font-medium text-sm group-hover:text-purple-700 transition-colors">
                            {step.title}
                          </span>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-[#6B5A8E] group-hover:text-green-600 group-hover:translate-x-1 transition-all"
                        />
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Share / Community */}
            <div className="border-t border-[#EDE9FE] pt-8">
              <p className="text-[#6B5A8E] text-sm mb-4">
                Found this helpful? Share it with someone who needs it.
              </p>
              <button className="inline-flex items-center gap-2 border border-[#D8D0F7] hover:border-purple-600 text-[#6B5A8E] hover:text-purple-700 px-5 py-2.5 rounded-xl text-sm transition-all duration-200">
                <Share2 size={15} />
                Share This Lesson
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            {/* Progress hint */}
            <div className="bg-white border border-[#EDE9FE] rounded-2xl p-5">
              <p className="font-heading font-bold text-sm text-[#1A0533] mb-3">In This Lesson</p>
              <ul className="space-y-2">
                {lesson.sections.map((section, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#6B5A8E]">
                    <div className="w-4 h-4 rounded-full bg-purple-700/30 border border-purple-700/50 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-purple-600 font-bold">
                      {i + 1}
                    </div>
                    {section.heading}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#F5F3FF] to-[#F0EEFF] border border-[#EDE9FE] rounded-2xl p-5 text-center">
              <p className="font-heading font-bold text-[#1A0533] text-sm mb-2">
                Want the free AI Starter Kit?
              </p>
              <p className="text-[#6B5A8E] text-xs mb-4">
                Tools, prompts, and a 30-day plan — all free.
              </p>
              <Link
                href="/#email-capture"
                className="block w-full bg-green-500 hover:bg-green-500 text-black font-bold py-2.5 rounded-xl text-sm transition-colors duration-200 text-center"
              >
                Get Free Guide
              </Link>
            </div>
          </aside>
        </div>

        {/* Prev / Next navigation */}
        <div className="border-t border-[#EDE9FE] mt-16 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevLesson && (
            <Link
              href={`/learn/${prevLesson.slug}`}
              className="flex items-center gap-3 bg-white border border-[#EDE9FE] hover:border-purple-700 rounded-xl p-4 group transition-colors duration-200"
            >
              <ArrowLeft size={18} className="text-[#6B5A8E] group-hover:text-purple-700 flex-shrink-0" />
              <div>
                <p className="text-xs text-[#9385B5] mb-0.5">Previous</p>
                <p className="text-sm font-medium text-[#1A0533] group-hover:text-purple-700 transition-colors line-clamp-2">
                  {prevLesson.title}
                </p>
              </div>
            </Link>
          )}
          {nextLesson && (
            <Link
              href={`/learn/${nextLesson.slug}`}
              className="flex items-center gap-3 bg-white border border-[#EDE9FE] hover:border-purple-700 rounded-xl p-4 group transition-colors duration-200 sm:flex-row-reverse text-right"
            >
              <ArrowRight size={18} className="text-[#6B5A8E] group-hover:text-purple-700 flex-shrink-0" />
              <div>
                <p className="text-xs text-[#9385B5] mb-0.5">Next</p>
                <p className="text-sm font-medium text-[#1A0533] group-hover:text-purple-700 transition-colors line-clamp-2">
                  {nextLesson.title}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
