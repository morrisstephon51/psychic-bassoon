import { Router } from 'express'
import { listJobs, getJob, queueStats } from '../lib/queue.js'

const router = Router()

router.get('/', (req, res) => {
  const { status, limit } = req.query
  const jobs = listJobs(status as string | undefined, limit ? Number(limit) : 50)
  res.json(jobs)
})

router.get('/stats', (req, res) => {
  res.json(queueStats())
})

router.get('/:id', (req, res) => {
  const job = getJob(req.params.id)
  if (!job) return res.status(404).json({ error: 'Not found' })
  res.json(job)
})

export default router
