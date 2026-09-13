export default function GrantsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="h-8 w-48 bg-purple-100 rounded animate-pulse mb-2" />
      <div className="h-4 w-80 bg-purple-50 rounded animate-pulse mb-10" />
      <div className="flex gap-3 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-24 bg-purple-100 rounded-full animate-pulse" />
        ))}
      </div>
      <div className="border border-purple-100 rounded-xl overflow-hidden">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-purple-50 last:border-0">
            <div className="h-4 w-40 bg-purple-100 rounded animate-pulse" />
            <div className="h-4 w-32 bg-purple-50 rounded animate-pulse" />
            <div className="h-4 w-20 bg-purple-100 rounded animate-pulse ml-auto" />
            <div className="h-4 w-24 bg-purple-50 rounded animate-pulse" />
            <div className="h-6 w-20 bg-purple-100 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
