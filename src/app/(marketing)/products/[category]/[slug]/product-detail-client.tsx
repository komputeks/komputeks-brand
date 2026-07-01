'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/features/products/types';
import { PRODUCT_CATEGORIES, getCategorySlug } from '@/features/products/types';

const statusConfig = {
  'working': { variant: 'success' as const, label: 'Live' },
  'partly-working': { variant: 'warning' as const, label: 'Beta' },
  'started': { variant: 'info' as const, label: 'In Progress' },
  'not-started': { variant: 'default' as const, label: 'Coming Soon' },
};

export function ProductDetailClient({ product, categorySlug, prev, next, related }: {
  product: Product; categorySlug: string; prev: Product | null; next: Product | null; related: Product[];
}) {
  const status = statusConfig[product.status];

  return (
    <div className="pt-28 pb-20">
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8">
          <Link href="/products" className="text-sm text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400">← Back to Projects</Link>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100 text-2xl font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
              {product.name.charAt(0)}
            </div>
            <div>
              <Link href={`/products/${categorySlug}`}><Badge>{product.category}</Badge></Link>
              <Badge variant={status.variant} className="ml-2">{status.label}</Badge>
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">{product.name}</h1>
          <p className="mt-2 text-lg text-brand-600 dark:text-brand-400">{product.tagline}</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{product.description}</p>
          {product.url && (
            <a href={product.url} target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600">
              Visit Project <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
          {prev ? (
            <Link href={`/products/${getCategorySlug(PRODUCT_CATEGORIES, prev.category)}/${prev.slug}`} className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">
              <ArrowLeft className="h-4 w-4" /><span>{prev.name}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/products/${getCategorySlug(PRODUCT_CATEGORIES, next.category)}/${next.slug}`} className="flex items-center gap-2 text-right text-sm font-medium text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">
              <span>{next.name}</span><ArrowRight className="h-4 w-4" />
            </Link>
          ) : <div />}
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Related Projects</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map(r => (
                <Link key={r.id} href={`/products/${getCategorySlug(PRODUCT_CATEGORIES, r.category)}/${r.slug}`}
                  className="rounded-lg border border-zinc-200 p-4 transition-shadow hover:shadow-md dark:border-zinc-800">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{r.name}</p>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-2">{r.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}