import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { registerSSEClient, clientCount } from '../lib/sse.js'

const router = Router()

router.get('/events', (req, res) => {
  const clientId = uuid()
  registerSSEClient(clientId, res)
  res.write(`event: connected\ndata: ${JSON.stringify({ clientId, clients: clientCount() })}\n\n`)
})

export default router
