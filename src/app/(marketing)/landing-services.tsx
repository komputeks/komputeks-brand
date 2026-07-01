import Link from 'next/link';
import type { Service } from '@/features/products/types';
import { SERVICE_CATEGORIES, getCategorySlug } from '@/features/products/types';

export function LandingServices({ services }: { services: Service[] }) {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">What we do</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">Practical execution, not theory.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map(svc => (
            <Link key={svc.id} href={`/services/${getCategorySlug(SERVICE_CATEGORIES, svc.category)}/${svc.slug}`}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-brand-500/5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-lg font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                  {svc.icon_letter || svc.title.charAt(0)}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">{svc.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{svc.excerpt}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/services" className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">All services →</Link>
        </div>
      </div>
    </section>
  );
}
