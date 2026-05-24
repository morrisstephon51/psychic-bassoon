import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { config } from './config/index.js'
import { logger } from './lib/logger.js'
import { runMigrations } from './db/schema.js'
import { startQueueWorker } from './workers/queueWorker.js'
import { startScheduler } from './services/schedulerService.js'

import sseRouter from './routes/sse.js'
import brandRouter from './routes/brand.js'
import contentPlanRouter from './routes/contentPlan.js'
import contentRouter from './routes/content.js'
import queueRouter from './routes/queue.js'
import platformsRouter from './routes/platforms.js'
import scheduleRouter from './routes/schedule.js'

const app = express()

// Ensure required directories exist
for (const dir of [config.tempDir, config.assetsDir, 'logs', 'data',
  path.join(config.assetsDir, 'videos'),
  path.join(config.assetsDir, 'thumbnails')]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

// Initialize DB
runMigrations()

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }))
app.use(express.json({ limit: '10mb' }))
app.use('/assets', express.static(config.assetsDir))

// Routes
app.use('/api/sse', sseRouter)
app.use('/api/brand', brandRouter)
app.use('/api/plans', contentPlanRouter)
app.use('/api/content', contentRouter)
app.use('/api/queue', queueRouter)
app.use('/api/platforms', platformsRouter)
app.use('/api/schedule', scheduleRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

// Start workers
startQueueWorker(2000)
startScheduler()

// Start server
app.listen(config.port, () => {
  logger.info(`Content Engine server running on http://localhost:${config.port}`)
  logger.info(`Environment: ${config.nodeEnv}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down')
  process.exit(0)
})
