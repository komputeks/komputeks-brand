import Link from 'next/link';
import { ProductGrid } from '@/features/products/components/product-grid';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/features/products/types';

export function LandingProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            What We Build
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Systems that help people create more value than their resources would normally allow.
          </p>
        </div>
        <Link
          href="/products"
          className="hidden items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 sm:flex"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ProductGrid products={products.slice(0, 6)} />
      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400"
        >
          View all products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}