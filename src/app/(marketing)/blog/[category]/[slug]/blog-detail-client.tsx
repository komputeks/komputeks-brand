'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/features/products/types';
import { BLOG_CATEGORIES, getCategorySlug } from '@/features/products/types';

function formatDate(d: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(d));
}

export function BlogDetailClient({ post, category, categorySlug, prev, next, related }: {
  post: BlogPost; category: string; categorySlug: string;
  prev: (BlogPost & { _cat: string }) | null; next: (BlogPost & { _cat: string }) | null;
  related: (BlogPost & { _cat: string })[];
}) {
  return (
    <div className="pt-28 pb-20">
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8">
          <Link href="/blog" className="text-sm text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400">← Back to Blog</Link>
          <div className="mt-4 flex items-center gap-3">
            <Link href={`/blog/${categorySlug}`}><Badge>{category}</Badge></Link>
            <span className="text-sm text-zinc-500">{formatDate(post.created_at)}</span>
            <span className="text-sm text-zinc-500">3 min read</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">{post.title}</h1>
          <p className="mt-2 text-sm text-zinc-500">by Simon Peter Muchoki Wokabi</p>
        </div>
        <div className="prose prose-zinc dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
          {prev ? (
            <Link href={`/blog/${getCategorySlug(BLOG_CATEGORIES, prev._cat)}/${prev.slug}`} className="group flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">
              <ArrowLeft className="h-4 w-4" /><span>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/blog/${getCategorySlug(BLOG_CATEGORIES, next._cat)}/${next.slug}`} className="group flex items-center gap-2 text-right text-sm font-medium text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">
              <span>{next.title}</span><ArrowRight className="h-4 w-4" />
            </Link>
          ) : <div />}
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Related Articles</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map(r => (
                <Link key={r.id} href={`/blog/${getCategorySlug(BLOG_CATEGORIES, r._cat)}/${r.slug}`}
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