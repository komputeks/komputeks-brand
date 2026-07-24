import type { Metadata } from 'next';
import { getProducts, getTestimonials, getFAQs } from '@/features/products/service';
import { LandingHero } from './landing-hero';
import { LandingProducts } from './landing-products';
import { LandingPillars } from './landing-pillars';
import { LandingGains } from './landing-gains';
import { LandingTestimonials } from './landing-testimonials';
import { LandingCTA } from './landing-cta';

export default async function LandingPage() {
  const [products, testimonials, faqs] = await Promise.all([getProducts(), getTestimonials(), getFAQs()]);

  return (
    <div>
      <LandingHero />
      <LandingProducts products={products} />
      <LandingPillars />
      <LandingGains />
      {testimonials.length > 0 && <LandingTestimonials testimonials={testimonials} />}
      <LandingCTA />
      {faqs.length > 0 && (
        <section className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(99,102,241,0.1),_transparent,_transparent)]" />
          <div className="relative z-10">
            <h2 className="mb-8 text-center font-display text-3xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.slice(0, 5).map((faq) => (
                <details key={faq.id} className="group glass-card p-4">
                  <summary className="cursor-pointer font-medium text-white">{faq.question}</summary>
                  <p className="mt-2 text-sm text-white/60">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}