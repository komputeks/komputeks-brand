import Link from 'next/link'
import { Calendar, Clock, ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '@/lib/types'
import { truncate, formatDate } from '@/lib/utils'

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${encodeURIComponent(post.category)}/${post.slug}`} className="glass-card glass-card-hover p-6 group block">
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/20 uppercase tracking-wide">{post.category}</span>
        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-brand-400 group-hover:rotate-45 transition-all" />
      </div>
      <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-brand-400 transition-colors">{post.title}</h3>
      <p className="text-sm text-white/60 mb-4">{truncate(post.excerpt, 140)}</p>
      <div className="flex items-center gap-4 text-xs text-white/40">
        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(post.published_at)}</span>
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.reading_time} min</span>
        <span>by {post.author}</span>
      </div>
    </Link>
  )
}