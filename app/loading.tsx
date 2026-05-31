import { Zap } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center animate-pulse">
            <Zap size={24} className="text-green-400 fill-green-400" />
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 animate-ping" />
        </div>
        <p className="text-[#6B5A8E] text-sm font-medium tracking-wide">Loading…</p>
      </div>
    </div>
  )
}
