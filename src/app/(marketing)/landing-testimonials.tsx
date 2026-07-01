import type { Testimonial } from '@/features/products/types';
import { Quote } from 'lucide-react';

export function LandingTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="border-y border-white/5 bg-surface-900/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
          What People Say
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="glass-card p-6">
              <Quote className="mb-3 h-8 w-8 text-brand-400/50" />
              <p className="text-sm leading-relaxed text-white/60">{t.content}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-cyan-500 text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}