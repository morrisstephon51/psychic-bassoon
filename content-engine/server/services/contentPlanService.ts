import { logger } from '../lib/logger.js'
import { broadcast } from '../lib/sse.js'
import { generateContentPlan } from '../lib/claude.js'
import { createContentPlan, updateContentPlan, getContentPlan } from '../models/contentPlan.js'
import { createContentItem } from '../models/contentItem.js'
import { ensureDefaultBrand } from '../models/brand.js'
import { enabledPlatforms } from '../models/platform.js'
import { enqueue } from '../lib/queue.js'

export async function createWeeklyPlan(options: {
  theme?: string
  platforms?: string[]
  weekStart?: string
} = {}): Promise<string> {
  const brand = ensureDefaultBrand()

  const platforms = options.platforms ?? enabledPlatforms().map((p) => p.name)
  if (platforms.length === 0) {
    throw new Error('No platforms enabled. Enable at least one platform in Settings.')
  }

  const weekStart = options.weekStart ?? getWeekStart()

  const plan = createContentPlan({
    brandId: brand.id,
    weekStart,
    theme: options.theme,
    platforms,
  })

  broadcast('plan:generating', { planId: plan.id })
  updateContentPlan(plan.id, { status: 'generating' })

  try {
    const result = await generateContentPlan({
      brandName: brand.name,
      niche: brand.niche,
      voice: brand.voice,
      hashtags: brand.hashtags,
      platforms,
      theme: options.theme,
      weekStart,
    })

    updateContentPlan(plan.id, {
      theme: result.theme,
      status: 'ready',
      rawPlan: result as unknown as Record<string, unknown>,
    })

    // Create content items for each post in the plan
    const scheduledDates = distributeSchedule(weekStart, result.posts.length)

    for (let i = 0; i < result.posts.length; i++) {
      const post = result.posts[i]
      const contentItem = createContentItem({
        planId: plan.id,
        brandId: brand.id,
        type: post.type,
        platform: post.platform,
        title: post.title,
        caption: post.caption,
        hashtags: post.hashtags,
        script: post.script,
        scheduledAt: scheduledDates[i],
        metadata: { hook: post.hook, cta: post.cta },
      })

      // Enqueue generation job
      if (post.type === 'video_reel') {
        enqueue('build_video', {
          contentItemId: contentItem.id,
          topic: post.title,
          hook: post.hook ?? '',
        }, { priority: 1 })
      } else {
        enqueue('build_text_post', {
          contentItemId: contentItem.id,
          topic: post.title,
        }, { priority: 0 })
      }
    }

    broadcast('plan:ready', { planId: plan.id, theme: result.theme, postCount: result.posts.length })
    logger.info(`Weekly plan created: ${plan.id} theme="${result.theme}" posts=${result.posts.length}`)
    return plan.id

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    updateContentPlan(plan.id, { status: 'failed' })
    broadcast('plan:error', { planId: plan.id, error: msg })
    throw error
  }
}

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))
  return monday.toISOString().split('T')[0]
}

function distributeSchedule(weekStart: string, count: number): string[] {
  const dates: string[] = []
  const start = new Date(weekStart)

  for (let i = 0; i < count; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + (i % 7))
    d.setHours(9 + Math.floor(i / 7) * 3, 0, 0, 0)
    dates.push(d.toISOString())
  }

  return dates
}
