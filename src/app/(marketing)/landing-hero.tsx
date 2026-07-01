import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-surface-950 to-surface-950" />
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-brand-500/20 blur-[64px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[64px] animate-pulse-glow" />
      <div className="absolute inset-0 grid-bg" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-in mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-sm">
            Since 2015 · Building for reality
          </div>
          <h1 className="animate-fade-in-delay-1 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-[family-name:var(--font-display)] leading-tight">
            <span className="gradient-text">For People</span>
            <br />
            <span className="text-white">Building Anyway</span>
          </h1>
          <p className="animate-fade-in-delay-2 mt-6 text-base text-white/60 sm:text-lg max-w-2xl mx-auto">
            Komputeks is a leverage company. We build systems that help people with more determination than resources create better futures for themselves.
          </p>
          <div className="animate-fade-in-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/products" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:from-brand-500 hover:to-brand-400 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-[0.98]">
              Explore Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
