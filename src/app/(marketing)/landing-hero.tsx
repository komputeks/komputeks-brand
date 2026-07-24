import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="relative z-10 px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-400">
            <Zap className="h-4 w-4" />
            Since 2015
          </div>
          <h1 className="animate-fade-in-delay-1 text-4xl font-bold font-display sm:text-6xl lg:text-7xl leading-tight">
            <span className="gradient-text">For People</span>
            <br />
            <span className="text-white">Building Anyway</span>
          </h1>
          <p className="animate-fade-in-delay-2 mt-6 text-lg text-white/60 sm:text-xl max-w-2xl mx-auto">
            Komputeks is the world&apos;s most trusted ecosystem for people building with limited resources. Not hobbyists. Not poor people. People with more determination than resources.
          </p>
          <div className="animate-fade-in-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:from-brand-500 hover:to-brand-400 hover:shadow-lg hover:shadow-brand-500/25 hover:scale-[1.02]"
            >
              Explore Products <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}