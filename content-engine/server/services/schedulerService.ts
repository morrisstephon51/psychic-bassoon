import cron from 'node-cron'
import { config } from '../config/index.js'
import { logger } from '../lib/logger.js'
import { broadcast } from '../lib/sse.js'
import { createWeeklyPlan } from './contentPlanService.js'
import { publishContentItem } from './social/index.js'
import { getScheduledItems } from '../models/contentItem.js'
import { enqueue } from '../lib/queue.js'

let plannerTask: cron.ScheduledTask | null = null
let publisherTask: cron.ScheduledTask | null = null

export function startScheduler(): void {
  // Daily plan generation
  plannerTask = cron.schedule(config.dailySchedule, async () => {
    logger.info('Scheduler: running daily content plan generation')
    try {
      const planId = await createWeeklyPlan()
      broadcast('scheduler:plan_created', { planId })
    } catch (err) {
      logger.error('Scheduler plan generation failed:', err)
    }
  })

  // Check for scheduled posts every minute
  publisherTask = cron.schedule('* * * * *', async () => {
    const now = new Date().toISOString()
    const items = getScheduledItems(now)

    for (const item of items) {
      logger.info(`Scheduler: enqueuing publish job for ${item.id} on ${item.platform}`)
      enqueue('publish_content', { contentItemId: item.id }, { priority: 10 })
    }
  })

  logger.info(`Scheduler started. Daily plan: "${config.dailySchedule}"`)
}

export function stopScheduler(): void {
  plannerTask?.stop()
  publisherTask?.stop()
  logger.info('Scheduler stopped')
}

export function triggerManualPlan(options: { theme?: string; platforms?: string[] } = {}): Promise<string> {
  logger.info('Manual plan trigger requested')
  return createWeeklyPlan(options)
}
