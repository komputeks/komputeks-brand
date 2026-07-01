'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/features/products/types';
import { BLOG_CATEGORIES, getCategorySlug } from '@/features/products/types';

const POSTS_PER_PAGE = 6;

const blogCategories = ['All', ...Object.keys(BLOG_CATEGORIES)];

function assignCategory(post: BlogPost): string {
  const t = (post.title + ' ' + post.excerpt).toLowerCase();
  if (t.includes('founder') || t.includes('monopoly') || t.includes('obscurity')) return 'Founder Story';
  if (t.includes('ecosystem') || t.includes('own more') || t.includes('leverage company')) return 'Building';
  if (t.includes('software') || t.includes('technology') || t.includes('ai')) return 'Technology';
  return 'Philosophy';
}

function formatDate(d: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(d));
}

export function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const enriched = useMemo(() => posts.map(p => ({ ...p, _cat: assignCategory(p) })), [posts]);

  const filtered = useMemo(() => {
    let result = enriched;
    if (active !== 'All') result = result.filter(p => p._cat === active);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return result;
  }, [enriched, active, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">Blog</h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">Practical insights on building with constraints. No fluff.</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {blogCategories.map(cat => (
              <button key={cat} onClick={() => { setActive(cat); setPage(1); }}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${active === cat ? 'bg-brand-500 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input type="text" placeholder="Search articles..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-4 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:w-64" />
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map(post => (
            <Link key={post.id} href={`/blog/${getCategorySlug(BLOG_CATEGORIES, post._cat)}/${post.slug}`}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-brand-500/5 dark:border-zinc-800 dark:bg-zinc-900">
              <Badge variant="default" className="mb-3">{post._cat}</Badge>
              <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">{post.title}</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">{post.excerpt}</p>
              <p className="mt-3 text-xs text-zinc-500">{formatDate(post.created_at)} · 3 min read · by Simon Peter Muchoki Wokabi</p>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-zinc-500 dark:text-zinc-400">No articles found.</div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium disabled:opacity-40 dark:border-zinc-700">Previous</button>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium disabled:opacity-40 dark:border-zinc-700">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}