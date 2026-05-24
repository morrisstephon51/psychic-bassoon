import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Library,
  Calendar,
  ListOrdered,
  Settings,
  Zap,
  Video,
  FileText,
} from 'lucide-react'
import { cn } from '../../lib/utils'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/content', icon: Library, label: 'Content Library' },
  { to: '/video', icon: Video, label: 'Video Creator' },
  { to: '/editor', icon: FileText, label: 'Text Editor' },
  { to: '/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/queue', icon: ListOrdered, label: 'Queue Monitor' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  return (
    <aside className="w-56 bg-surface-1 border-r border-surface-3 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-surface-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm text-text-primary">Content Engine</p>
            <p className="text-xs text-text-muted">The Plug AI</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150',
                isActive
                  ? 'bg-accent/15 text-accent-light font-medium'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-2'
              )
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Status dot */}
      <div className="px-4 py-3 border-t border-surface-3">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Engine running
        </div>
      </div>
    </aside>
  )
}
