import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import ContentLibrary from './pages/ContentLibrary'
import VideoCreator from './pages/VideoCreator'
import TextEditor from './pages/TextEditor'
import ScheduleCalendar from './pages/ScheduleCalendar'
import QueueMonitor from './pages/QueueMonitor'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/content" element={<ContentLibrary />} />
          <Route path="/video" element={<VideoCreator />} />
          <Route path="/editor" element={<TextEditor />} />
          <Route path="/schedule" element={<ScheduleCalendar />} />
          <Route path="/queue" element={<QueueMonitor />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
