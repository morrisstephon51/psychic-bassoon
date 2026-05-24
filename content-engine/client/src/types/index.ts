export type ContentType = 'video_reel' | 'text_post' | 'carousel' | 'story'
export type ContentStatus =
  | 'pending'
  | 'generating'
  | 'ready'
  | 'scheduled'
  | 'publishing'
  | 'published'
  | 'failed'
export type PlanStatus = 'pending' | 'generating' | 'ready' | 'publishing' | 'done' | 'failed'
export type JobStatus = 'queued' | 'processing' | 'done' | 'failed'

export interface Brand {
  id: string
  name: string
  handle: string
  niche: string
  voice: string
  hashtags: string
  colorPrimary: string
  colorSecondary: string
  logoUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface ContentItem {
  id: string
  planId: string
  brandId: string
  type: ContentType
  platform: string
  status: ContentStatus
  title: string | null
  caption: string | null
  hashtags: string | null
  script: string | null
  mediaPath: string | null
  thumbnailPath: string | null
  postId: string | null
  postUrl: string | null
  scheduledAt: string | null
  publishedAt: string | null
  error: string | null
  metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}

export interface ContentPlan {
  id: string
  brandId: string
  weekStart: string
  theme: string
  platforms: string[]
  status: PlanStatus
  rawPlan: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
  items?: ContentItem[]
}

export interface Job {
  id: string
  type: string
  status: JobStatus
  payload: Record<string, unknown>
  result: Record<string, unknown> | null
  error: string | null
  attempts: number
  maxAttempts: number
  priority: number
  createdAt: string
  updatedAt: string
  startedAt: string | null
  completedAt: string | null
}

export interface Platform {
  id: string
  name: string
  enabled: boolean
  credentials: Record<string, string> | null
  rateLimitRpm: number
  lastPostAt: string | null
  totalPosts: number
  createdAt: string
  updatedAt: string
}

export interface QueueStats {
  queued?: number
  processing?: number
  done?: number
  failed?: number
}

export interface SSEEvent<T = unknown> {
  event: string
  data: T
}

// SSE payloads
export interface VideoProgressEvent {
  contentItemId: string
  stage: string
  percent: number
}

export interface JobEvent {
  jobId: string
  type: string
  error?: string
  result?: Record<string, unknown>
}

export interface PlanEvent {
  planId: string
  theme?: string
  postCount?: number
  error?: string
}

export interface PublishEvent {
  contentItemId: string
  platform: string
  postUrl?: string
  error?: string
}
