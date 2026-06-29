import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-surface-950 to-surface-950" />
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-brand-500/20 blur-[64px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[64px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-400">
            <Sparkles className="h-4 w-4" />
            Since 2015
          </div>
          <h1 className="text-5xl font-bold font-display leading-tight md:text-7xl">
            <span className="gradient-text">For People</span>
            <br />
            <span className="text-white">Building Anyway</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 md:text-xl">
            Komputeks is the world&apos;s most trusted ecosystem for people building with limited resources. Not hobbyists. People with more determination than resources.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:from-brand-500 hover:to-brand-400 hover:shadow-brand-500/40 hover:scale-[1.02]"
            >
              Explore Products <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}