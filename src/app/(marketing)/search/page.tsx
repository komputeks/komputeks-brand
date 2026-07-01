'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, Package, Wrench, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Product, Service, BlogPost } from '@/features/products/types';
import { PRODUCT_CATEGORIES, SERVICE_CATEGORIES, getCategorySlug } from '@/features/products/types';

type SearchResult = { products: Product[]; services: Service[]; posts: BlogPost[] };

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q !== query) setQuery(q);
    if (!q.trim()) { setResults(null); return; }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setResults(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const hasResults = results && (results.products.length > 0 || results.services.length > 0 || results.posts.length > 0);
  const totalResults = results ? results.products.length + results.services.length + results.posts.length : 0;

  return (
    <div className="pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-surface-950 to-surface-950" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] gradient-text">Search</h1>
        <form onSubmit={handleSubmit} className="relative mt-6">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
          <input type="text" placeholder="Search projects, services, blog..." value={query} onChange={e => setQuery(e.target.value)} autoFocus className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-base text-white placeholder:text-white/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 backdrop-blur-xl" />
        </form>

        {loading && (
          <div className="mt-8 flex justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" /></div>
        )}

        {results && !loading && (
          <div className="mt-4 mb-2 text-sm text-white/50">{totalResults} result{totalResults !== 1 ? 's' : ''} for &ldquo;{searchParams.get('q')}&rdquo;</div>
        )}

        {results && !loading && (
          <div className="mt-4 space-y-8">
            {results.products.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold font-[family-name:var(--font-display)]"><Package className="h-5 w-5 text-brand-400" /> Projects</h2>
                <div className="mt-3 space-y-2">
                  {results.products.map(p => (
                    <Link key={p.id} href={`/products/${getCategorySlug(PRODUCT_CATEGORIES, p.category)}/${p.slug}`} className="block rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                      <div className="flex items-center gap-2"><p className="font-medium font-[family-name:var(--font-display)]">{p.name}</p><Badge variant={p.status === 'working' ? 'success' : p.status === 'partly-working' ? 'warning' : 'default'}>{p.status}</Badge></div>
                      <p className="text-sm text-white/50">{p.tagline}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {results.services.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold font-[family-name:var(--font-display)]"><Wrench className="h-5 w-5 text-brand-400" /> Services</h2>
                <div className="mt-3 space-y-2">
                  {results.services.map(s => (
                    <Link key={s.id} href={`/services/${getCategorySlug(SERVICE_CATEGORIES, s.category)}/${s.slug}`} className="block rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                      <p className="font-medium font-[family-name:var(--font-display)]">{s.title}</p>
                      <p className="text-sm text-white/50">{s.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {results.posts.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold font-[family-name:var(--font-display)]"><BookOpen className="h-5 w-5 text-brand-400" /> Blog</h2>
                <div className="mt-3 space-y-2">
                  {results.posts.map(p => (
                    <Link key={p.id} href={`/blog/philosophy/${p.slug}`} className="block rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                      <p className="font-medium font-[family-name:var(--font-display)]">{p.title}</p>
                      <p className="text-sm text-white/50">{p.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {!hasResults && searchParams.get('q') && (
              <div className="py-12 text-center text-white/50">No results found for &ldquo;{searchParams.get('q')}&rdquo;</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center pt-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
