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
    <div>
      <LandingHero />
      <LandingProducts products={products} />
      <LandingPillars />
      <LandingGains />
      {testimonials.length > 0 && <LandingTestimonials testimonials={testimonials} />}
      <LandingCTA />
      {faqs.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="mb-8 text-center text-3xl font-bold font-display">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.slice(0, 5).map((faq) => (
              <details key={faq.id} className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <summary className="cursor-pointer font-medium text-white">{faq.question}</summary>
                <p className="mt-2 text-sm text-white/60">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}