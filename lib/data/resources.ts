export type ResourceFormat = 'PDF' | 'Guide' | 'Cheatsheet' | 'Template' | 'Workbook'

export interface Resource {
  id: string
  title: string
  description: string
  format: ResourceFormat
  pages?: string
  downloadUrl: string
  emoji: string
  accent: string
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'AI Starter Kit',
    description:
      'Everything you need to get started with AI in one place. Includes tool setup guides, starter prompts for 10 different use cases, and a 30-day learning plan. Print it out, keep it handy.',
    format: 'PDF',
    pages: '4 pages',
    downloadUrl: '/downloads/ai-starter-kit.pdf',
    emoji: '⚡',
    accent: '#6B21A8',
  },
  {
    id: '2',
    title: 'Top 10 Free AI Tools Cheatsheet',
    description:
      'A quick-reference guide to the 10 best free AI tools — what they do, how to access them, and the best use cases for each. Print-friendly. Share with your whole team.',
    format: 'Cheatsheet',
    pages: '2 pages',
    downloadUrl: '/downloads/free-ai-tools-cheatsheet.pdf',
    emoji: '🛠️',
    accent: '#16A34A',
  },
  {
    id: '3',
    title: 'AI Resume Prompts Pack',
    description:
      '25 ready-to-use ChatGPT prompts specifically designed for job seekers. Resume bullets, cover letters, LinkedIn summaries, interview prep questions, and thank-you notes — all done for you.',
    format: 'PDF',
    pages: '5 pages',
    downloadUrl: '/downloads/ai-resume-prompts-pack.pdf',
    emoji: '📄',
    accent: '#D97706',
  },
  {
    id: '4',
    title: 'Small Business AI Playbook',
    description:
      'Step-by-step guide to using AI in your small business — marketing, customer service, bookkeeping, and operations. Includes real prompts and tool recommendations.',
    format: 'Guide',
    pages: '4 pages',
    downloadUrl: '/downloads/small-business-ai-playbook.pdf',
    emoji: '🏪',
    accent: '#7C3AED',
  },
  {
    id: '5',
    title: '30-Day AI Learning Challenge',
    description:
      'A daily challenge workbook that takes you from zero to confident in 30 days. Each day is a 15-minute task that builds your skills step by step. Track your progress as you go.',
    format: 'Workbook',
    pages: '4 pages',
    downloadUrl: '/downloads/30-day-ai-challenge.pdf',
    emoji: '📅',
    accent: '#0EA5E9',
  },
  {
    id: '6',
    title: 'AI for Churches & Nonprofits',
    description:
      'Specifically designed for faith communities and nonprofits. Includes prompts for bulletins, fundraising appeals, volunteer recruitment, and community outreach. Free to use and share.',
    format: 'PDF',
    pages: '4 pages',
    downloadUrl: '/downloads/ai-for-churches-nonprofits.pdf',
    emoji: '⛪',
    accent: '#DB2777',
  },
]
