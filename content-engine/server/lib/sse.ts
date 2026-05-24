import type { Response } from 'express'
import { logger } from './logger.js'

interface SSEClient {
  id: string
  res: Response
}

const clients = new Map<string, SSEClient>()

export function registerSSEClient(id: string, res: Response): void {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')
  res.flushHeaders()

  clients.set(id, { id, res })
  logger.debug(`SSE client connected: ${id} (total: ${clients.size})`)

  // Heartbeat every 15s to keep connection alive
  const heartbeat = setInterval(() => {
    try {
      res.write(':heartbeat\n\n')
    } catch {
      clearInterval(heartbeat)
      clients.delete(id)
    }
  }, 15_000)

  res.on('close', () => {
    clearInterval(heartbeat)
    clients.delete(id)
    logger.debug(`SSE client disconnected: ${id} (total: ${clients.size})`)
  })
}

export function broadcast(event: string, data: unknown): void {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
  for (const client of clients.values()) {
    try {
      client.res.write(payload)
    } catch {
      clients.delete(client.id)
    }
  }
}

export function sendToClient(clientId: string, event: string, data: unknown): boolean {
  const client = clients.get(clientId)
  if (!client) return false
  try {
    client.res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
    return true
  } catch {
    clients.delete(clientId)
    return false
  }
}

export function clientCount(): number {
  return clients.size
}
