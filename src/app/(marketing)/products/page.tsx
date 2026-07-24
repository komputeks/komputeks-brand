import type { Metadata } from 'next';
import { getProducts } from '@/features/products/service';
import { ProductGrid } from '@/features/products/components/product-grid';

export const metadata: Metadata = { title: 'Products', description: 'Explore all Komputeks products — systems that help people create more value than their resources would normally allow.' };

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="relative pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15),_transparent,_transparent)]" />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="gradient-text">Our Products</span>
          </h1>
          <p className="mt-4 text-lg text-white/60">Every product is leverage. We build systems that help people create more value than their resources would normally allow.</p>
        </div>
        <div className="mt-12"><ProductGrid products={products} /></div>
      </div>
    </div>
  );
}