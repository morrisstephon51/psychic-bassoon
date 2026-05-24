import { create } from 'zustand'
import type { Job, QueueStats } from '../types'

interface QueueStore {
  jobs: Map<string, Job>
  stats: QueueStats
  setJob: (job: Job) => void
  setStats: (stats: QueueStats) => void
  updateJobStatus: (id: string, status: Job['status'], error?: string) => void
}

export const useQueueStore = create<QueueStore>((set) => ({
  jobs: new Map(),
  stats: {},

  setJob: (job) =>
    set((state) => {
      const next = new Map(state.jobs)
      next.set(job.id, job)
      return { jobs: next }
    }),

  setStats: (stats) => set({ stats }),

  updateJobStatus: (id, status, error) =>
    set((state) => {
      const job = state.jobs.get(id)
      if (!job) return state
      const next = new Map(state.jobs)
      next.set(id, { ...job, status, error: error ?? job.error })
      return { jobs: next }
    }),
}))
