import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { ToastContainer } from '../ui/Toast'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/content': 'Content Library',
  '/video': 'Video Creator',
  '/editor': 'Text Editor',
  '/schedule': 'Schedule Calendar',
  '/queue': 'Queue Monitor',
  '/settings': 'Settings',
}

export function Layout() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'Content Engine'

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-5 bg-surface-0">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  )
}
