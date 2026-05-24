import Anthropic from '@anthropic-ai/sdk'
import { config } from '../config/index.js'
import { logger } from './logger.js'

let _client: Anthropic | null = null

export function getClaudeClient(): Anthropic {
  if (!_client) _client = new Anthropic({ apiKey: config.anthropicApiKey })
  return _client
}

export interface ContentPlanResult {
  theme: string
  posts: ContentPostSpec[]
}

export interface ContentPostSpec {
  platform: string
  type: 'video_reel' | 'text_post' | 'carousel' | 'story'
  title: string
  caption: string
  hashtags: string
  script?: string
  hook?: string
  cta?: string
}

export async function generateContentPlan(params: {
  brandName: string
  niche: string
  voice: string
  hashtags: string
  platforms: string[]
  theme?: string
  weekStart: string
}): Promise<ContentPlanResult> {
  const client = getClaudeClient()

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 4096,
    tools: [
      {
        name: 'create_content_plan',
        description: 'Create a structured weekly content plan for social media',
        input_schema: {
          type: 'object' as const,
          properties: {
            theme: { type: 'string', description: 'Overarching theme for the week' },
            posts: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  platform: { type: 'string' },
                  type: { type: 'string', enum: ['video_reel', 'text_post', 'carousel', 'story'] },
                  title: { type: 'string' },
                  caption: { type: 'string', description: 'Full post caption with emojis, max 2200 chars' },
                  hashtags: { type: 'string', description: 'Space-separated hashtags' },
                  script: { type: 'string', description: 'For video_reel: full narration script' },
                  hook: { type: 'string', description: 'First 3 seconds hook line for video' },
                  cta: { type: 'string', description: 'Call-to-action at end' },
                },
                required: ['platform', 'type', 'title', 'caption', 'hashtags'],
              },
            },
          },
          required: ['theme', 'posts'],
        },
      },
    ],
    tool_choice: { type: 'tool', name: 'create_content_plan' },
    messages: [
      {
        role: 'user',
        content: `You are a viral content strategist for "${params.brandName}" — ${params.niche}.
Brand voice: ${params.voice}
Default hashtags: ${params.hashtags}
Week of: ${params.weekStart}
Platforms: ${params.platforms.join(', ')}
${params.theme ? `Theme requested: ${params.theme}` : ''}

Create a weekly content plan with 1-2 posts per platform.
- Video reels: include a punchy hook, full narration script (60-90 seconds), and strong CTA
- Text posts: conversational, value-packed, story-driven
- Captions should feel authentic and community-first, not corporate
- Mix educational tips, community spotlights, and engagement prompts
- All content should be beginner-friendly and empowering`,
      },
    ],
  })

  const toolUse = response.content.find((b) => b.type === 'tool_use')
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('Claude did not return tool_use block for content plan')
  }

  logger.debug(`Content plan generated: theme="${(toolUse.input as ContentPlanResult).theme}"`)
  return toolUse.input as ContentPlanResult
}

export async function generateCaption(params: {
  platform: string
  topic: string
  brandName: string
  voice: string
  hashtags: string
}): Promise<{ caption: string; hashtags: string }> {
  const client = getClaudeClient()

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    tools: [
      {
        name: 'create_caption',
        description: 'Create an optimized social media caption',
        input_schema: {
          type: 'object' as const,
          properties: {
            caption: { type: 'string' },
            hashtags: { type: 'string' },
          },
          required: ['caption', 'hashtags'],
        },
      },
    ],
    tool_choice: { type: 'tool', name: 'create_caption' },
    messages: [
      {
        role: 'user',
        content: `Write a ${params.platform} caption for "${params.topic}".
Brand: ${params.brandName}. Voice: ${params.voice}.
Hashtags to include: ${params.hashtags}
Keep it authentic, value-packed, and community-first.`,
      },
    ],
  })

  const toolUse = response.content.find((b) => b.type === 'tool_use')
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('Claude did not return tool_use for caption')
  }

  return toolUse.input as { caption: string; hashtags: string }
}

export async function generateVideoScript(params: {
  topic: string
  hook: string
  brandName: string
  voice: string
  durationSeconds?: number
}): Promise<{ hook: string; body: string; cta: string; fullScript: string; sceneDescriptions: string[] }> {
  const client = getClaudeClient()
  const duration = params.durationSeconds ?? 60

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 2048,
    tools: [
      {
        name: 'create_video_script',
        description: 'Create a structured video reel script',
        input_schema: {
          type: 'object' as const,
          properties: {
            hook: { type: 'string', description: 'Attention-grabbing opening line (first 3 seconds)' },
            body: { type: 'string', description: 'Main content narration' },
            cta: { type: 'string', description: 'Call to action at end' },
            fullScript: { type: 'string', description: 'Complete narration for TTS' },
            sceneDescriptions: {
              type: 'array',
              items: { type: 'string' },
              description: 'Visual descriptions for each scene (used for image generation)',
            },
          },
          required: ['hook', 'body', 'cta', 'fullScript', 'sceneDescriptions'],
        },
      },
    ],
    tool_choice: { type: 'tool', name: 'create_video_script' },
    messages: [
      {
        role: 'user',
        content: `Write a ${duration}-second video reel script for "${params.topic}".
Brand: ${params.brandName}. Voice: ${params.voice}.
Hook provided: "${params.hook}"

Create:
1. A punchy 3-second hook
2. 45-50 second educational body (beginner-friendly)
3. 10-second CTA
4. Full concatenated script for TTS voice generation
5. 4-6 scene descriptions for background image generation (describe visuals, NOT people)`,
      },
    ],
  })

  const toolUse = response.content.find((b) => b.type === 'tool_use')
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('Claude did not return tool_use for video script')
  }

  return toolUse.input as ReturnType<typeof generateVideoScript> extends Promise<infer T> ? T : never
}
