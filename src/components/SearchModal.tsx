'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, X, Loader2 } from 'lucide-react'
import type { SearchResult } from '@/lib/types'

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100); else { setQuery(''); setResults([]) } }, [open])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) { document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden' }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try { const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`); const data = await res.json(); setResults(data.results || []) } catch { setResults([]) } finally { setLoading(false) }
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-surface-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search className="w-5 h-5 text-white/40" />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects, services, blog..." className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40" />
          {loading && <Loader2 className="w-4 h-4 animate-spin text-white/40" />}
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5"><X className="w-5 h-5 text-white/40" /></button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 && query.trim() && !loading && <div className="px-4 py-8 text-center text-white/50 text-sm">No results for "{query}"</div>}
          {query.trim() && !loading && <Link href={`/search?q=${encodeURIComponent(query)}`} onClick={onClose} className="block px-4 py-3 hover:bg-white/5 border-t border-white/10 text-center text-sm text-brand-400">View all results for "{query}" →</Link>}
          {results.map(r => (<Link key={`${r.type}-${r.slug}`} href={r.href} onClick={onClose} className="block px-4 py-3 hover:bg-white/5 border-b border-white/5 last:border-0"><div className="flex items-center gap-3"><span className="text-xs font-medium px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-400 uppercase">{r.type}</span><div><p className="text-sm font-medium text-white">{r.title}</p><p className="text-xs text-white/50">{r.description}</p></div></div></Link>))}
        </div>
      </div>
    </div>
  )
}