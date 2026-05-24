export type WorkshopFormat = 'In-Person' | 'Virtual' | 'Hybrid'

export interface Workshop {
  id: string
  title: string
  date: string
  time: string
  location: string
  format: WorkshopFormat
  city: string
  spotsRemaining: number
  totalSpots: number
  description: string
  topics: string[]
  registrationUrl: string
}

export interface PastWorkshop {
  id: string
  title: string
  date: string
  location: string
  attendees: number
  recap: string
}

export const upcomingWorkshops: Workshop[] = [
  {
    id: '1',
    title: 'AI 101: Your First Steps Into Artificial Intelligence',
    date: '2026-06-14',
    time: '10:00 AM – 12:00 PM CST',
    location: 'Greater Hope Community Center, 4821 S. King Dr.',
    format: 'In-Person',
    city: 'Chicago, IL',
    spotsRemaining: 12,
    totalSpots: 30,
    description:
      'A hands-on introduction to AI tools for complete beginners. Bring your phone or laptop — we\'ll walk through ChatGPT, Canva AI, and Perplexity together. No experience needed.',
    topics: ['What is AI?', 'ChatGPT basics', 'Canva AI for graphics', 'Free tools tour'],
    registrationUrl: '#',
  },
  {
    id: '2',
    title: 'AI for Job Seekers: Land More Interviews',
    date: '2026-06-21',
    time: '6:00 PM – 8:00 PM EST',
    location: 'Zoom — Link sent after registration',
    format: 'Virtual',
    city: 'Virtual',
    spotsRemaining: 28,
    totalSpots: 100,
    description:
      'Learn how to use AI to write a stronger resume, prep for interviews, find jobs that match your skills, and write standout cover letters — all for free.',
    topics: ['Resume writing with AI', 'Cover letter prompts', 'Interview prep', 'Job search tools'],
    registrationUrl: '#',
  },
  {
    id: '3',
    title: 'AI for Small Business Owners',
    date: '2026-07-08',
    time: '2:00 PM – 4:30 PM CST',
    location: 'Southside Business Hub, 2200 W. 63rd St.',
    format: 'In-Person',
    city: 'Chicago, IL',
    spotsRemaining: 5,
    totalSpots: 20,
    description:
      'Marketing, customer service, bookkeeping — learn how AI helps you run your business without hiring a team. Real tools, real use cases, real results.',
    topics: ['AI marketing copy', 'Customer service automation', 'AI for social media', 'Bookkeeping tools'],
    registrationUrl: '#',
  },
  {
    id: '4',
    title: 'AI Basics for Seniors',
    date: '2026-07-15',
    time: '1:00 PM – 3:00 PM CST',
    location: 'Pullman Senior Center, 11216 S. Cottage Grove',
    format: 'In-Person',
    city: 'Chicago, IL',
    spotsRemaining: 18,
    totalSpots: 25,
    description:
      'A gentle, patient introduction to AI tools designed for seniors. Learn voice assistants, how to ask AI questions, and practical daily life uses. Helpers on site.',
    topics: ['Voice assistants', 'ChatGPT basics', 'Healthcare info', 'Staying connected'],
    registrationUrl: '#',
  },
  {
    id: '5',
    title: 'Church & Nonprofit Leaders: AI for Your Organization',
    date: '2026-07-22',
    time: '6:30 PM – 8:30 PM CDT',
    location: 'Zoom — Link sent after registration',
    format: 'Virtual',
    city: 'Virtual',
    spotsRemaining: 42,
    totalSpots: 75,
    description:
      'Designed specifically for church leaders, nonprofit directors, and community org leaders. Learn how AI can help with outreach, bulletins, fundraising copy, and volunteer coordination.',
    topics: ['AI for outreach', 'Newsletter writing', 'Fundraising copy', 'Event planning with AI'],
    registrationUrl: '#',
  },
  {
    id: '6',
    title: 'Youth AI Camp: For Ages 14–24',
    date: '2026-08-02',
    time: '9:00 AM – 3:00 PM CST',
    location: 'Kenwood Academy Community Room, 5015 S. Blackstone',
    format: 'In-Person',
    city: 'Chicago, IL',
    spotsRemaining: 20,
    totalSpots: 40,
    description:
      'A full-day immersive experience for young people. Build your first AI project, learn tools for school and work, and meet others your age who are interested in tech.',
    topics: ['AI tools for school', 'Building with AI', 'Career paths in AI', 'AI safety'],
    registrationUrl: '#',
  },
]

export const pastWorkshops: PastWorkshop[] = [
  {
    id: 'p1',
    title: 'AI 101 — South Shore Community Center',
    date: 'March 15, 2026',
    location: 'Chicago, IL',
    attendees: 47,
    recap:
      'Standing room only at our South Shore workshop. Attendees left with working ChatGPT accounts and completed their first resume drafts on site.',
  },
  {
    id: 'p2',
    title: 'AI for Job Seekers — Virtual Series',
    date: 'February 2026',
    location: 'Virtual (3-part series)',
    attendees: 112,
    recap:
      '3-part virtual series with 112 total attendees. Multiple participants reported landing interviews within 2 weeks of applying the resume techniques.',
  },
  {
    id: 'p3',
    title: "New Beginnings Church — Women's Ministry AI Workshop",
    date: 'January 18, 2026',
    location: 'Atlanta, GA',
    attendees: 38,
    recap:
      "First church partner workshop. Participants used Canva AI to redesign the church's event flyers on the spot. The pastor called it 'transformational.'",
  },
]
