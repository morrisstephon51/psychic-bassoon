import { useEffect, useRef } from 'react'

type SSEHandler<T = unknown> = (data: T) => void

interface SSESubscription {
  event: string
  handler: SSEHandler
}

let eventSource: EventSource | null = null
const subscriptions = new Map<string, Set<SSEHandler>>()
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null
let reconnectDelay = 1000

function connect() {
  if (eventSource?.readyState === EventSource.OPEN) return

  eventSource = new EventSource('/api/sse/events')

  eventSource.onopen = () => {
    reconnectDelay = 1000
    console.debug('[SSE] connected')
  }

  eventSource.onerror = () => {
    eventSource?.close()
    eventSource = null
    if (reconnectTimeout) clearTimeout(reconnectTimeout)
    reconnectTimeout = setTimeout(() => {
      reconnectDelay = Math.min(reconnectDelay * 2, 30_000)
      connect()
    }, reconnectDelay)
  }

  // Route named events to subscribers
  const allEvents = [
    'connected', 'job:start', 'job:complete', 'job:failed',
    'video:progress', 'video:complete', 'video:error',
    'content:generating', 'content:ready', 'content:error',
    'plan:generating', 'plan:ready', 'plan:error',
    'publish:start', 'publish:success', 'publish:error',
    'scheduler:plan_created',
  ]

  for (const event of allEvents) {
    eventSource.addEventListener(event, (e: MessageEvent) => {
      const handlers = subscriptions.get(event)
      if (!handlers) return
      try {
        const data = JSON.parse(e.data)
        for (const handler of handlers) handler(data)
      } catch { /* ignore parse errors */ }
    })
  }
}

export function subscribe<T = unknown>(event: string, handler: SSEHandler<T>): () => void {
  if (!subscriptions.has(event)) subscriptions.set(event, new Set())
  subscriptions.get(event)!.add(handler as SSEHandler)
  connect()

  return () => {
    subscriptions.get(event)?.delete(handler as SSEHandler)
  }
}

export function useSSE<T = unknown>(event: string, handler: SSEHandler<T>): void {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    const unsubscribe = subscribe<T>(event, (data) => handlerRef.current(data))
    return unsubscribe
  }, [event])
}
