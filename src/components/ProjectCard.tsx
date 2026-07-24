import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/types'
import { truncate, parseTags } from '@/lib/utils'

export default function ProjectCard({ project }: { project: Project }) {
  const tags = parseTags(project.tags)
  const statusColors: Record<string, string> = { live: 'bg-green-500/10 text-green-400 border-green-500/20', beta: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', archived: 'bg-white/10 text-white/50' }

  return (
    <Link href={`/projects/${encodeURIComponent(project.category)}/${project.slug}`} className="glass-card glass-card-hover p-6 group block">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-cyan-500/20 flex items-center justify-center"><span className="text-lg font-bold text-brand-400">{project.title.charAt(0)}</span></div>
        <div className="flex items-center gap-2">
          {project.status && <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColors[project.status] || statusColors.archived}`}>{project.status}</span>}
          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-brand-400 group-hover:rotate-45 transition-all" />
        </div>
      </div>
      <h3 className="text-lg font-bold font-display text-white mb-1 group-hover:text-brand-400 transition-colors">{project.title}</h3>
      <p className="text-sm text-white/60 mb-3">{truncate(project.tagline, 100)}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/5 text-white/50">{project.category}</span>
        {tags.slice(0, 2).map(tag => <span key={tag} className="text-xs text-white/40">#{tag}</span>)}
      </div>
    </Link>
  )
}