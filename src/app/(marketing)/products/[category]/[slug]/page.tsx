import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/features/products/service';
import { PRODUCT_CATEGORIES, getCategorySlug } from '@/features/products/types';
import { ProductDetailClient } from './product-detail-client';

interface Props { params: Promise<{ category: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Not Found' };
  return { title: product.name, description: product.tagline };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ category: getCategorySlug(PRODUCT_CATEGORIES, p.category), slug: p.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const all = await getProducts();
  const currentIndex = all.findIndex(p => p.slug === slug);
  const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  const related = all.filter(p => p.slug !== slug && p.category === product.category).slice(0, 3);
  const catSlug = getCategorySlug(PRODUCT_CATEGORIES, product.category);

  return <ProductDetailClient product={product} categorySlug={catSlug} prev={prev} next={next} related={related} />;
}