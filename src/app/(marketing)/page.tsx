import { getProducts, getTestimonials, getFAQs, getServices } from '@/features/products/service';
import { LandingHero } from './landing-hero';
import { LandingProducts } from './landing-products';
import { LandingServices } from './landing-services';
import { LandingPillars } from './landing-pillars';
import { LandingCTA } from './landing-cta';

export default async function LandingPage() {
  const [products, services, testimonials, faqs] = await Promise.all([
    getProducts(),
    getServices(),
    getTestimonials(),
    getFAQs(),
  ]);

  return (
    <div>
      <LandingHero />
      <LandingProducts products={products} />
      <LandingServices services={services} />
      <LandingPillars />
      <LandingCTA />
    </div>
  );
}
