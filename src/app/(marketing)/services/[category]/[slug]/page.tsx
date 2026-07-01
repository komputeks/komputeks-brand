import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/features/products/service';
import { SERVICE_CATEGORIES, getCategorySlug } from '@/features/products/types';
import { ServiceDetailClient } from './service-detail-client';

interface Props { params: Promise<{ category: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = await getServiceBySlug(slug);
  if (!svc) return { title: 'Not Found' };
  return { title: svc.title, description: svc.excerpt };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map(svc => ({ category: getCategorySlug(SERVICE_CATEGORIES, svc.category), slug: svc.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const svc = await getServiceBySlug(slug);
  if (!svc) notFound();

  const all = await getServices();
  const currentIndex = all.findIndex(s => s.slug === slug);
  const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  const related = all.filter(s => s.slug !== slug && s.category === svc.category).slice(0, 3);
  const catSlug = getCategorySlug(SERVICE_CATEGORIES, svc.category);

  return <ServiceDetailClient service={svc} categorySlug={catSlug} prev={prev} next={next} related={related} />;
}