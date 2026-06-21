export type CostTier = 'Free' | 'Free + Paid' | 'Paid'
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Tool {
  id: string
  name: string
  tagline: string
  description: string
  cost: CostTier
  difficulty: DifficultyLevel
  category: string
  learnSlug: string
  logoUrl: string
  color: string
  url: string
}

export const tools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    tagline: 'The AI that started it all',
    description:
      'Write anything, research anything, solve anything. ChatGPT is the most versatile AI tool available. Use it for resumes, emails, research, planning, coding — the possibilities are endless.',
    cost: 'Free + Paid',
    difficulty: 'Beginner',
    category: 'Writing & Research',
    learnSlug: 'chatgpt-resume',
    logoUrl: 'https://via.placeholder.com/60x60/10A37F/ffffff?text=GPT',
    color: '#10A37F',
    url: 'https://chat.openai.com',
  },
  {
    id: '2',
    name: 'Claude',
    tagline: 'Thoughtful AI for complex tasks',
    description:
      "Anthropic's Claude excels at long documents, nuanced writing, and careful reasoning. Great for analyzing contracts, writing long-form content, and tasks that require careful thinking.",
    cost: 'Free + Paid',
    difficulty: 'Beginner',
    category: 'Writing & Research',
    learnSlug: 'what-is-ai',
    logoUrl: 'https://via.placeholder.com/60x60/D97706/ffffff?text=AI',
    color: '#D97706',
    url: 'https://claude.ai',
  },
  {
    id: '3',
    name: 'Gemini',
    tagline: "Google's AI, built into your tools",
    description:
      "Google's AI integrates directly into Gmail, Google Docs, and Google Search. If you already use Google products, Gemini is the easiest AI to add to your daily routine.",
    cost: 'Free + Paid',
    difficulty: 'Beginner',
    category: 'Productivity',
    learnSlug: 'free-ai-tools',
    logoUrl: 'https://via.placeholder.com/60x60/4285F4/ffffff?text=G',
    color: '#4285F4',
    url: 'https://gemini.google.com',
  },
  {
    id: '4',
    name: 'Canva AI',
    tagline: 'Professional design for everyone',
    description:
      'Create stunning graphics, flyers, presentations, and social media posts using AI. No design skills required. Canva AI generates images and layouts from your descriptions.',
    cost: 'Free + Paid',
    difficulty: 'Beginner',
    category: 'Design',
    learnSlug: 'free-ai-tools',
    logoUrl: 'https://via.placeholder.com/60x60/00C4CC/ffffff?text=CV',
    color: '#00C4CC',
    url: 'https://canva.com',
  },
  {
    id: '5',
    name: 'Perplexity',
    tagline: 'Search that actually answers you',
    description:
      "Tired of googling and getting 10 links? Perplexity reads those links for you and gives you a direct answer — with citations so you can verify. It's the smarter way to research.",
    cost: 'Free + Paid',
    difficulty: 'Beginner',
    category: 'Research',
    learnSlug: 'free-ai-tools',
    logoUrl: 'https://via.placeholder.com/60x60/20B2AA/ffffff?text=P',
    color: '#20B2AA',
    url: 'https://perplexity.ai',
  },
  {
    id: '6',
    name: 'Notion AI',
    tagline: 'Your notes, supercharged',
    description:
      'Notion AI lives inside your notes and documents. It can summarize meetings, generate action items, draft documents, and help you organize your thoughts — all in one place.',
    cost: 'Free + Paid',
    difficulty: 'Intermediate',
    category: 'Productivity',
    learnSlug: 'ai-for-small-business',
    logoUrl: 'https://via.placeholder.com/60x60/000000/ffffff?text=N',
    color: '#000000',
    url: 'https://notion.so',
  },
]
