import type { Metadata } from 'next';
import { getProducts } from '@/features/products/service';
import { ProductGrid } from '@/features/products/components/product-grid';
export const metadata: Metadata = { title: 'Products', description: 'Explore all Komputeks products.' };
export default async function ProductsPage() {
  const products = await getProducts();
  return (<div className="pt-28 pb-20"><div className="mx-auto max-w-7xl px-6"><div className="mx-auto max-w-3xl"><h1 className="text-4xl font-bold font-display sm:text-5xl">Our Products</h1><p className="mt-4 text-lg text-white/60">Every product is leverage. We build systems that help people create more value than their resources would normally allow.</p></div><div className="mt-12"><ProductGrid products={products} /></div></div></div>);
}