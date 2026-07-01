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
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
              active === cat
                ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/25'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
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
        <div className="py-12 text-center text-white/40">
          No products in this category yet.
        </div>
      )}
    </div>
  );
}