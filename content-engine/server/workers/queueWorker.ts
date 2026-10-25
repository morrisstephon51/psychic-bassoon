import { dequeue, completeJob, failJob } from '../lib/queue.js'
import { broadcast } from '../lib/sse.js'
import { logger } from '../lib/logger.js'
import { buildVideoReel } from '../services/videoReelService.js'
import { buildTextPost } from '../services/textPostService.js'
import { publishContentItem } from '../services/social/index.js'

let running = false
let timer: ReturnType<typeof setTimeout> | null = null

async function processJob(): Promise<void> {
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
}

export function startQueueWorker(pollInterval = 2000): void {
  if (running) return
  running = true

  // Self-scheduling poll loop. The next tick is armed only AFTER the current
  // job settles (in finally), so a long-running job (e.g. a video build that
  // outlasts pollInterval) can never overlap with the next one. The previous
  // implementation used setInterval() with an async callback — setInterval does
  // NOT await the callback, so under a backlog overlapping ticks each dequeued
  // and processed a different job concurrently, defeating the intended
  // one-job-at-a-time worker and spiking CPU/memory (e.g. parallel ffmpeg).
  const tick = async (): Promise<void> => {
    if (!running) return
    try {
      await processJob()
    } catch (error) {
      // Defensive: never let an unexpected error (e.g. a dequeue DB failure)
      // kill the poll loop — mirror setInterval's keep-going behaviour.
      const msg = error instanceof Error ? error.message : String(error)
      logger.error(`Queue worker tick error: ${msg}`)
    } finally {
      if (running) timer = setTimeout(tick, pollInterval)
    }
  }

  timer = setTimeout(tick, pollInterval)
  logger.info(`Queue worker started (poll interval: ${pollInterval}ms)`)
}

export function stopQueueWorker(): void {
  running = false
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  logger.info('Queue worker stopped')
}
