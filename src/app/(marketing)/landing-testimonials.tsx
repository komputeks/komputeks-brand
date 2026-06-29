import type { Testimonial } from '@/features/products/types';
import { Quote } from 'lucide-react';

export function LandingTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="border-y border-white/10 bg-surface-900/50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold font-display">
          What People Say
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/10">
              <Quote className="mb-3 h-8 w-8 text-brand-400/50" />
              <p className="text-sm leading-relaxed text-white/60">{t.content}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}