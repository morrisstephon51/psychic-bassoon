export type WorkshopFormat = 'In-Person' | 'Virtual' | 'Hybrid'

export interface WorkshopTrack {
  id: string
  emoji: string
  title: string
  duration: string
  format: WorkshopFormat
  audience: string
  description: string
  topics: string[]
}

// The curricula we run. Public dates are announced via the newsletter —
// no session is listed here until it's real and confirmed.
export const workshopTracks: WorkshopTrack[] = [
  {
    id: 'ai-101',
    emoji: '🤖',
    title: 'AI 101: Your First Steps Into Artificial Intelligence',
    duration: '2 hours',
    format: 'Hybrid',
    audience: 'Complete beginners',
    description:
      "A hands-on introduction to AI tools for complete beginners. Bring your phone or laptop — we'll walk through ChatGPT, Canva AI, and Perplexity together. No experience needed.",
    topics: ['What is AI?', 'ChatGPT basics', 'Canva AI for graphics', 'Free tools tour'],
  },
  {
    id: 'job-seekers',
    emoji: '💼',
    title: 'AI for Job Seekers: Land More Interviews',
    duration: '2 hours',
    format: 'Virtual',
    audience: 'Job seekers & career changers',
    description:
      'Learn how to use AI to write a stronger resume, prep for interviews, find jobs that match your skills, and write standout cover letters — all for free.',
    topics: ['Resume writing with AI', 'Cover letter prompts', 'Interview prep', 'Job search tools'],
  },
  {
    id: 'small-business',
    emoji: '🏪',
    title: 'AI for Small Business Owners',
    duration: '2.5 hours',
    format: 'Hybrid',
    audience: 'Entrepreneurs & side hustlers',
    description:
      'Marketing, customer service, bookkeeping — learn how AI helps you run your business without hiring a team. Real tools, real use cases, real results.',
    topics: ['AI marketing copy', 'Customer service automation', 'AI for social media', 'Bookkeeping tools'],
  },
  {
    id: 'seniors',
    emoji: '🌟',
    title: 'AI Basics for Seniors',
    duration: '2 hours',
    format: 'In-Person',
    audience: 'Seniors & older adults',
    description:
      'A gentle, patient introduction to AI tools designed for seniors. Learn voice assistants, how to ask AI questions, and practical daily life uses. Helpers on site.',
    topics: ['Voice assistants', 'ChatGPT basics', 'Healthcare info', 'Staying connected'],
  },
  {
    id: 'faith-nonprofit',
    emoji: '⛪',
    title: 'Church & Nonprofit Leaders: AI for Your Organization',
    duration: '2 hours',
    format: 'Virtual',
    audience: 'Faith & community leaders',
    description:
      'Designed specifically for church leaders, nonprofit directors, and community org leaders. Learn how AI can help with outreach, bulletins, fundraising copy, and volunteer coordination.',
    topics: ['AI for outreach', 'Newsletter writing', 'Fundraising copy', 'Event planning with AI'],
  },
  {
    id: 'youth',
    emoji: '🚀',
    title: 'Youth AI Camp: For Ages 14–24',
    duration: 'Full day',
    format: 'In-Person',
    audience: 'Teens & young adults',
    description:
      'A full-day immersive experience for young people. Build your first AI project, learn tools for school and work, and meet others your age who are interested in tech.',
    topics: ['AI tools for school', 'Building with AI', 'Career paths in AI', 'AI safety'],
  },
]
