export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type LessonCategory = 'Beginner' | 'Job Skills' | 'Business' | 'Daily Life'

export interface LessonSection {
  heading: string
  content: string
}

export interface Lesson {
  id: string
  slug: string
  emoji: string
  title: string
  difficulty: DifficultyLevel
  readTime: string
  category: LessonCategory
  description: string
  keyTakeaways: string[]
  sections: LessonSection[]
  nextSteps: { title: string; slug: string }[]
}

export const lessons: Lesson[] = [
  {
    id: '1',
    slug: 'what-is-ai',
    emoji: '🤖',
    title: 'What Is AI? (And Why It Matters For You)',
    difficulty: 'Beginner',
    readTime: '5 min read',
    category: 'Beginner',
    description:
      "AI isn't just for tech people. Learn what artificial intelligence actually is, how it works in plain English, and why it's already changing your daily life.",
    keyTakeaways: [
      'AI is software that learns patterns to help you do things faster',
      'You already use AI every day — in your phone, email, and social media',
      'AI tools are free or cheap to start with — no coding required',
      'Learning AI now puts you ahead of 90% of people in the job market',
    ],
    sections: [
      {
        heading: 'So What Actually Is AI?',
        content:
          "Artificial Intelligence is just software that's been trained to recognize patterns and make decisions. Think of it like teaching a really fast student. You show it millions of examples — like essays, images, or conversations — and it learns to create similar things on its own. That's it. No robots. No science fiction. Just smart software.",
      },
      {
        heading: 'You Already Use AI Every Day',
        content:
          "When Netflix recommends a show you actually want to watch — that's AI. When your phone unlocks with your face — that's AI. When Gmail finishes your sentence — that's AI. Spam filters, Google Maps rerouting you around traffic, Siri answering questions — all AI. It's been in your life for years. Now you're just learning to use it on purpose.",
      },
      {
        heading: 'Why This Matters For Your Life',
        content:
          "Here's the real talk: companies are using AI to move faster, cut costs, and do more with less. That means workers who know AI are more valuable. A customer service rep who uses AI to handle 3x more customers gets promoted. A small business owner who uses AI to write their marketing copy saves $500 a month. A job seeker who uses AI to write a perfect resume gets more interviews. This isn't about replacing you — it's about making you more powerful.",
      },
      {
        heading: 'The 3 Types of AI You Need to Know',
        content:
          "1. Chatbots (like ChatGPT, Claude) — You talk to them, they respond like a very smart person who knows almost everything. Use them to write, research, plan, and solve problems.\n\n2. Image AI (like DALL-E, Canva AI) — You describe what you want, it creates the image. Use it for flyers, social media graphics, presentations.\n\n3. Productivity AI (like Notion AI, Grammarly) — It lives inside tools you already use and makes them smarter. Use it to work faster without learning something totally new.",
      },
    ],
    nextSteps: [
      { title: 'How to Use ChatGPT to Write a Resume', slug: 'chatgpt-resume' },
      { title: '5 Free AI Tools You Can Use Today', slug: 'free-ai-tools' },
    ],
  },
  {
    id: '2',
    slug: 'chatgpt-resume',
    emoji: '📄',
    title: 'How to Use ChatGPT to Write a Resume',
    difficulty: 'Beginner',
    readTime: '8 min read',
    category: 'Job Skills',
    description:
      "No resume? Old resume? Bad resume? ChatGPT can fix all of that in 10 minutes. Learn the exact prompts to use to build a standout resume — even if you haven't worked in years.",
    keyTakeaways: [
      'ChatGPT can build a full resume from just a few bullet points about your experience',
      'The right prompts make the difference — learn the exact words to use',
      'Always customize for each job posting using the job description',
      'Review and edit — AI gives you the first draft, you make it yours',
    ],
    sections: [
      {
        heading: 'Why ChatGPT for Resumes?',
        content:
          "Most people hate writing resumes. They stare at a blank page, undersell themselves, use generic language, and spend hours on something that gets rejected in 6 seconds. ChatGPT flips this. You tell it your experience in plain language, and it writes professional, clean resume content. It knows industry keywords, proper formatting, and how to phrase your experience in ways that get noticed.",
      },
      {
        heading: 'Step 1: Set Up the Context',
        content:
          'Start by telling ChatGPT who you are and what job you want. Use this prompt: "I need help writing a resume. I am applying for [job title] at [type of company]. Here is my experience: [list your jobs, how long you worked there, and what you did in plain language]. Please write professional resume bullet points for each position."',
      },
      {
        heading: 'Step 2: Customize for the Job Posting',
        content:
          'Once you have a draft, paste in the job description and say: "Here is the job description I am applying for: [paste it]. Please revise my resume bullet points to match the keywords and requirements in this posting." This one step alone dramatically increases your chances of getting through automated screening systems.',
      },
      {
        heading: 'Step 3: Write Your Summary',
        content:
          'Ask ChatGPT: "Based on my experience above, write a 2-3 sentence professional summary for the top of my resume. Make it confident, specific, and relevant to the [job title] role." This replaces the "objective statement" that everyone wrote in 2005 with something modern and compelling.',
      },
    ],
    nextSteps: [
      { title: '5 Free AI Tools You Can Use Today', slug: 'free-ai-tools' },
      { title: 'What Is AI? (And Why It Matters For You)', slug: 'what-is-ai' },
    ],
  },
  {
    id: '3',
    slug: 'free-ai-tools',
    emoji: '🛠️',
    title: '5 Free AI Tools You Can Use Today',
    difficulty: 'Beginner',
    readTime: '6 min read',
    category: 'Beginner',
    description:
      "You don't need to pay for AI. These 5 tools are free, powerful, and you can start using them in the next 20 minutes. No credit card. No coding. No experience needed.",
    keyTakeaways: [
      'ChatGPT free tier is powerful enough for most everyday tasks',
      'Canva AI lets you create professional graphics with zero design skills',
      'Perplexity is a smarter way to search that actually cites its sources',
      'Google Gemini is built into Gmail and Google Docs for free',
    ],
    sections: [
      {
        heading: 'Tool 1: ChatGPT (chat.openai.com)',
        content:
          "What it does: Everything. Writing, research, planning, coding, brainstorming, answering questions. Think of it as a brilliant assistant available 24/7. Free tier: Yes — the free version (GPT-3.5) handles most tasks beautifully. Best for: Writing emails, drafting documents, researching topics, creating outlines, answering questions, solving problems.",
      },
      {
        heading: 'Tool 2: Canva AI (canva.com)',
        content:
          "What it does: Creates professional designs — flyers, social media posts, presentations, business cards — using AI. You pick a template, describe what you want, and it generates it. Free tier: Yes — Canva's free plan is extremely generous. Best for: Church flyers, small business marketing, social media graphics, resumes, presentations.",
      },
      {
        heading: 'Tool 3: Perplexity (perplexity.ai)',
        content:
          "What it does: Searches the internet and gives you a real answer — with sources. Unlike Google where you get 10 links, Perplexity reads those links and tells you what they say. Free tier: Yes — the free version handles most searches. Best for: Research, fact-checking, finding current information, understanding complex topics.",
      },
      {
        heading: 'Tool 4: Google Gemini (gemini.google.com)',
        content:
          "What it does: Google's AI assistant. It's built into Gmail, Google Docs, and Google Search. It can summarize emails, help you write documents, and answer questions. Free tier: Yes — especially if you already use Google products. Best for: Gmail users, people who use Google Docs at work or school.",
      },
      {
        heading: 'Tool 5: Otter.ai (otter.ai)',
        content:
          "What it does: Records and transcribes meetings, interviews, phone calls — automatically. It even identifies different speakers and highlights key moments. Free tier: Yes — 300 minutes per month for free. Best for: Job interviews, important meetings, interviews, church notes, school lectures.",
      },
    ],
    nextSteps: [
      { title: 'How to Use ChatGPT to Write a Resume', slug: 'chatgpt-resume' },
      { title: 'How AI Can Help You Run Your Small Business', slug: 'ai-for-small-business' },
    ],
  },
  {
    id: '4',
    slug: 'ai-for-small-business',
    emoji: '💼',
    title: 'How AI Can Help You Run Your Small Business',
    difficulty: 'Intermediate',
    readTime: '10 min read',
    category: 'Business',
    description:
      "Competing with big companies used to require big budgets. AI changes that. Learn how small business owners are using free and cheap AI tools to market better, work faster, and make more money.",
    keyTakeaways: [
      'AI can write your marketing copy, social posts, and emails in minutes',
      'Customer service AI can respond to inquiries 24/7 without hiring anyone',
      'AI bookkeeping tools can save you hours every week on finances',
      'Your competitors are already using AI — this helps you catch up fast',
    ],
    sections: [
      {
        heading: 'Marketing Without a Marketing Team',
        content:
          "The biggest expense for small businesses is usually marketing. AI cuts this dramatically. Use ChatGPT to write Instagram captions, Facebook posts, email newsletters, and Google ad copy. Use Canva AI to design graphics. Use Claude to write blog posts that bring customers to your website. What used to cost $2,000/month for a marketing agency now costs $0-$20/month.",
      },
      {
        heading: 'Customer Service That Never Sleeps',
        content:
          "Tools like Tidio or Freshdesk use AI to answer customer questions automatically — even at 2am. You set up the common questions and answers once, and the AI handles it from there. Customers get instant responses. You sleep. Everyone wins.",
      },
      {
        heading: 'Finance and Bookkeeping',
        content:
          "Wave Accounting (free) and QuickBooks both have AI features that categorize your expenses, track invoices, and flag unusual spending automatically. Ask ChatGPT to help you understand your profit/loss statements or create a simple budget spreadsheet. No accountant required for the basics.",
      },
    ],
    nextSteps: [
      { title: '5 Free AI Tools You Can Use Today', slug: 'free-ai-tools' },
      { title: 'AI for Seniors: Simple Tools, Real Results', slug: 'ai-for-seniors' },
    ],
  },
  {
    id: '5',
    slug: 'ai-healthcare',
    emoji: '🏥',
    title: 'Using AI for Healthcare — Finding Info, Navigating Benefits',
    difficulty: 'Beginner',
    readTime: '7 min read',
    category: 'Daily Life',
    description:
      "Healthcare is confusing on purpose. AI tools can help you understand your options, find affordable care, decode insurance language, and prepare for doctor appointments — in plain English.",
    keyTakeaways: [
      'AI can translate medical jargon into plain English instantly',
      'Use AI to prepare questions before doctor appointments',
      'AI can help you find community health clinics and free/low-cost care',
      'Never use AI as a substitute for a doctor — use it to be a better patient',
    ],
    sections: [
      {
        heading: 'Understanding Your Medical Information',
        content:
          "Ever gotten a diagnosis or lab result and had no idea what it means? Paste the medical terminology into ChatGPT and ask: \"Can you explain this in simple terms? What does this mean for my health and daily life?\" This doesn't replace your doctor — it prepares you to have a better conversation with them.",
      },
      {
        heading: 'Navigating Insurance and Benefits',
        content:
          "Insurance documents are written to be confusing. Use AI to help. Paste your Explanation of Benefits into ChatGPT and ask: \"Can you explain what this means in plain language? Why am I being charged this amount?\" You can also use Perplexity to research: \"What's the difference between Medicaid and Medicare?\" or \"How do I appeal an insurance denial?\"",
      },
      {
        heading: 'Finding Affordable Care in Your Community',
        content:
          "Ask ChatGPT: \"I'm in [your city]. I don't have insurance. What are my options for free or low-cost healthcare?\" It will tell you about community health centers, sliding scale clinics, prescription assistance programs, and telehealth options you may not know exist.",
      },
    ],
    nextSteps: [
      { title: 'AI for Seniors: Simple Tools, Real Results', slug: 'ai-for-seniors' },
      { title: '5 Free AI Tools You Can Use Today', slug: 'free-ai-tools' },
    ],
  },
  {
    id: '6',
    slug: 'ai-for-seniors',
    emoji: '👴',
    title: 'AI for Seniors: Simple Tools, Real Results',
    difficulty: 'Beginner',
    readTime: '6 min read',
    category: 'Daily Life',
    description:
      "AI tools are some of the most senior-friendly technology ever created. You just talk to them in plain English. No clicking through menus. No complicated instructions. Just ask and get answers.",
    keyTakeaways: [
      'Voice assistants like Alexa and Google use AI and are beginner-friendly',
      'AI can make text bigger, read things aloud, and simplify information',
      'Use AI to stay connected with family and manage daily life',
      'You can start with just your smartphone — no computer needed',
    ],
    sections: [
      {
        heading: 'Starting Simple: Voice Assistants',
        content:
          "The easiest AI to start with is one you might already have: Amazon Alexa, Google Assistant, or Siri on your phone. Just talk to it. Ask it to call someone, set a reminder, read you the news, answer a question, or play music. This is AI — and you're probably already using it.",
      },
      {
        heading: 'ChatGPT for Everyday Questions',
        content:
          "ChatGPT is like having a knowledgeable friend available any time. You can ask it anything in plain conversational English: \"What's a good recipe I can make with chicken and vegetables I have at home?\" or \"Can you explain what my doctor meant by pre-diabetes?\" or \"Help me write a birthday message for my granddaughter.\" No tech knowledge required.",
      },
      {
        heading: 'Accessibility Features Built Into AI',
        content:
          "Many AI tools have built-in accessibility features. Ask ChatGPT to use large, simple language. Use Google's Read Aloud feature to have web pages read to you. Use AI transcription tools during phone calls to create text you can read. These features were designed for everyone — they're especially useful for people who prefer simpler interfaces.",
      },
    ],
    nextSteps: [
      { title: 'What Is AI? (And Why It Matters For You)', slug: 'what-is-ai' },
      { title: '5 Free AI Tools You Can Use Today', slug: 'free-ai-tools' },
    ],
  },
]
