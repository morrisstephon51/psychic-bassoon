import { dequeue, completeJob, failJob } from '../lib/queue.js'
import { broadcast } from '../lib/sse.js'
import { logger } from '../lib/logger.js'
import { buildVideoReel } from '../services/videoReelService.js'
import { buildTextPost } from '../services/textPostService.js'
import { publishContentItem } from '../services/social/index.js'

let running = false
let interval: NodeJS.Timeout | null = null

export function startQueueWorker(pollInterval = 2000): void {
  if (running) return
  running = true

  interval = setInterval(async () => {
    if (!running) return

    const job = dequeue()
    if (!job) return

    broadcast('job:start', { jobId: job.id, type: job.type })
    logger.debug(`Processing job ${job.id} type=${job.type}`)

    try {
      let result: Record<string, unknown> = {}

      switch (job.type) {
        case 'build_video': {
          const { contentItemId, topic, hook } = job.payload as { contentItemId: string; topic: string; hook: string }
          const mediaPath = await buildVideoReel({ contentItemId, topic, hook })
          result = { mediaPath }
          break
        }

        case 'build_text_post': {
          const { contentItemId, topic } = job.payload as { contentItemId: string; topic: string }
          await buildTextPost(contentItemId, topic)
          result = { contentItemId }
          break
        }

        case 'publish_content': {
          const { contentItemId } = job.payload as { contentItemId: string }
          const postResult = await publishContentItem(contentItemId)
          result = postResult
          break
        }

        default:
          throw new Error(`Unknown job type: ${job.type}`)
      }

      completeJob(job.id, result)
      broadcast('job:complete', { jobId: job.id, type: job.type, result })
      logger.info(`Job ${job.id} complete`)

    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      failJob(job.id, msg)
      broadcast('job:failed', { jobId: job.id, type: job.type, error: msg })
      logger.error(`Job ${job.id} failed: ${msg}`)
    }
  }, pollInterval)

  logger.info(`Queue worker started (poll interval: ${pollInterval}ms)`)
}

export function stopQueueWorker(): void {
  running = false
  if (interval) {
    clearInterval(interval)
    interval = null
  }
  logger.info('Queue worker stopped')
}
