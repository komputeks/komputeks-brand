import type { Metadata } from 'next';
import { getServices } from '@/features/products/service';
import { ServicesListClient } from './services-list-client';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Practical execution, not theory. Does it produce a measurable business outcome?',
};

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesListClient services={services} />;
}