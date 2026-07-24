'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Trash2, Plus } from 'lucide-react'

export default function AdminDashboardClient({ projects, services, posts, subscribers, contacts }: { projects: any[]; services: any[]; posts: any[]; subscribers: any[]; contacts: any[] }) {
  const [tab, setTab] = useState<'projects' | 'services' | 'blog' | 'subscribers' | 'contacts'>('projects')

  const tabs = [
    { key: 'projects' as const, label: 'Projects', count: projects.length },
    { key: 'services' as const, label: 'Services', count: services.length },
    { key: 'blog' as const, label: 'Blog', count: posts.length },
    { key: 'subscribers' as const, label: 'Subscribers', count: subscribers.length },
    { key: 'contacts' as const, label: 'Contacts', count: contacts.length },
  ]

  return (
    <main className="min-h-screen bg-surface-950">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-2xl font-bold font-display text-white mb-6">Admin Dashboard</h1>
        <div className="flex gap-2 flex-wrap mb-8">{tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${tab === t.key ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'}`}>{t.label} ({t.count})</button>
        ))}</div>

        {tab === 'projects' && <div className="space-y-3">{projects.map(p => (
          <div key={p.id} className="glass-card p-4 flex items-center justify-between">
            <div><p className="font-medium text-white">{p.title}</p><p className="text-sm text-white/40">{p.tagline} \u00b7 {p.category} \u00b7 {p.status}</p></div>
            <Link href={`/projects/${encodeURIComponent(p.category)}/${p.slug}`} className="text-brand-400 hover:text-brand-300"><ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        ))}</div>}

        {tab === 'services' && <div className="space-y-3">{services.map(s => (
          <div key={s.id} className="glass-card p-4 flex items-center justify-between">
            <div><p className="font-medium text-white">{s.title}</p><p className="text-sm text-white/40">{s.tagline} \u00b7 {s.category}</p></div>
            <Link href={`/services/${encodeURIComponent(s.category)}/${s.slug}`} className="text-brand-400 hover:text-brand-300"><ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        ))}</div>}

        {tab === 'blog' && <div className="space-y-3">{posts.map(p => (
          <div key={p.id} className="glass-card p-4 flex items-center justify-between">
            <div><p className="font-medium text-white">{p.title}</p><p className="text-sm text-white/40">{p.category} \u00b7 {p.published ? 'Published' : 'Draft'}</p></div>
            <Link href={`/blog/${encodeURIComponent(p.category)}/${p.slug}`} className="text-brand-400 hover:text-brand-300"><ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        ))}</div>}

        {tab === 'subscribers' && <div className="space-y-2">{subscribers.map(s => (
          <div key={s.id} className="glass-card p-3 flex items-center gap-3"><span className="text-sm text-white">{s.email}</span><span className="text-xs text-white/40">{s.source}</span></div>
        ))}</div>}

        {tab === 'contacts' && <div className="space-y-3">{contacts.map(c => (
          <div key={c.id} className={`glass-card p-4 ${!c.read ? 'border-brand-500/30' : ''}`}>
            <div className="flex items-center justify-between"><p className="font-medium text-white">{c.name}</p>{!c.read && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400">New</span>}</div>
            <p className="text-sm text-white/40">{c.email} \u00b7 {c.subject}</p>
            <p className="text-sm text-white/60 mt-1">{c.message}</p>
          </div>
        ))}</div>}
      </div>
    </main>
  )
}