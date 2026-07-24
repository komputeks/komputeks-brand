import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '@/lib/types'
import { truncate } from '@/lib/utils'

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${encodeURIComponent(service.category)}/${service.slug}`} className="glass-card glass-card-hover p-6 group block">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-cyan-500/20 flex items-center justify-center"><span className="text-lg font-bold text-brand-400">{service.title.charAt(0)}</span></div>
        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-brand-400 group-hover:rotate-45 transition-all" />
      </div>
      <h3 className="text-lg font-bold font-display text-white mb-1 group-hover:text-brand-400 transition-colors">{service.title}</h3>
      <p className="text-sm text-white/60 mb-3">{truncate(service.tagline, 120)}</p>
      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/5 text-white/50">{service.category}</span>
    </Link>
  )
}