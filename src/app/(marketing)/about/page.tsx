import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Komputeks is a leverage company. Our purpose is to help people with more determination than resources create better futures for themselves and others.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Not a SaaS company. Not an AI company. A{' '}
            <span className="text-brand-500">leverage</span> company.
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            Komputeks is the world&apos;s most trusted ecosystem for people building with limited resources. Not hobbyists. Not poor people. People with more determination than resources.
          </p>
        </div>
      </section>

      {/* What We Build For */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Most companies build for abundance</h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">They assume fast internet, expensive laptops, paid subscriptions, credit cards, multiple monitors, large teams, and venture funding.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-500 dark:text-brand-400">We build for reality</h2>
            <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
              {['Phones', 'Shared computers', 'Cyber cafes', 'Limited budgets', 'Rural internet', 'Self-learning', 'Side hustles', 'Solo builders'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Unfair Advantage */}
      <section className="border-y border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Our Unfair Advantage</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              We understand constraints from experience. Not from research. Not from reports. Not from user interviews. <em>From lived experience.</em>
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              'Built from a phone',
              'Learned from free resources',
              'Rebuilt after failure',
              'Operated with almost no capital',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="font-medium text-zinc-900 dark:text-white">Most founders have never {item.toLowerCase()}</p>
                <p className="mt-1 text-sm text-brand-600 dark:text-brand-400">We have.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Insight */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">The Core Insight</h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            The AI revolution is reducing the cost of creation. But it is not reducing the cost of understanding, judgment, trust, community, or real-world knowledge.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-left dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500">As software becomes free...</p>
              <p className="mt-1 text-lg font-semibold text-brand-600 dark:text-brand-400">Guidance becomes valuable</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-left dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500">As code becomes abundant...</p>
              <p className="mt-1 text-lg font-semibold text-brand-600 dark:text-brand-400">Direction becomes scarce</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Founder */}
      <section className="border-y border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">The Founder</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Simon Peter Muchoki Wokabi is not competing against billion-dollar companies. He competes against obscurity.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              His greatest asset is not code. It is perspective. He understands scarcity, learning, technology, farming, education, AI, and self-reliance.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Few people sit at that intersection. That intersection is the Komputeks monopoly.
            </p>
            <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-800 dark:bg-brand-950/30">
              <p className="text-lg font-medium text-zinc-900 dark:text-white">
                &ldquo;If you&apos;re building anyway — maybe a business, modernizing an organization, creating opportunities, learning a skill or simply trying to make tomorrow a little better than today — you probably don&apos;t have everything you need.&rdquo;
              </p>
              <p className="mt-2 text-sm text-brand-600 dark:text-brand-400">
                Luckily, progress has never belonged exclusively to people with the most resources, but those who keep building anyway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Compete On */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">What We Refuse To Compete On</h3>
            <ul className="mt-4 space-y-2 text-zinc-500 dark:text-zinc-500">
              {['AI model size', 'GPU count', 'Venture funding', 'Advertising budgets'].map((item) => (
                <li key={item} className="line-through">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-500 dark:text-brand-400">What We Compete On</h3>
            <ul className="mt-4 space-y-2 text-zinc-900 dark:text-white">
              {['Understanding', 'Practicality', 'Accessibility', 'Trust', 'Persistence'].map((item) => (
                <li key={item} className="flex items-center gap-2 font-medium">
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}