'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, Package, Wrench, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Product, Service, BlogPost } from '@/features/products/types';
import { PRODUCT_CATEGORIES, SERVICE_CATEGORIES, BLOG_CATEGORIES, getCategorySlug } from '@/features/products/types';

type SearchResult = { products: Product[]; services: Service[]; posts: BlogPost[] };

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) { setResults(null); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) setResults(await res.json());
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const hasResults = results && (results.products.length > 0 || results.services.length > 0 || results.posts.length > 0);

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Search</h1>
        <div className="relative mt-6">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search projects, services, blog..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-12 pr-4 text-base dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        {loading && (
          <div className="mt-8 flex justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          </div>
        )}

        {results && !loading && (
          <div className="mt-8 space-y-8">
            {results.products.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white"><Package className="h-5 w-5 text-brand-500" /> Projects</h2>
                <div className="mt-3 space-y-2">
                  {results.products.map(p => (
                    <Link key={p.id} href={`/products/${getCategorySlug(PRODUCT_CATEGORIES, p.category)}/${p.slug}`}
                      className="block rounded-lg border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                      <p className="font-medium text-zinc-900 dark:text-white">{p.name}</p>
                      <p className="text-sm text-zinc-500">{p.tagline}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.services.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white"><Wrench className="h-5 w-5 text-brand-500" /> Services</h2>
                <div className="mt-3 space-y-2">
                  {results.services.map(s => (
                    <Link key={s.id} href={`/services/${getCategorySlug(SERVICE_CATEGORIES, s.category)}/${s.slug}`}
                      className="block rounded-lg border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                      <p className="font-medium text-zinc-900 dark:text-white">{s.title}</p>
                      <p className="text-sm text-zinc-500">{s.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.posts.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white"><BookOpen className="h-5 w-5 text-brand-500" /> Blog</h2>
                <div className="mt-3 space-y-2">
                  {results.posts.map(p => (
                    <Link key={p.id} href={`/blog/philosophy/${p.slug}`}
                      className="block rounded-lg border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                      <p className="font-medium text-zinc-900 dark:text-white">{p.title}</p>
                      <p className="text-sm text-zinc-500">{p.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {!hasResults && query && (
              <div className="py-12 text-center text-zinc-500">No results found for &ldquo;{query}&rdquo;</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}