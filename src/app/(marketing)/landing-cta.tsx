'use client';

import { SubscribeForm } from '@/features/subscribers/components/subscribe-form';

export function LandingCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Start Building Anyway
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
          Join thousands of creators who refuse to wait for perfect conditions. Get updates on new tools, resources, and insights.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <SubscribeForm source="landing-cta" />
        </div>
      </div>
    </section>
  );
}