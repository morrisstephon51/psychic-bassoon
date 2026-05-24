import { Video, FileText, Send, RefreshCw } from 'lucide-react'
import { StatusBadge } from '../ui/Badge'
import { formatRelative } from '../../lib/utils'
import type { Job } from '../../types'

const jobIcons: Record<string, React.ReactNode> = {
  build_video: <Video size={14} className="text-accent-light" />,
  build_text_post: <FileText size={14} className="text-text-muted" />,
  publish_content: <Send size={14} className="text-success" />,
}

interface QueueCardProps {
  job: Job
}

export function QueueCard({ job }: QueueCardProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-surface-3 last:border-0 hover:bg-surface-1 transition-colors">
      <div className="flex-shrink-0">{jobIcons[job.type] ?? <RefreshCw size={14} className="text-text-muted" />}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-primary font-medium">{job.type.replace(/_/g, ' ')}</span>
          <StatusBadge status={job.status} />
        </div>
        {job.error && <p className="text-xs text-red-400 mt-0.5 truncate">{job.error}</p>}
        <p className="text-xs text-text-muted mt-0.5">
          attempt {job.attempts}/{job.maxAttempts} · {formatRelative(job.createdAt)}
        </p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-xs text-text-muted font-mono">{job.id.slice(0, 8)}...</p>
      </div>
    </div>
  )
}
