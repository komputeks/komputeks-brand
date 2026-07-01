import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.2),#020617,#020617)]" />
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-brand-500/20 blur-[64px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[64px] animate-pulse-glow" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-400">
            <Sparkles className="h-4 w-4" />
            Since 2015
          </div>
          <h1 className="animate-fade-in-delay-1 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-[family-name:var(--font-display)]">
            <span className="gradient-text">For People</span>
            <br />
            <span className="text-white">Building Anyway</span>
          </h1>
          <p className="animate-fade-in-delay-2 mt-6 text-lg text-white/60 sm:text-xl">
            Komputeks is the world&apos;s most trusted ecosystem for people building with limited resources. Not hobbyists. Not poor people. People with more determination than resources.
          </p>
          <div className="animate-fade-in-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:scale-[1.02]"
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}