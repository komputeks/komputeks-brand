import type { Metadata } from 'next';
import { getProducts } from '@/features/products/service';
import { ProductsListClient } from './products-list-client';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Every product is leverage. Here\'s what we\'ve built.',
};

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsListClient products={products} />;
}