import type { Metadata } from 'next';
import { getProducts } from '@/features/products/service';
import { ProductGrid } from '@/features/products/components/product-grid';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore all Komputeks products — systems that help people create more value than their resources would normally allow.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Our Products
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Every product is leverage. We build systems that help people create more value than their resources would normally allow.
          </p>
        </div>
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}