import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

interface PrevNextNavProps {
  prev?: { slug: string; title: string; category: string; type: 'projects' | 'services' | 'blog' } | null
  next?: { slug: string; title: string; category: string; type: 'projects' | 'services' | 'blog' } | null
}

export default function PrevNextNav({ prev, next }: PrevNextNavProps) {
  return (
    <div className="flex gap-4 mt-12">
      {prev ? <Link href={`/${prev.type}/${encodeURIComponent(prev.category)}/${prev.slug}`} className="flex-1 glass-card p-4 group hover:bg-white/10 transition-all"><div className="flex items-center gap-2 text-white/40 group-hover:text-brand-400"><ArrowLeft className="w-4 h-4" /><span className="text-xs">Previous</span></div><p className="text-sm font-medium text-white mt-1 truncate">{prev.title}</p></Link> : <div className="flex-1" />}
      {next ? <Link href={`/${next.type}/${encodeURIComponent(next.category)}/${next.slug}`} className="flex-1 glass-card p-4 group hover:bg-white/10 transition-all"><div className="flex items-center gap-2 text-white/40 group-hover:text-brand-400 justify-end"><span className="text-xs">Next</span><ArrowUpRight className="w-4 h-4" /></div><p className="text-sm font-medium text-white mt-1 truncate text-right">{next.title}</p></Link> : <div className="flex-1" />}
    </div>
  )
}