import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 to-transparent dark:from-brand-950/20 dark:to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-200/20 via-transparent to-transparent dark:from-brand-900/10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-in mb-4 text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Technology is not the product. Business performance is.</p>
          <p className="animate-fade-in mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">Since 2015 · Building for reality</p>
          <h1 className="animate-fade-in-delay-1 text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
            For People{' '}
            <span className="bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-brand-500">
              Building Anyway
            </span>
          </h1>
          <p className="animate-fade-in-delay-2 mt-6 text-lg text-zinc-600 sm:text-xl dark:text-zinc-400">
            Komputeks is a leverage company. We build systems that help people with more determination than resources create better futures for themselves.
          </p>
          <div className="animate-fade-in-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Explore Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
