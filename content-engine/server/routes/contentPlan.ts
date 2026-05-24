import { Router } from 'express'
import { listContentPlans, getContentPlan } from '../models/contentPlan.js'
import { createWeeklyPlan } from '../services/contentPlanService.js'
import { listContentItems } from '../models/contentItem.js'

const router = Router()

router.get('/', (req, res) => {
  const plans = listContentPlans()
  res.json(plans)
})

router.post('/generate', async (req, res) => {
  try {
    const { theme, platforms, weekStart } = req.body
    const planId = await createWeeklyPlan({ theme, platforms, weekStart })
    res.json({ planId })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    res.status(500).json({ error: msg })
  }
})

router.get('/:id', (req, res) => {
  const plan = getContentPlan(req.params.id)
  if (!plan) return res.status(404).json({ error: 'Plan not found' })

  const items = listContentItems({ planId: req.params.id })
  res.json({ ...plan, items })
})

export default router
