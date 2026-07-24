'use client';

import { SubscribeForm } from '@/features/subscribers/components/subscribe-form';

export function LandingCTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Background orbs */}
      <div className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-brand-500/10 blur-[64px]" />
      <div className="absolute right-1/3 bottom-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[64px]" />

      <div className="relative z-10 rounded-2xl border border-white/10 bg-gradient-to-br from-brand-600/20 via-surface-950 to-cyan-500/10 p-8 text-center backdrop-blur-xl sm:p-12 sm:py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Start Building Anyway
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
          Join thousands of creators who refuse to wait for perfect conditions. Get updates on new tools, resources, and insights.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <SubscribeForm source="landing-cta" />
        </div>
      </div>
    </section>
  );
}