import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
}

interface NotificationStore {
  notifications: Notification[]
  add: (n: Omit<Notification, 'id'>) => void
  remove: (id: string) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  add: (n) => {
    const id = uuid()
    const notification: Notification = { ...n, id, duration: n.duration ?? 4000 }
    set((state) => ({ notifications: [...state.notifications, notification] }))
    setTimeout(() => set((state) => ({
      notifications: state.notifications.filter((x) => x.id !== id),
    })), notification.duration)
  },

  remove: (id) =>
    set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
}))
