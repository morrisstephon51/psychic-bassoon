'use client'

import { useEffect, useState, useCallback } from 'react'

type GrantDoc = {
  id: string
  doc_type: 'loi' | 'narrative' | 'budget' | 'cover_letter' | 'supporting'
  content: string
  generated_at: string
}

type Grant = {
  id: string
  name: string
  funder: string
  source: string | null
  org: 'plug_ai' | 'forming_paws' | 'both' | null
  amount_min: number | null
  amount_max: number | null
  deadline: string | null
  status: string
  fit_score: number | null
  application_url: string | null
  requirements: string | null
  notes: string | null
  tags: string[] | null
  grant_documents: GrantDoc[]
}

const STATUS_COLORS: Record<string, string> = {
  identified: 'bg-purple-100 text-purple-700',
  researching: 'bg-blue-100 text-blue-700',
  drafting: 'bg-amber-100 text-amber-700',
  submitted: 'bg-green-100 text-green-700',
  awarded: 'bg-green-200 text-green-800',
  rejected: 'bg-red-100 text-red-700',
  watching: 'bg-gray-100 text-gray-600',
}

const STATUS_OPTIONS = ['identified', 'researching', 'drafting', 'submitted', 'awarded', 'rejected', 'watching']

const ORG_LABELS: Record<string, string> = {
  plug_ai: 'The Plug AI',
  forming_paws: 'Forming Paws',
  both: 'Both',
}

function daysUntil(deadline: string | null): number | null {
  if (!deadline) return null
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000)
}

function urgencyStyle(days: number | null): string {
  if (days === null) return 'text-gray-400'
  if (days < 0) return 'text-gray-400 line-through'
  if (days <= 30) return 'text-red-600 font-semibold'
  if (days <= 90) return 'text-amber-600 font-medium'
  return 'text-green-600'
}

