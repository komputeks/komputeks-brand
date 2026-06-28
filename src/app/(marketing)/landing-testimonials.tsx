import type { Testimonial } from '@/features/products/types';
import { Quote } from 'lucide-react';

export function LandingTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          What People Say
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <Quote className="mb-3 h-8 w-8 text-brand-400" />
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{t.content}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}