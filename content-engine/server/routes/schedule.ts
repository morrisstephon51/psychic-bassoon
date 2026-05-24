import { Router } from 'express'
import { triggerManualPlan } from '../services/schedulerService.js'
import { listContentItems } from '../models/contentItem.js'

const router = Router()

router.get('/', (req, res) => {
  const { from, to } = req.query
  const items = listContentItems({ status: 'scheduled', limit: 200 })

  const filtered = items.filter((item) => {
    if (!item.scheduledAt) return false
    if (from && item.scheduledAt < (from as string)) return false
    if (to && item.scheduledAt > (to as string)) return false
    return true
  })

  res.json(filtered)
})

router.post('/trigger', async (req, res) => {
  try {
    const { theme, platforms } = req.body
    const planId = await triggerManualPlan({ theme, platforms })
    res.json({ planId })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    res.status(500).json({ error: msg })
  }
})

export default router
