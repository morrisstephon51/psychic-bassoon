import axios from 'axios'
import type { Brand, ContentItem, ContentPlan, Job, Platform, QueueStats } from '../types'

const api = axios.create({ baseURL: '/api' })

// Brand
export const getBrand = () => api.get<Brand>('/brand').then((r) => r.data)
export const updateBrand = (data: Partial<Brand>) => api.put<Brand>('/brand', data).then((r) => r.data)

// Content Plans
export const getPlans = () => api.get<ContentPlan[]>('/plans').then((r) => r.data)
export const getPlan = (id: string) => api.get<ContentPlan>(`/plans/${id}`).then((r) => r.data)
export const generatePlan = (data: { theme?: string; platforms?: string[]; weekStart?: string }) =>
  api.post<{ planId: string }>('/plans/generate', data).then((r) => r.data)

// Content Items
export const getContent = (params?: {
  status?: string
  platform?: string
  planId?: string
  limit?: number
}) => api.get<ContentItem[]>('/content', { params }).then((r) => r.data)

export const getContentItem = (id: string) =>
  api.get<ContentItem>(`/content/${id}`).then((r) => r.data)

export const publishContent = (id: string) =>
  api.post<{ postId: string; postUrl: string }>(`/content/${id}/publish`).then((r) => r.data)

export const scheduleContent = (id: string, scheduledAt: string) =>
  api.post<ContentItem>(`/content/${id}/schedule`, { scheduledAt }).then((r) => r.data)

export const regenerateContent = (id: string) =>
  api.post<{ queued: boolean }>(`/content/${id}/regenerate`).then((r) => r.data)

// Queue
export const getJobs = (params?: { status?: string; limit?: number }) =>
  api.get<Job[]>('/queue', { params }).then((r) => r.data)

export const getQueueStats = () => api.get<QueueStats>('/queue/stats').then((r) => r.data)

// Platforms
export const getPlatforms = () => api.get<Platform[]>('/platforms').then((r) => r.data)
export const updatePlatform = (name: string, data: Partial<Platform>) =>
  api.put<Platform>(`/platforms/${name}`, data).then((r) => r.data)

// Schedule
export const getSchedule = (params?: { from?: string; to?: string }) =>
  api.get<ContentItem[]>('/schedule', { params }).then((r) => r.data)

export const triggerPlan = (data?: { theme?: string; platforms?: string[] }) =>
  api.post<{ planId: string }>('/schedule/trigger', data ?? {}).then((r) => r.data)

// Health
export const getHealth = () =>
  api.get<{ status: string; uptime: number }>('/health').then((r) => r.data)
