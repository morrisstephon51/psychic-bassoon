import { Router } from 'express'
import { listContentItems, getContentItem, updateContentItem } from '../models/contentItem.js'
import { publishContentItem } from '../services/social/index.js'
import { enqueue } from '../lib/queue.js'

const router = Router()

router.get('/', (req, res) => {
  const { status, platform, planId, limit } = req.query
  const items = listContentItems({
    status: status as string | undefined,
    platform: platform as string | undefined,
    planId: planId as string | undefined,
    limit: limit ? Number(limit) : undefined,
  } as Parameters<typeof listContentItems>[0])
  res.json(items)
})

router.get('/:id', (req, res) => {
  const item = getContentItem(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

router.post('/:id/publish', async (req, res) => {
  try {
    const result = await publishContentItem(req.params.id)
    res.json(result)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    res.status(500).json({ error: msg })
  }
})

router.post('/:id/schedule', (req, res) => {
  const { scheduledAt } = req.body
  if (!scheduledAt) return res.status(400).json({ error: 'scheduledAt required' })

  const updated = updateContentItem(req.params.id, { status: 'scheduled', scheduledAt })
  if (!updated) return res.status(404).json({ error: 'Not found' })
  res.json(updated)
})

router.post('/:id/regenerate', (req, res) => {
  const item = getContentItem(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })

  updateContentItem(item.id, { status: 'pending', error: null })

  if (item.type === 'video_reel') {
    enqueue('build_video', { contentItemId: item.id, topic: item.title ?? '', hook: '' }, { priority: 5 })
  } else {
    enqueue('build_text_post', { contentItemId: item.id, topic: item.title ?? '' }, { priority: 3 })
  }

  res.json({ queued: true })
})

export default router
