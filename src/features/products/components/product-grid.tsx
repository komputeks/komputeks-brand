'use client';

import { useState } from 'react';
import { ProductCard } from './product-card';
import type { Product } from '../types';

const categories = ['All', 'Storage', 'Commerce', 'Developer Tools', 'AI & Automation', 'Communication', 'Finance', 'Information', 'Social', 'Media'];

export function ProductGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? products
    : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === cat
                ? 'bg-brand-500 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="py-12 text-center text-zinc-500 dark:text-zinc-400">
          No products in this category yet.
        </div>
      )}
    </div>
  );
}