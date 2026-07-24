'use client'

import { useState } from 'react'
import { PROJECT_CATEGORIES, SERVICE_CATEGORIES, BLOG_CATEGORIES } from '@/lib/constants'

interface CategoryFilterProps {
  categories: string[]
  active: string
  onChange: (cat: string) => void
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map(cat => (
        <button key={cat} onClick={() => onChange(cat)} className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${active === cat ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'}`}>{cat}</button>
      ))}
    </div>
  )
}