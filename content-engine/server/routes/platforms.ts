import { Router } from 'express'
import { listPlatforms, updatePlatform } from '../models/platform.js'

const router = Router()

router.get('/', (req, res) => {
  res.json(listPlatforms())
})

router.put('/:name', (req, res) => {
  const { enabled, credentials, rateLimitRpm } = req.body
  const updated = updatePlatform(req.params.name, { enabled, credentials, rateLimitRpm })
  if (!updated) return res.status(404).json({ error: 'Platform not found' })
  res.json(updated)
})

export default router
