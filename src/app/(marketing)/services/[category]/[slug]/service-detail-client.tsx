'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Service } from '@/features/products/types';
import { SERVICE_CATEGORIES, getCategorySlug } from '@/features/products/types';

export function ServiceDetailClient({ service, categorySlug, prev, next, related }: {
  service: Service; categorySlug: string; prev: Service | null; next: Service | null; related: Service[];
}) {
  return (
    <div className="pt-28 pb-20">
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8">
          <Link href="/services" className="text-sm text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400">← Back to Services</Link>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-xl font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
              {service.icon_letter || service.title.charAt(0)}
            </div>
            <Link href={`/services/${categorySlug}`}><Badge>{service.category}</Badge></Link>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">{service.title}</h1>
        </div>
        <div className="prose prose-zinc dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: service.content }} />

        <div className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
          {prev ? (
            <Link href={`/services/${getCategorySlug(SERVICE_CATEGORIES, prev.category)}/${prev.slug}`} className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">
              <ArrowLeft className="h-4 w-4" /><span>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/services/${getCategorySlug(SERVICE_CATEGORIES, next.category)}/${next.slug}`} className="flex items-center gap-2 text-right text-sm font-medium text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">
              <span>{next.title}</span><ArrowRight className="h-4 w-4" />
            </Link>
          ) : <div />}
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Related Services</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map(r => (
                <Link key={r.id} href={`/services/${getCategorySlug(SERVICE_CATEGORIES, r.category)}/${r.slug}`}
                  className="rounded-lg border border-zinc-200 p-4 transition-shadow hover:shadow-md dark:border-zinc-800">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{r.title}</p>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}