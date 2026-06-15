export type ResourceFormat = 'PDF' | 'Guide' | 'Cheatsheet' | 'Template' | 'Workbook'

export interface ResourceSection {
  heading: string
  body: string
}

export interface ResourceContent {
  intro: string
  sections: ResourceSection[]
  keyTakeaways: string[]
}

export interface Resource {
  id: string
  slug: string
  title: string
  description: string
  format: ResourceFormat
  pages?: string
  downloadUrl: string
  emoji: string
  accent: string
  emailGated: boolean
  thumbnail: string
  content: ResourceContent
}

export const resources: Resource[] = [
  {
    id: '1',
    slug: 'ai-starter-kit',
    title: 'AI Starter Kit',
    description:
      'Everything you need to get started with AI in one place. Includes tool setup guides, starter prompts for 10 different use cases, and a 30-day learning plan. Print it out, keep it handy.',
    format: 'PDF',
    pages: '18 pages',
    downloadUrl: '/resources/ai-starter-kit',
    emoji: '⚡',
    accent: '#6B21A8',
    emailGated: true,
    thumbnail: '/images/resources/starter-kit.svg',
    content: {
      intro:
        "AI is not magic, and it's not going to take over the world. It's a tool — like a calculator or a search engine — and once you know how to use it, it can save you hours every week. This starter kit is your no-nonsense guide to getting started, whether you're 22 or 72, whether you've never touched a computer or you just feel lost when everyone starts talking about prompts and chatbots.",
      sections: [
        {
          heading: "What AI Actually Is (And What It Isn't)",
          body: "Artificial intelligence, in the way most people use it today, is software that can read your words, understand what you're asking, and write back a helpful response. Think of it like texting a very knowledgeable assistant who has read millions of books, articles, and websites. You ask a question, it answers. You ask it to write something, it writes. You ask it to explain something confusing, it explains it in plain language.\n\nWhat AI is NOT: it is not a human. It does not have feelings, opinions of its own, or secret plans. It cannot see you, hear you, or access your phone's camera. It does not remember your previous conversations (in most cases) unless you tell it things directly. It makes mistakes, and sometimes it sounds very confident while being wrong — which is why you always want to double-check anything important, like medical information or legal advice.\n\nThe most important thing to understand is that AI is a starting point, not a final answer. Use it to get ideas, draft things, and save time — but always bring your own judgment to the table. You are still the one making decisions.",
        },
        {
          heading: 'Setting Up Your Free ChatGPT Account (Step by Step)',
          body: "Step 1: Open your web browser (Chrome, Safari, Firefox — any of them work) and go to chat.openai.com. You'll see a simple homepage.\n\nStep 2: Click \"Sign up\" in the top right corner. You can create an account using your email address, or sign in with your existing Google or Microsoft account if you have one. The free account gives you plenty of access to get started.\n\nStep 3: Once you're in, you'll see a text box at the bottom of the screen. That's where you type your questions or requests. There's nothing to install, nothing to download. It works right in your browser.\n\nStep 4: Type something simple to test it out. Try: \"Explain what you are in one paragraph, like you're talking to someone who has never used AI before.\" Hit Enter or click the send button. Read what comes back. Congratulations — you just used AI for the first time.\n\nOne thing to know: the free version of ChatGPT is genuinely useful for most everyday tasks. You do not need to pay for the $20/month version to get real value. Start free, and upgrade only if you find yourself hitting limits.",
        },
        {
          heading: 'Your First 5 Prompts',
          body: "A \"prompt\" is just what you type into the AI. The better you describe what you need, the better the answer you'll get. Here are five prompts to try in your first session — copy and paste them exactly, then swap in your own details.\n\nPrompt 1 — Explain something: \"Explain [topic] to me like I'm someone who knows nothing about it. Keep it simple and use everyday examples.\" Try it with anything confusing: how credit scores work, what Medicare Part B covers, how to read a lease agreement.\n\nPrompt 2 — Write a message: \"Help me write a professional email to [describe the situation]. My name is [your name] and I want to [your goal]. Keep it short and polite.\" Use this for job inquiries, complaining to a company, or reaching out to someone you haven't talked to in a while.\n\nPrompt 3 — Make a plan: \"I want to [your goal]. I have [time available] and [any resources or constraints]. Give me a simple step-by-step plan I can start today.\" Works for anything from losing weight to organizing your finances to learning a new skill.\n\nPrompt 4 — Get ideas: \"Give me 10 ideas for [what you need ideas for]. I want options that are [simple/cheap/quick/creative — pick one].\" Perfect when you're stuck on gift ideas, business names, event themes, or social media posts.\n\nPrompt 5 — Understand a document: \"I'm going to paste some text below. Summarize it in plain language and tell me the 3 most important things I need to know.\" Then paste in a confusing contract, medical form, or any document you're struggling with.",
        },
        {
          heading: 'Answering Your Real Fears About AI',
          body: "\"Will AI steal my job?\" Maybe someday some jobs will change — but right now, people who know how to use AI are getting ahead of people who don't. The best protection against AI replacing your job is learning how to use it as your assistant. This guide is step one of that.\n\n\"Is it safe? Will it steal my information?\" Don't paste your Social Security number, passwords, or banking details into any AI chat tool. Outside of that, asking ChatGPT for help writing an email or planning a trip is no different than doing a Google search. Just treat it like any website — don't share things you wouldn't share anywhere online.\n\n\"What if I do it wrong?\" You literally cannot break it. If the answer you get is bad, just type \"Try again\" or \"That's not what I meant — here's what I actually need:\" and explain further. There are no wrong questions. No one is watching you. You can delete the conversation and start over anytime.\n\n\"It feels overwhelming and I don't know where to start.\" That's exactly why this guide exists. Start with one of the five prompts above. Spend 10 minutes with it today. You don't need to master AI — you just need to make it work for your life, one task at a time.",
        },
        {
          heading: 'What to Do In Your First Week',
          body: "Day 1: Set up your ChatGPT account. Try Prompt 1 from the section above on a topic you've been curious about. Read the response. That's it.\n\nDay 2–3: Try the email prompt (Prompt 2) on something you actually need to send. Edit the AI's response to sound like you, then send it. Notice how much time you saved.\n\nDay 4–5: Use the \"make a plan\" prompt on something real in your life — a goal you've been putting off, a project at work, something around the house. Let the AI give you a first draft of a plan, then make it your own.\n\nDay 6–7: Share what you've learned with someone. Show a friend, family member, or coworker how to do one of the prompts. Teaching it to someone else is the fastest way to make it stick.\n\nBy the end of your first week, you won't be an AI expert — but you'll be someone who has actually used AI to do something useful. That already puts you ahead of most people. Keep that energy going.",
        },
      ],
      keyTakeaways: [
        'AI is a writing and thinking assistant, not a robot that can see you or make decisions for you.',
        'ChatGPT has a genuinely useful free tier — you do not need to pay to get started.',
        'The quality of your prompt determines the quality of the answer. Be specific about what you need.',
        'Never share passwords, Social Security numbers, or banking details in any AI chat.',
        'You cannot break it — if the response is bad, just rephrase and ask again.',
        'Start with one real task this week: write an email, make a plan, or understand a confusing document.',
        'People who learn to use AI now will have a major advantage. This is your on-ramp.',
      ],
    },
  },
  {
    id: '2',
    slug: 'free-ai-tools-cheatsheet',
    title: 'Top 10 Free AI Tools Cheatsheet',
    description:
      'A quick-reference guide to the 10 best free AI tools — what they do, how to access them, and the best use cases for each. Print-friendly. Share with your whole team.',
    format: 'Cheatsheet',
    pages: '1 page',
    downloadUrl: '/resources/free-ai-tools-cheatsheet',
    emoji: '🛠️',
    accent: '#16A34A',
    emailGated: false,
    thumbnail: '/images/resources/cheatsheet.svg',
    content: {
      intro:
        "There are hundreds of AI tools out there, and most of them are either too expensive, too complicated, or both. This cheatsheet cuts through the noise and gives you the 10 tools that are actually free, actually useful, and actually work for everyday people. Bookmark this page or print it out — you'll come back to it.",
      sections: [
        {
          heading: 'The First 5: General-Purpose AI Assistants and Design',
          body: "1. ChatGPT (chat.openai.com) — The most versatile AI assistant available. Use it to write emails, answer questions, draft documents, explain anything, and brainstorm ideas. Best for: job seekers, writers, anyone who needs to communicate more clearly. Free plan limit: limited messages per hour on the most advanced model, but the standard model handles everyday tasks well.\n\n2. Claude (claude.ai) — Made by Anthropic, Claude is particularly good at reading and summarizing long documents, having nuanced conversations, and writing in a natural tone. Many people find it feels more thoughtful than ChatGPT. Best for: understanding complex documents, longer writing projects, sensitive topics that need a careful touch. Free plan limit: daily message limit, resets each day.\n\n3. Google Gemini (gemini.google.com) — Google's AI assistant, which pulls in up-to-date information from the web. If you use Gmail or Google Docs, Gemini integrates directly. Best for: research, current events, Google Workspace users. Free plan limit: standard tier is free with a Google account.\n\n4. Canva AI (canva.com) — Canva is a design tool with powerful AI features that let you generate images, write captions, resize designs automatically, and create presentations from a text prompt. Best for: small business owners, church volunteers, anyone making flyers or social posts. Free plan limit: limited AI image generations per month; most design features are free.\n\n5. Perplexity AI (perplexity.ai) — Think of it as a smarter Google. You ask a question, it searches the web and gives you a direct answer with sources you can check. Best for: research, fact-checking, learning about topics you don't know well. Free plan limit: limited Pro searches per day; standard searches are unlimited.",
        },
        {
          heading: 'The Next 5: Specialized Tools for Specific Jobs',
          body: "6. Otter.ai (otter.ai) — Records and transcribes conversations in real time. Join a meeting, hit record, and Otter writes out everything that was said. Best for: people who attend frequent meetings, students, anyone who struggles to take notes. Free plan limit: 300 minutes of transcription per month — plenty for casual use.\n\n7. Copy.ai (copy.ai) — Specialized for marketing and business writing: product descriptions, ad copy, email subject lines, social media posts, and more. Best for: small business owners, side hustlers, people running online stores. Free plan limit: 2,000 words per month on the free tier; enough to test whether it fits your needs.\n\n8. Remove.bg (remove.bg) — One single trick, done perfectly: removes the background from any photo in seconds. Upload a picture, get back a clean image ready for a flyer, website, or ID photo. Best for: anyone making marketing materials or needing clean headshots. Free plan limit: low-resolution downloads are free.\n\n9. Adobe Firefly (firefly.adobe.com) — Adobe's AI image generator that creates images from text descriptions. Unlike some AI image tools, Firefly is trained on licensed content, making it safer for commercial use. Best for: creating original illustrations, backgrounds, and marketing images. Free plan limit: monthly credits; the free tier gives enough to experiment.\n\n10. Microsoft Copilot (copilot.microsoft.com) — Microsoft's AI with built-in web search. If you use Windows, it may already be on your computer. Best for: Windows users, anyone in the Microsoft ecosystem (Word, Excel, Outlook). Free plan limit: free with a Microsoft account; advanced Office integration requires Microsoft 365.",
        },
        {
          heading: 'How to Choose the Right Tool',
          body: "Here's the simple rule: start with one tool and get comfortable with it before trying others. For most people, that should be ChatGPT or Claude — they handle the widest range of tasks and have the most tutorials available if you get stuck.\n\nOnce you're comfortable with a general AI assistant, add a specialized tool based on what you do most. If you're a small business owner making marketing materials, add Canva AI. If you're job hunting, lean hard on ChatGPT for resume and cover letter help. If you attend a lot of meetings, try Otter.ai for one week.\n\nYou don't need to master all 10. Two or three tools you actually use regularly will do more for you than a dozen tools you tried once and forgot about. The goal is building small habits, not collecting apps.",
        },
      ],
      keyTakeaways: [
        'ChatGPT and Claude are the best starting points for most people — versatile, free, and well-supported.',
        'Canva AI is the go-to for anyone making visual content like flyers, social posts, or presentations.',
        'Perplexity AI is better than Google Search when you want a direct answer with sources you can verify.',
        'Otter.ai can save you hours if you attend frequent meetings or need to capture what was said.',
        'Remove.bg does one thing perfectly — free background removal in seconds.',
        'Start with one tool, use it for real tasks, then add a second only after the first becomes a habit.',
        'All 10 tools have meaningful free tiers — you do not need to spend money to get real value.',
      ],
    },
  },
  {
    id: '3',
    slug: 'ai-resume-prompts',
    title: 'AI Resume Prompts Pack',
    description:
      '25 ready-to-use ChatGPT prompts specifically designed for job seekers. Resume bullets, cover letters, LinkedIn summaries, interview prep questions, and thank-you notes — all done for you.',
    format: 'PDF',
    pages: '12 pages',
    downloadUrl: '/resources/ai-resume-prompts',
    emoji: '📄',
    accent: '#D97706',
    emailGated: true,
    thumbnail: '/images/resources/resume-prompts.svg',
    content: {
      intro:
        "A resume is one of the hardest things to write about yourself — not because you're not qualified, but because most people aren't trained to sell themselves on paper. AI doesn't fix that problem, but it makes a great first draft you can actually work with. These prompts are designed to get you from a blank page to something real in under an hour.",
      sections: [
        {
          heading: 'Why AI Is a Game-Changer for Job Seekers',
          body: "Before AI, getting a polished resume usually meant paying $150–$300 for a resume writing service, spending weeks on it yourself and still feeling uncertain, or relying on a friend who happened to be good at writing. Most people couldn't afford the service and didn't have the friend. So they submitted a mediocre resume and wondered why they weren't getting callbacks.\n\nAI levels that playing field completely. You can now get the equivalent of a skilled resume writer's first draft in about five minutes, for free. ChatGPT knows what hiring managers look for. It knows how to turn \"I helped customers\" into \"Resolved an average of 40+ customer inquiries daily, maintaining a 95% satisfaction rating.\" It knows the language that gets past automated screening software (called ATS), which eliminates more than 70% of applicants before a human ever sees the resume.\n\nThe key insight is this: AI writes the draft, you make it true and personal. Never submit an AI-generated resume without editing it to reflect your real experience. If you claim something on a resume, you need to be able to back it up in an interview.",
        },
        {
          heading: 'How to Give AI Your Job History',
          body: "The quality of your resume depends on the quality of information you give the AI. Before you start prompting, write out your job history in a simple, messy format — don't worry about how it sounds, just get the facts down. For each job, include: job title, company name, dates (even approximate — \"2019–2022\"), and 3–5 things you actually did or were responsible for, no matter how basic they sound.\n\nThen use this starting prompt: \"I'm going to share my work history with you. I want you to help me turn it into strong resume bullets. Don't write the resume yet — just read this and confirm you understand it.\" Then paste your job history.\n\nThis primes the AI with your actual experience. Every follow-up prompt will be grounded in your real background instead of generic filler. After you've shared your history, you're ready to use the specific prompts below.",
        },
        {
          heading: '20+ Copy-Paste Prompts for Every Situation',
          body: "RESUME BULLETS (for people with work experience):\n\"Using the job history I shared, write 4–5 strong resume bullets for my [job title] position at [company]. Focus on accomplishments and results, not just tasks. Use numbers where possible. Start each bullet with an action verb.\"\n\n\"Rewrite these bullets to be more results-focused: [paste your current bullets]\"\n\nFOR ENTRY-LEVEL JOB SEEKERS:\n\"I'm applying for my first job and don't have much work experience. I have [volunteer work / school activities / personal projects]. Help me write resume bullets that show my value to an employer.\"\n\nFOR CAREER CHANGERS:\n\"I'm switching careers from [old field] to [new field]. Help me reframe my experience to be relevant to the new field. Here's what I used to do: [describe]. Here's the new job I'm targeting: [describe].\"\n\nFOR EMPLOYMENT GAPS:\n\"I have a [X month/year] gap in my employment history. During that time I [raised children / dealt with a health issue / was a caregiver]. How should I address this on my resume and in a cover letter without it being a red flag?\"\n\nCOVER LETTERS:\n\"Write a cover letter for a [job title] position at [company name]. The job posting says they're looking for [paste key requirements]. My relevant experience includes [briefly describe]. Keep it under 300 words and don't make it sound generic.\"\n\nLINKEDIN:\n\"Write a LinkedIn summary for someone with my background. I work in [field], my biggest strengths are [list 2–3], and I'm currently [looking for work / open to opportunities]. Make it sound like a real person, not a corporate robot.\"\n\nINTERVIEW PREP:\n\"Based on this job description [paste it], what are the 5 most likely interview questions I'll be asked? Give me sample answers for each using the STAR method (Situation, Task, Action, Result).\"\n\nTAILORING FOR A SPECIFIC JOB:\n\"Here is a job description [paste it]. Here are my current resume bullets [paste them]. Rewrite my bullets to match the language and keywords in the job description. Don't make up experience I don't have — just align the phrasing.\"\n\n\"What keywords from this job description should I make sure appear in my resume? [Paste job description]\"",
        },
        {
          heading: 'Common Mistakes to Avoid',
          body: "Mistake 1 — Submitting without editing. AI sometimes invents numbers or details that aren't accurate. Always read every line and change anything that isn't 100% true. Hiring managers verify, and being caught in an exaggeration ends your candidacy immediately.\n\nMistake 2 — Using the same resume for every job. AI makes it fast to customize your resume for each application. Use the tailoring prompts to match your language to each job description. Five minutes of customization dramatically increases your callback rate.\n\nMistake 3 — Leaving the generic AI voice in. ChatGPT can sound corporate and stiff, heavy on phrases like \"dynamic professional\" and \"results-driven.\" Read your resume out loud. If it doesn't sound like how a real person describes themselves, edit it until it does.\n\nMistake 4 — Forgetting contact basics. AI writes content, not layout. Make sure your final resume has your name at the top, a phone number and email you actually check, and your city and state. Keep it to one page if you have under 10 years of experience.\n\nMistake 5 — Not asking AI to review your own resume. Try: \"Read this resume and tell me what's weak, what's missing, and what might hurt my chances of getting an interview: [paste resume].\" The AI will often catch things you've been too close to see.",
        },
      ],
      keyTakeaways: [
        'AI gets you from a blank page to a working draft in minutes — but you must edit it to make sure everything is true.',
        'Feed the AI your messy job history first before asking it to write anything — the more context, the better the output.',
        'Tailor your resume for every job application using the keyword-matching prompts. It takes five minutes and significantly improves your callback rate.',
        "If you have employment gaps, AI can help you address them honestly and professionally — frame them, don't hide them.",
        "Never submit a resume with accomplishments or numbers you can't back up in an interview.",
        "Use the interview prep prompts to practice before you go in — most people wing it and then wonder why they didn't get the job.",
        'LinkedIn summary prompts are just as valuable as resume prompts — a strong profile brings opportunities to you.',
      ],
    },
  },
  {
    id: '4',
    slug: 'small-business-ai-playbook',
    title: 'Small Business AI Playbook',
    description:
      'Step-by-step guide to using AI in your small business — marketing, customer service, bookkeeping, and operations. Includes real prompts and tool recommendations.',
    format: 'Guide',
    pages: '24 pages',
    downloadUrl: '/resources/small-business-ai-playbook',
    emoji: '🏪',
    accent: '#7C3AED',
    emailGated: true,
    thumbnail: '/images/resources/business-playbook.svg',
    content: {
      intro:
        "Running a small business means doing the work of five people with the budget of one. AI won't replace your hustle or your relationships, but it will take a huge chunk of the administrative and creative work off your plate — things like responding to customer emails, writing social media posts, creating flyers, and drafting invoices. This playbook shows you exactly how, with real examples you can use today.",
      sections: [
        {
          heading: 'How Much Time AI Can Actually Save You',
          body: "Let's be honest about the math. If you spend two hours a week writing social media posts, one hour on customer emails, and another hour and a half creating flyers or marketing materials — that's 4.5 hours a week, or roughly 18 hours a month. AI can cut that time by 60–70% for most small business owners. That's 10–12 hours a month back in your pocket.\n\nThat's not a small number. That's time you could spend taking on one more client, actually resting, spending with family, or working on the parts of your business that only you can do. Small business owners are already time-poor. AI is one of the few tools that actually addresses that problem directly — not by working faster, but by offloading work entirely.\n\nThe learning curve is shorter than you think. Most business owners who try AI for the first time are using it productively within a week. The prompts in this playbook are designed to be copy-paste ready — fill in your business details and you're done.",
        },
        {
          heading: 'Customer Emails and Responses',
          body: "Customer communication is one of the highest-value things AI can help with, because the way you communicate reflects directly on your brand. A slow, unclear, or unprofessional response loses customers. A fast, warm, clear response builds loyalty.\n\nFor responding to a complaint: \"Write a professional, empathetic response to a customer complaint. The customer said: [paste their message]. My business is [describe]. I want to [resolve the issue / explain the policy / offer a partial refund]. Keep it warm and solution-focused.\"\n\nFor following up after a service: \"Write a short follow-up message to a customer after completing [type of service]. Thank them for their business, ask if everything was satisfactory, and invite them to leave a review on Google. Keep it friendly and under 100 words.\"\n\nFor promotional outreach: \"Write an email to past customers announcing [new service / sale / event]. My business is [describe], the promotion is [details], and I want the email to be [warm and casual / professional / excited and urgent]. Keep it short — under 150 words.\"\n\nTip: Save your best AI-generated email responses as templates. Over time, you'll build a library of ready-made responses that handle 80% of what comes in.",
        },
        {
          heading: 'Social Media Content Creation',
          body: "The hardest part of social media for small business owners isn't the posting — it's coming up with something to say. AI solves that completely. With the right prompts, you can generate a full month of social media content in under an hour.\n\nMonthly content batch prompt: \"I run a [type of business] called [business name]. My customers are mainly [describe your customers]. Create 20 social media post ideas for [platform] for this month. Mix in: behind-the-scenes content, tips related to my industry, promotions, and community-focused posts. Keep the tone [friendly/professional/upbeat — pick one].\"\n\nFor a specific post with a photo: \"Write a caption for a photo of [describe what's in the photo]. My business is [describe]. I want the caption to [highlight a service / be funny and relatable / drive people to book an appointment]. Include a call to action and 5 relevant hashtags.\"\n\nFor announcements: \"Write a Facebook post announcing that [business name] is now [open / offering a new service / running a sale / at a new location]. Make it exciting but not salesy. Include the key details: [date, hours, location, price if relevant].\"\n\nConsistency tip: Set aside one hour on the first of each month to generate all your posts. Schedule them using free tools like Buffer or Meta Business Suite so they go out automatically.",
        },
        {
          heading: 'Bookkeeping and Invoicing Help',
          body: "AI is not an accountant and cannot replace one for your taxes or financial planning. But it can help you with the language, structure, and organization of basic financial documents — and that's where a lot of small business owners get stuck.\n\nFor writing invoices: \"Write a professional invoice template for my [type of business]. I charge [your rate]. Include: my business name [name], client name [placeholder], description of services, payment due date, and payment instructions for [cash/Venmo/Zelle/check]. Make it clean and professional.\"\n\nFor chasing unpaid invoices: \"Write a polite but firm email reminding a client that their invoice for [amount] is [number of days] overdue. Keep it professional, reference the original invoice date, and give them a specific deadline to pay. Don't be rude but be clear.\"\n\nFor understanding what you owe: \"Explain [quarterly estimated taxes / self-employment tax / Schedule C] in simple terms for a small business owner with no accounting background. What do I need to do and when?\"\n\nImportant reminder: Use AI for drafts, templates, and explanations — but for actual filing, tax calculations, and any financial decisions with legal implications, consult a real accountant. Many communities offer free tax help through programs like VITA (Volunteer Income Tax Assistance).",
        },
        {
          heading: 'Creating Flyers and Marketing Materials With Canva AI',
          body: "Canva (canva.com) is a free design tool that added powerful AI features. You don't need any design experience. Here's how to use it for your business:\n\nStep 1: Go to canva.com and create a free account. Search for the type of design you need — \"flyer,\" \"Instagram post,\" \"business card,\" \"menu.\" Canva has thousands of templates.\n\nStep 2: Pick a template that's close to what you want. Click on any text to change it to your own content. Click on images to swap them with your own photos.\n\nStep 3: Use Canva's Magic Write tool (under the Apps tab) to generate text. Try prompts like: \"Write a catchy headline for a flyer promoting [your service] for [your target customer].\"\n\nStep 4: Use Magic Media (also in Apps) to generate a custom image if you don't have a photo. Describe what you want: \"a cozy hair salon with warm lighting\" or \"a food truck serving tacos on a sunny day.\"\n\nStep 5: Download your finished design as a PDF for printing or PNG/JPEG for social media.\n\nPrompt to use before designing: \"I need to make a [type of flyer] for my [type of business]. Give me: a short headline (under 8 words), three bullet points of key information, and a call to action. My business is [describe], the offer is [describe], and my target customer is [describe].\"",
        },
        {
          heading: "What NOT to Trust AI With",
          body: "This is just as important as everything else in this playbook. AI is powerful but it has real limits, and trusting it in the wrong areas can hurt your business.\n\nDo not trust AI for legal advice. If you have questions about contracts, business structure (LLC vs. sole proprietor), employment law, or any legal dispute — talk to an actual attorney. Many communities have legal aid organizations that serve small businesses for free or low cost.\n\nDo not trust AI for final tax and financial decisions. AI can explain concepts and help with templates, but actual tax filing and accounting need a human professional who knows your specific situation and is accountable for their advice.\n\nDo not post AI-generated content without reading it. AI sometimes gets facts wrong or makes up statistics. Everything you post under your business name is your responsibility. Read it, edit it, make it yours.\n\nDo not use AI to replace genuine customer relationships. Your customers chose you because of you — your personality, your care, your expertise. Use AI to handle the administrative side, but don't let it make your business feel cold or robotic. The human touch is your competitive advantage over the big chains.",
        },
      ],
      keyTakeaways: [
        'AI can realistically save small business owners 10+ hours per month on writing, email, and content tasks.',
        "Customer email templates generated by AI — then edited to fit your voice — build faster response times and better customer experiences.",
        "Batch your social media content once a month using AI, then schedule it so you're not scrambling daily.",
        'Canva AI lets you create professional flyers, social posts, and marketing materials with no design experience.',
        "AI can draft invoice templates and payment reminder emails, but it cannot replace an accountant for real financial decisions.",
        'Never post AI content without reading and editing it — you are responsible for everything that goes out under your business name.',
        'Your relationships and expertise are your edge. Use AI for the tasks that drain your time, and spend more energy on what only you can do.',
      ],
    },
  },
  {
    id: '5',
    slug: '30-day-ai-challenge',
    title: '30-Day AI Learning Challenge',
    description:
      'A daily challenge workbook that takes you from zero to confident in 30 days. Each day is a 15-minute task that builds your skills step by step. Track your progress as you go.',
    format: 'Workbook',
    pages: '36 pages',
    downloadUrl: '/resources/30-day-ai-challenge',
    emoji: '📅',
    accent: '#0EA5E9',
    emailGated: true,
    thumbnail: '/images/resources/challenge.svg',
    content: {
      intro:
        "The biggest reason people don't learn AI isn't that it's too hard — it's that they never build the habit. This 30-day challenge fixes that by giving you one small, specific task every day that takes 10–15 minutes. By day 30, you won't just know about AI. You'll have actually used it to do dozens of real things that mattered in your life.",
      sections: [
        {
          heading: 'How This Challenge Works',
          body: "Each day has a single task. It takes 10–15 minutes, no more. It's designed to build on the previous day so your skills compound over the month. You'll start with the most basic tasks and end the month using AI for work, money, creative projects, and professional development.\n\nYou don't need to do it perfectly. If you miss a day, just pick up where you left off. If a task isn't relevant to your life, adapt it. The goal is consistency, not perfection.\n\nA few things to have ready before Day 1: a free ChatGPT account (chat.openai.com), a notebook or notes app to record what you tried and what happened, and an open mind. Some tasks will produce amazing results on the first try. Others will require you to rephrase and try again. Both are valuable — the trial and error is where the real learning happens.\n\nAt the end of each week there's a reflection prompt. Take five minutes with it. Writing down what you learned locks it in your memory and helps you spot patterns in what you're good at and where you want to grow.",
        },
        {
          heading: 'Week 1: Getting Comfortable (Days 1–7)',
          body: "Day 1 — Setup and First Prompt: Create your ChatGPT account if you haven't. Type your very first prompt: \"What's one thing most people don't know about [something you're interested in]?\" Read the response. Write one sentence about how it felt.\n\nDay 2 — Ask It to Explain Something: Pick something you've always been confused about — a bill, a medical term, how something works. Ask: \"Explain [thing] to me in plain language like I've never heard of it before.\" Notice how different this feels from Googling it.\n\nDay 3 — Have a Real Conversation: Ask the AI a follow-up question on something from yesterday. Practice going back and forth: \"Can you give me an example?\" \"What if someone in [your situation] had this problem?\" This is how you get the most out of AI.\n\nDay 4 — Write an Email: Think of an email you've been putting off. Ask ChatGPT to draft it. Edit the draft to sound like you, then send it. Notice how much time you saved.\n\nDay 5 — Summarize Something Long: Find a long document or article you've been meaning to read. Paste it into ChatGPT and say: \"Summarize this in 5 bullet points.\" Use the summary to decide if the full document is worth your time.\n\nDay 6 — Get a Recommendation: Ask AI to recommend something tailored to your life. \"I'm looking for a book about [topic] for someone who [describe yourself]. What do you recommend and why?\" Try the same for a podcast or a recipe.\n\nDay 7 — Week 1 Reflection: What was the most useful thing you tried this week? What surprised you? What felt awkward? Write 3–5 sentences. This reflection takes 5 minutes but is the most important thing you'll do all week.",
        },
        {
          heading: 'Week 2: Practical Tasks (Days 8–14)',
          body: "Day 8 — Research a Purchase: Ask AI: \"I'm considering buying [thing]. What should I look for, what are common mistakes buyers make, and what questions should I ask the seller?\" Compare this to just Googling.\n\nDay 9 — Plan Something: Pick an upcoming event or project. Ask: \"Help me plan [thing]. I have [your budget and time frame]. Give me a step-by-step plan.\" Edit the plan to fit reality.\n\nDay 10 — Understand a Document: Find a contract, lease, medical form, or insurance document. Paste a section into ChatGPT and ask: \"What does this mean in plain English? Are there any terms I should be concerned about?\"\n\nDay 11 — Practice a Difficult Conversation: Think of a conversation you've been dreading — asking for a raise, setting a boundary. Ask: \"I need to have a conversation with [describe person] about [describe situation]. Help me think through what I want to say, anticipate how they might respond, and find the right words.\"\n\nDay 12 — Create a Budget Framework: Ask: \"Help me create a simple monthly budget. I bring in about [your income] per month. My fixed expenses are [list them roughly]. I want to [save more / pay off debt]. What should I prioritize?\"\n\nDay 13 — Learn Something New: Pick any skill you've wanted to learn. Ask: \"I want to learn [skill]. I'm a complete beginner. Create a simple 2-week learning plan with specific daily tasks that take 15 minutes each.\"\n\nDay 14 — Week 2 Reflection: How has your relationship with AI changed since Week 1? Which task from this week would you actually use again? Write it down.",
        },
        {
          heading: 'Week 3: Creative Uses (Days 15–21)',
          body: "Day 15 — Generate Images: Go to canva.com, create a free account, and try the Magic Media feature. Type a description of an image and watch it appear. Experiment with different descriptions.\n\nDay 16 — Write Something Creative: Ask AI to help you write something just for fun — a poem about your city, a short story, a letter to your younger self. Then edit it to add your voice and personality.\n\nDay 17 — Create Social Media Content: Write 5 social media captions for a real or imagined small business. Tell AI your platform, audience, and tone. Notice how fast content creation becomes.\n\nDay 18 — Make a Presentation Outline: Pick a topic you know something about. Ask: \"Help me create a 5-minute presentation on [topic] for an audience of [describe]. Give me an outline with talking points for each section.\"\n\nDay 19 — Brainstorm Business Ideas: Ask: \"Based on my skills in [your skills] and my interests in [your interests], what are 10 possible small business or side hustle ideas I could realistically start? For each one, tell me the first step.\"\n\nDay 20 — Design Something With Canva: Go back to Canva and make something real — a flyer, a social media graphic, a birthday card. Use AI text and image tools. Share it with someone.\n\nDay 21 — Week 3 Reflection: What surprised you about AI's creative abilities? What felt missing or flat that you had to add yourself? Where's the line between AI's output and your own creativity?",
        },
        {
          heading: 'Week 4: Work and Money Applications (Days 22–30)',
          body: "Day 22 — Update Your Resume: Use this prompt: \"Here is my current job history [paste it]. Rewrite these as strong resume bullets that highlight accomplishments and use active verbs.\" Edit the results until they're accurate.\n\nDay 23 — Write a Cover Letter: Pick a real job posting you're interested in. Ask: \"Write a cover letter for this job [paste description] using this background: [paste your relevant experience]. Under 300 words. Don't make it sound generic.\"\n\nDay 24 — Prepare for a Hard Money Conversation: Ask AI to help you prepare for negotiating a bill, asking for a raise, or disputing a charge: \"I need to negotiate [situation]. What's the best approach and how do I respond if they say no?\"\n\nDay 25 — Research a Career Move: Ask: \"What careers are growing in demand in [your field or city]? What skills would I need to transition into [a role you're curious about]? How long would it realistically take?\"\n\nDay 26 — Build a 90-Day Learning Plan: Ask: \"Create a 90-day learning plan to build skills in [area]. I can commit [X hours per week]. Include free resources and specific things to practice each week.\"\n\nDay 27 — Apply AI to Real Work: Use AI directly on something from your actual job — drafting a report, summarizing meeting notes, writing a proposal, planning a project. Compare the time versus doing it without AI.\n\nDay 28 — Teach It to Someone Else: Find one person — a family member, coworker, or friend — and show them one thing AI can do that would help them. Walk them through it. Teaching is the best way to consolidate your own learning.\n\nDay 29 — Review Your Month: Go through your notes from the past 30 days. What are the three most valuable ways you used AI? What do you wish you'd started doing sooner?\n\nDay 30 — Set Your Next 90-Day Goals: Ask: \"Based on these goals I have for the next 90 days [list them], how can I use AI tools to help me make faster progress on each one? Be specific.\" You now have a personalized roadmap.",
        },
      ],
      keyTakeaways: [
        '10–15 minutes a day is all it takes — consistency over 30 days builds more confidence than a one-time crash course.',
        "Week 1 is about comfort, not performance. Getting past the awkwardness is the whole goal.",
        "The reflection prompts at the end of each week are the most important part — don't skip them.",
        "Week 2's practical tasks are where most people have their first real \"wow\" moment — especially document understanding and conversation practice.",
        'Creative uses in Week 3 often surprise people the most — AI is better at brainstorming and content creation than most expect.',
        "By Day 28, you should be teaching someone else. That's how you know you've actually learned it.",
        "The goal isn't to finish the challenge — it's to build a habit that continues after Day 30.",
      ],
    },
  },
  {
    id: '6',
    slug: 'ai-for-churches-nonprofits',
    title: 'AI for Churches & Nonprofits',
    description:
      'Specifically designed for faith communities and nonprofits. Includes prompts for bulletins, fundraising appeals, volunteer recruitment, and community outreach. Free to use and share.',
    format: 'PDF',
    pages: '14 pages',
    downloadUrl: '/resources/ai-for-churches-nonprofits',
    emoji: '⛪',
    accent: '#DB2777',
    emailGated: false,
    thumbnail: '/images/resources/churches.svg',
    content: {
      intro:
        "Churches and nonprofits are doing some of the most important work in our communities — and they're almost always doing it with too few people and too little time. This guide was written specifically for faith communities and mission-driven organizations, because the people running these organizations deserve the same tools as anyone else, and those tools should be explained in a way that fits their context.",
      sections: [
        {
          heading: 'Why This Guide Exists',
          body: "When AI started becoming a big topic, most of the guides, tutorials, and workshops were aimed at tech companies, marketers, and business people. The pastors writing Sunday bulletins at midnight, the nonprofit coordinators drafting grant applications in their living rooms after their day jobs, the church secretary managing five ministries by herself — none of those guides were written for them.\n\nThis one is.\n\nThe people running faith communities and small nonprofits are often working on shoestring budgets, wearing multiple hats, and spending enormous amounts of time on administrative and communication tasks that AI can handle in minutes. A church with 80 members shouldn't have to choose between good communication and the pastor's sermon preparation time. A nonprofit shouldn't have to pass on a grant because no one had the bandwidth to write the application.\n\nAI doesn't change your mission. It doesn't write your theology or replace your relationships. But it can take the newsletter that takes three hours down to forty-five minutes, help your volunteer coordinator draft a recruitment email that actually gets responses, and give your grant writer a first draft worth editing instead of a blank page to fill. That's what this guide is for.",
        },
        {
          heading: 'Writing Announcements, Bulletins, and Newsletters',
          body: "The weekly bulletin or newsletter is one of the most time-consuming communication tasks for any church or nonprofit. AI can handle the drafting quickly — you just need to supply the details and add the personal touches that only your community knows.\n\nFor Sunday bulletins: \"Write a church bulletin announcement for [event name] happening [date/time/location]. Include who it's for, what people should bring or know, and a warm closing sentence. Our church is [brief description of your community].\"\n\nFor monthly newsletters: \"Help me write a 300-word newsletter update for our [church/nonprofit] called [name]. This month's highlights include: [list 3–5 things that happened or are coming up]. Write it in a warm, community-focused tone. Include one paragraph about our mission and one call to action for [donation / volunteering / event attendance].\"\n\nFor sermon summaries: \"Here are my notes from this week's sermon: [paste notes or key points]. Write a 150-word summary I can include in the bulletin or post on our website. Keep the theological language accurate but accessible to people who weren't there.\"\n\nOne important note: always read the AI-generated content carefully before distributing it. AI doesn't know your specific community, your pastor's voice, or your theological tradition. Use it as a first draft and make it your own. Five minutes of editing after AI writes the draft beats two hours of writing from scratch.",
        },
        {
          heading: 'Planning Events and Creating Agendas',
          body: "Event planning is one of the most draining parts of church and nonprofit life. AI can help you think through logistics you might miss and create professional-looking agendas, timelines, and checklists in minutes.\n\nFor event planning: \"I'm planning [type of event] for approximately [number] people. The event is on [date] at [location]. Our budget is approximately [budget]. Help me create a complete planning checklist with tasks organized by how far in advance they need to be done.\"\n\nFor creating a run-of-show: \"Create a detailed agenda for [event]. It runs from [start time] to [end time]. The segments are: [list what you know]. Fill in timing for each segment and note any transitions or logistics. Make it easy for volunteers to follow.\"\n\nFor volunteer briefings: \"Write a one-page volunteer briefing for [event]. Volunteers need to know: what the event is, their specific roles, arrival time, what to do if something goes wrong, and who to contact. We have [number] volunteers serving in these roles: [list roles].\"\n\nFor post-event follow-up: \"Write a thank-you message to send to everyone who attended [event]. Mention what the event accomplished, express genuine gratitude, and give them one next step they can take [donate / sign up for next event / join a ministry team]. Keep it under 150 words and warm.\"",
        },
        {
          heading: 'Grant Writing Assistance',
          body: "Grant writing is one of the most skill-intensive tasks in the nonprofit world, and many smaller organizations miss out on funding simply because they don't have a dedicated grant writer. AI won't write a perfect grant application, but it can do something almost as valuable: give you a strong first draft that an experienced person can refine.\n\nGetting started with a grant narrative: \"I'm writing a grant application for [foundation/grant name]. The grant supports [what it funds]. Our nonprofit is [name], our mission is [mission statement], and we're applying for funding to [describe the specific program or need]. Write a 500-word grant narrative covering: the problem we're addressing, our approach, our expected outcomes, and why our organization is qualified.\"\n\nFor needs statements: \"Help me write a compelling needs statement for a grant application. The problem we're addressing is [describe]. The people we serve are [describe community]. Here are facts and statistics I have: [any data you know]. Make the case for why this problem is urgent.\"\n\nFor evaluation plans: \"Our grant requires an evaluation plan. Our program is [describe]. Help me write a simple evaluation plan explaining how we'll measure success, how we'll collect data, and how we'll report results.\"\n\nCritical reminder: Grant applications are documents submitted to institutions that will verify your claims. Never include statistics, outcomes, or descriptions of your work that aren't accurate. AI is your drafting assistant — the accuracy and authenticity are your responsibility.",
        },
        {
          heading: 'Volunteer Communication and Recruitment',
          body: "Volunteer recruitment and retention is a constant challenge for churches and nonprofits. People want to serve, but they often don't know what's available, what's expected, or why their involvement matters. AI can help you communicate all of that more clearly.\n\nFor recruitment emails: \"Write a volunteer recruitment email for [specific role or program]. Include: what the role involves, time commitment, who we're looking for, and why it matters to our community. Our organization is [describe]. Make it warm and specific — not generic. We want people to feel personally invited.\"\n\nFor role descriptions: \"Write a clear, friendly volunteer role description for [role]. Include: responsibilities, time commitment, skills needed, training provided, and who to contact. Keep it under 200 words and make it sound like a real opportunity, not a job listing.\"\n\nFor thank-you and appreciation: \"Write a heartfelt thank-you message for our volunteers after [event or program]. Mention [specific things they did]. Don't make it sound like a form letter — make it feel personal and specific.\"\n\nThe biggest mistake organizations make in volunteer communication is making it feel like a transaction. The most effective volunteer communication makes people feel like they're part of something meaningful. Use AI to draft the structure, then add specific examples of impact that only you know about.",
        },
        {
          heading: 'Staying Ethical and Authentic',
          body: "Using AI in your church or nonprofit raises real questions about authenticity, and those questions are worth taking seriously. Your community trusts you because of your genuine care and your real relationship with them. AI should support that authenticity, not undermine it.\n\nThe rule to follow: AI writes drafts, you add soul. A bulletin announcement drafted by AI is fine as long as you read it, edit it to sound like your community, and add the personal detail that makes it real. A grant application drafted with AI is legitimate as long as every fact in it is true and you're fully prepared to stand behind what it says.\n\nWhat AI cannot do for your organization: It cannot replace pastoral care. It cannot build the trust that comes from showing up for your community over years. It cannot pray, grieve, celebrate, or be present in the ways that make faith communities irreplaceable. The entire value of your organization is relational and spiritual. AI handles the paperwork so you can focus on the things only you can do.\n\nA final word: Many communities have concerns about technology, and those concerns deserve respect and conversation. If you're introducing AI tools to your organization, do it openly — explain what it is, how you're using it, and how you're ensuring quality and authenticity. People are more receptive than you might expect, especially when they see that AI is freeing up their pastor or director to spend more time with them, not less.",
        },
      ],
      keyTakeaways: [
        'AI can dramatically reduce the time church and nonprofit staff spend on writing — freeing them for relational and mission-critical work.',
        'For bulletins and announcements, give AI the specific details and let it draft. Spend 5 minutes editing to match your voice — still faster than writing from scratch.',
        'Grant writing assistance is one of the highest-value uses of AI for nonprofits — AI drafts, you refine, but every fact must be accurate and verifiable.',
        'Volunteer recruitment messages written with AI should always include specific, personal details about impact that only your organization knows.',
        'AI is a drafting tool, not a replacement for genuine community relationships — use it for paperwork so you can spend more time on people.',
        'Be transparent about AI use if asked, and ensure accuracy on anything submitted to funders or official bodies.',
        'This guide is free to share — send it to every pastor, nonprofit coordinator, and church volunteer you know.',
      ],
    },
  },
]