function formatDeadline(deadline: string | null): string {
  if (!deadline) return '—'
  const d = new Date(deadline)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatAmount(min: number | null, max: number | null): string {
  if (!min && !max) return '—'
  if (max && !min) return `Up to $${max.toLocaleString()}`
  if (min && !max) return `$${min.toLocaleString()}+`
  return `$${min!.toLocaleString()}–$${max!.toLocaleString()}`
}

function FitBar({ score }: { score: number | null }) {
  if (score === null) return <span className="text-gray-400">—</span>
  const color = score >= 80 ? 'bg-green-500' : score >= 65 ? 'bg-amber-400' : score >= 50 ? 'bg-orange-400' : 'bg-red-400'
  const textColor = score >= 80 ? 'text-green-700' : score >= 65 ? 'text-amber-700' : score >= 50 ? 'text-orange-700' : 'text-red-700'
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-semibold ${textColor}`}>{score}</span>
    </div>
  )
}

export default function GrantsPage() {
  const [grants, setGrants] = useState<Grant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orgFilter, setOrgFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [generating, setGenerating] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const fetchGrants = useCallback(async () => {
    try {
      const res = await fetch('/api/grants')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setGrants(data)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchGrants() }, [fetchGrants])

  const mutationHeaders = (): HeadersInit => {
    const secret = process.env.NEXT_PUBLIC_MUTATION_SECRET
    return secret
      ? { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` }
      : { 'Content-Type': 'application/json' }
  }

  const updateStatus = async (id: string, status: string) => {
    setGrants((prev) => prev.map((g) => g.id === id ? { ...g, status } : g))
    await fetch(`/api/grants/${id}/status`, {
      method: 'PATCH',
      headers: mutationHeaders(),
      body: JSON.stringify({ status }),
    })
  }

  const generateDocs = async (id: string) => {
    setGenerating(id)
    try {
      const res = await fetch(`/api/grants/${id}/generate-docs`, {
        method: 'POST',
        headers: mutationHeaders(),
      })
      if (!res.ok) throw new Error(await res.text())
      await fetchGrants()
      setExpanded(id)
    } catch (e) {
      alert(`Doc generation failed: ${e}`)
    } finally {
      setGenerating(null)
    }
  }

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const filtered = grants.filter((g) => {
    if (orgFilter !== 'all' && g.org !== orgFilter) return false
    if (statusFilter !== 'all' && g.status !== statusFilter) return false
    if (sourceFilter !== 'all' && g.source !== sourceFilter) return false
    return true
  })

  const priority = filtered.filter((g) => (g.fit_score ?? 0) >= 70).length
  const urgent = filtered.filter((g) => {
    const d = daysUntil(g.deadline)
    return d !== null && d >= 0 && d <= 30
  }).length

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-block h-8 w-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-red-600">
        Failed to load grants: {error}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A0533] font-[Space_Grotesk] mb-1">
          Grant Tracker
        </h1>
        <p className="text-[#6B5A8E] text-sm">
          Live pipeline — {grants.length} grants tracked · {priority} priority matches · {urgent} deadline{urgent !== 1 ? 's' : ''} in 30 days
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex gap-1 p-1 bg-purple-50 rounded-lg">
          {['all', 'plug_ai', 'forming_paws'].map((v) => (
            <button
              key={v}
              onClick={() => setOrgFilter(v)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                orgFilter === v ? 'bg-white text-purple-700 shadow-sm' : 'text-purple-500 hover:text-purple-700'
              }`}
            >
              {v === 'all' ? 'All Orgs' : ORG_LABELS[v]}
            </button>
          ))}
        </div>

        <div className="flex gap-1 p-1 bg-purple-50 rounded-lg">
          {['all', 'federal', 'state', 'foundation', 'private'].map((v) => (
            <button
              key={v}
              onClick={() => setSourceFilter(v)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                sourceFilter === v ? 'bg-white text-purple-700 shadow-sm' : 'text-purple-500 hover:text-purple-700'
              }`}
            >
              {v === 'all' ? 'All Sources' : v}
            </button>
          ))}
        </div>

        <div className="flex gap-1 p-1 bg-purple-50 rounded-lg">
          {['all', 'identified', 'researching', 'drafting', 'submitted', 'watching'].map((v) => (
            <button
              key={v}
              onClick={() => setStatusFilter(v)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                statusFilter === v ? 'bg-white text-purple-700 shadow-sm' : 'text-purple-500 hover:text-purple-700'
              }`}
            >
              {v === 'all' ? 'All Statuses' : v}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#EDE9FE] rounded-xl overflow-hidden shadow-sm">
        {/* Header row */}
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1.2fr_auto] gap-4 px-5 py-3 bg-[#F5F3FF] text-xs font-semibold text-[#6B5A8E] uppercase tracking-wide">
          <span>Grant / Funder</span>
          <span>Org</span>
          <span>Amount</span>
          <span>Deadline</span>
          <span>Fit</span>
          <span>Status</span>
          <span />
        </div>

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-[#9385B5] text-sm">
            No grants match the current filters.
          </div>
        )}

        {filtered.map((grant) => {
          const days = daysUntil(grant.deadline)
          const isExpanded = expanded === grant.id
          const docs = grant.grant_documents || []
          const loi = docs.find((d) => d.doc_type === 'loi')
          const narrative = docs.find((d) => d.doc_type === 'narrative')

          return (
            <div key={grant.id} className="border-b border-[#EDE9FE] last:border-0">
              {/* Main row */}
              <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1.2fr_auto] gap-4 items-center px-5 py-4 hover:bg-[#F5F3FF] transition-colors">
                {/* Name + funder */}
                <div>
                  <p className="text-sm font-semibold text-[#1A0533] leading-tight">{grant.name}</p>
                  <p className="text-xs text-[#9385B5] mt-0.5">{grant.funder}</p>
                  {grant.tags && grant.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {grant.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Org */}
                <span className="text-xs text-[#6B5A8E]">
                  {grant.org ? ORG_LABELS[grant.org] : '—'}
                </span>

                {/* Amount */}
                <span className="text-xs text-[#1A0533] font-medium">
                  {formatAmount(grant.amount_min, grant.amount_max)}
                </span>

                {/* Deadline */}
                <div>
                  <p className={`text-xs ${urgencyStyle(days)}`}>{formatDeadline(grant.deadline)}</p>
                  {days !== null && days >= 0 && days <= 90 && (
                    <p className={`text-[10px] mt-0.5 ${urgencyStyle(days)}`}>{days}d left</p>
                  )}
                </div>

                {/* Fit score */}
                <FitBar score={grant.fit_score} />

                {/* Status select */}
                <select
                  value={grant.status}
                  onChange={(e) => updateStatus(grant.id, e.target.value)}
                  className={`text-xs px-2 py-1 rounded-full border-0 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-400 ${STATUS_COLORS[grant.status] || 'bg-gray-100 text-gray-600'}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-white text-gray-800">{s}</option>
                  ))}
                </select>

                {/* Expand toggle */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : grant.id)}
                  className="text-[#9385B5] hover:text-purple-600 transition-colors p-1"
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Expanded detail panel */}
              {isExpanded && (
                <div className="px-5 pb-6 bg-[#FAFAFA] border-t border-[#EDE9FE]">
                  {/* Requirements */}
                  {grant.requirements && (
                    <div className="mt-4">
                      <h3 className="text-xs font-semibold text-[#6B5A8E] uppercase tracking-wide mb-1">Requirements</h3>
                      <p className="text-sm text-[#1A0533] leading-relaxed">{grant.requirements}</p>
                    </div>
                  )}

                  {/* Notes */}
                  {grant.notes && (
                    <div className="mt-3">
                      <h3 className="text-xs font-semibold text-[#6B5A8E] uppercase tracking-wide mb-1">Notes</h3>
                      <p className="text-sm text-[#6B5A8E]">{grant.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4">
                    {grant.application_url && (
                      <a
                        href={grant.application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-700 hover:text-purple-900 underline underline-offset-2"
                      >
                        Apply / More Info →
                      </a>
                    )}

                    <button
                      onClick={() => generateDocs(grant.id)}
                      disabled={generating === grant.id}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-60 disabled:cursor-wait transition-colors"
                    >
                      {generating === grant.id ? (
                        <>
                          <span className="inline-block h-3 w-3 border border-white border-t-transparent rounded-full animate-spin" />
                          Generating…
                        </>
                      ) : docs.length > 0 ? 'Regenerate Docs' : 'Generate LOI + Narrative'}
                    </button>
                  </div>

                  {/* Generated documents */}
                  {(loi || narrative) && (
                    <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {loi && (
                        <div className="bg-white border border-[#EDE9FE] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-[#1A0533]">Letter of Intent</h3>
                            <button
                              onClick={() => copyText(loi.content, `loi-${grant.id}`)}
                              className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                            >
                              {copied === `loi-${grant.id}` ? '✓ Copied' : 'Copy'}
                            </button>
                          </div>
                          <div className="text-xs text-[#1A0533] leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                            {loi.content}
                          </div>
                        </div>
                      )}
                      {narrative && (
                        <div className="bg-white border border-[#EDE9FE] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-[#1A0533]">Full Narrative</h3>
                            <button
                              onClick={() => copyText(narrative.content, `narrative-${grant.id}`)}
                              className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                            >
                              {copied === `narrative-${grant.id}` ? '✓ Copied' : 'Copy'}
                            </button>
                          </div>
                          <div className="text-xs text-[#1A0533] leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                            {narrative.content}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#9385B5]">
        <span><span className="text-red-600 font-semibold">Red deadline</span> = ≤30 days</span>
        <span><span className="text-amber-600 font-medium">Amber deadline</span> = ≤90 days</span>
        <span><span className="text-green-600">Green deadline</span> = {'>'} 90 days</span>
        <span>Fit score: 80+ priority · 65+ watch · &lt;65 lower priority</span>
      </div>
    </div>
  )
}
