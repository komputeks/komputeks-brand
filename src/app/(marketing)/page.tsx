import { getProducts, getTestimonials, getFAQs } from '@/features/products/service';
import { LandingHero } from './landing-hero';
import { LandingProducts } from './landing-products';
import { LandingPillars } from './landing-pillars';
import { LandingGains } from './landing-gains';
import { LandingTestimonials } from './landing-testimonials';
import { LandingCTA } from './landing-cta';

export default async function LandingPage() {
  const [products, testimonials, faqs] = await Promise.all([
    getProducts(),
    getTestimonials(),
    getFAQs(),
  ]);

  return (
    <div className="min-h-screen bg-surface-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-surface-950 to-surface-950" />
      <div className="absolute top-0 left-[25%] w-24rem h-24rem bg-brand-500/20 rounded-full blur-[64px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-[25%] w-24rem h-24rem bg-cyan-500/20 rounded-full blur-[64px] animate-pulse-glow" />
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10">
        <LandingHero />
        <LandingProducts products={products} />
        <LandingPillars />
        <LandingGains />
        {testimonials.length > 0 && <LandingTestimonials testimonials={testimonials} />}
        <LandingCTA />
        {faqs.length > 0 && (
          <section className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="mb-8 text-center text-3xl font-bold font-display">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.slice(0, 5).map((faq) => (
                <details key={faq.id} className="group glass-card p-5">
                  <summary className="cursor-pointer font-semibold text-white">{faq.question}</summary>
                  <p className="mt-3 text-sm text-white/60">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}