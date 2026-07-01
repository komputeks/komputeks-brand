'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/features/products/types';
import { PRODUCT_CATEGORIES, getCategorySlug } from '@/features/products/types';

const PRODUCTS_PER_PAGE = 9;
const productCategories = ['All', ...Object.keys(PRODUCT_CATEGORIES)];

const statusConfig = {
  'working': { variant: 'success' as const, label: 'Live' },
  'partly-working': { variant: 'warning' as const, label: 'Beta' },
  'started': { variant: 'info' as const, label: 'In Progress' },
  'not-started': { variant: 'default' as const, label: 'Coming Soon' },
};

export function ProductsListClient({ products }: { products: Product[] }) {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = products;
    if (active !== 'All') result = result.filter(p => p.category === active);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return result;
  }, [products, active, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">Projects</h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">Every product is leverage. Here&apos;s what we&apos;ve built.</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {productCategories.map(cat => (
              <button key={cat} onClick={() => { setActive(cat); setPage(1); }}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${active === cat ? 'bg-brand-500 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input type="text" placeholder="Search projects..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-4 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:w-64" />
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map(product => {
            const status = statusConfig[product.status];
            const catSlug = getCategorySlug(PRODUCT_CATEGORIES, product.category);
            return (
              <Link key={product.id} href={`/products/${catSlug}/${product.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-brand-500/5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-lg font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                    {product.name.charAt(0)}
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">{product.name}</h2>
                <p className="mt-1 text-sm text-brand-600 dark:text-brand-400">{product.tagline}</p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{product.description}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="default">{product.category}</Badge>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-zinc-500 dark:text-zinc-400">No projects found.</div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium disabled:opacity-40 dark:border-zinc-700">Previous</button>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium disabled:opacity-40 dark:border-zinc-700">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}