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
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.slice(0, 5).map((faq) => (
              <details key={faq.id} className="group rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <summary className="cursor-pointer font-medium text-zinc-900 dark:text-white">{faq.question}</summary>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}