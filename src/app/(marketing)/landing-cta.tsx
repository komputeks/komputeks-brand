'use client';

import { SubscribeForm } from '@/features/subscribers/components/subscribe-form';

export function LandingCTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-600/20 via-surface-900 to-cyan-500/20 p-8 sm:p-12">
        {/* Glow effects */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-brand-500/20 blur-[64px]" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/20 blur-[64px]" />

        <div className="relative text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-[family-name:var(--font-display)]">
            Start Building Anyway
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
            Join thousands of creators who refuse to wait for perfect conditions. Get updates on new tools, resources, and insights.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <SubscribeForm source="landing-cta" />
          </div>
        </div>
      </div>
    </section>
  );
}