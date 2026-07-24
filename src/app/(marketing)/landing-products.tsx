import { ArrowRight as ArrowRightIcon } from 'lucide-react';
import { ProductGrid } from '@/features/products/components/product-grid';
import Link from 'next/link';
import type { Product } from '@/features/products/types';

export function LandingProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            What We Build
          </h2>
          <p className="mt-2 text-white/60">
            Systems that help people create more value than their resources would normally allow.
          </p>
        </div>
        <Link
          href="/products"
          className="hidden items-center gap-1 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300 sm:flex"
        >
          View all <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <ProductGrid products={products.slice(0, 6)} />
      <div className="mt-8 text-center sm:hidden">
        <Link href="/products" className="inline-flex items-center gap-1 text-sm font-medium text-brand-400">
          View all products <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}