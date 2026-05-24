import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useNotificationStore } from '../../store/notificationStore'
import type { NotificationType } from '../../store/notificationStore'
import { cn } from '../../lib/utils'

const icons: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle size={16} className="text-success" />,
  error: <XCircle size={16} className="text-red-400" />,
  warning: <AlertTriangle size={16} className="text-yellow-400" />,
  info: <Info size={16} className="text-accent-light" />,
}

const styles: Record<NotificationType, string> = {
  success: 'border-success/30',
  error: 'border-danger/30',
  warning: 'border-warning/30',
  info: 'border-accent/30',
}

export function ToastContainer() {
  const { notifications, remove } = useNotificationStore()

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 w-80">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={cn(
            'bg-surface-2 border rounded-xl px-4 py-3 shadow-xl flex items-start gap-3',
            styles[n.type]
          )}
        >
          <span className="mt-0.5">{icons[n.type]}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary">{n.title}</p>
            {n.message && <p className="text-xs text-text-secondary mt-0.5">{n.message}</p>}
          </div>
          <button onClick={() => remove(n.id)} className="text-text-muted hover:text-text-primary mt-0.5">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
