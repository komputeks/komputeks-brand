'use client';

import { SubscribeForm } from '@/features/subscribers/components/subscribe-form';

export function LandingCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-cyan-600 px-6 py-12 text-center sm:px-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold font-display sm:text-4xl">Start Building Anyway</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">Join thousands of creators who refuse to wait for perfect conditions. Get updates on new tools, resources, and insights.</p>
          <div className="mx-auto mt-8 max-w-md"><SubscribeForm source="landing-cta" /></div>
        </div>
      </div>
    </section>
  );
}