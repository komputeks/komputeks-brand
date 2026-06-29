import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Komputeks is a leverage company. Our purpose is to help people with more determination than resources create better futures for themselves and others.',
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-surface-950 to-surface-950" />
      <div className="relative z-10 pt-28 pb-20">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold font-display sm:text-5xl">
              Not a SaaS company. Not an AI company. A{' '}
              <span className="gradient-text">leverage</span> company.
            </h1>
            <p className="mt-6 text-lg text-white/60">
              Komputeks is the world&apos;s most trusted ecosystem for people building with limited resources. Not hobbyists. Not poor people. People with more determination than resources.
            </p>
          </div>
        </section>

        {/* What We Build For */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="text-2xl font-bold font-display">Most companies build for abundance</h2>
              <p className="mt-4 text-white/60">They assume fast internet, expensive laptops, paid subscriptions, credit cards, multiple monitors, large teams, and venture funding.</p>
            </div>
            <div className="rounded-2xl border border-brand-500/20 bg-brand-500/5 p-8 backdrop-blur-xl">
              <h2 className="text-2xl font-bold gradient-text">We build for reality</h2>
              <ul className="mt-4 space-y-2 text-white/60">
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
        <section className="border-y border-white/10 bg-surface-900/50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold font-display">Our Unfair Advantage</h2>
              <p className="mt-4 text-lg text-white/60">
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
                <div key={item} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/10">
                  <p className="font-medium text-white/80">Most founders have never {item.toLowerCase()}</p>
                  <p className="mt-1 text-sm text-brand-400">We have.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Insight */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold font-display">The Core Insight</h2>
            <p className="mt-6 text-lg text-white/60">
              The AI revolution is reducing the cost of creation. But it is not reducing the cost of understanding, judgment, trust, community, or real-world knowledge.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl">
                <p className="text-sm text-white/50">As software becomes free...</p>
                <p className="mt-1 text-lg font-semibold text-brand-400">Guidance becomes valuable</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl">
                <p className="text-sm text-white/50">As code becomes abundant...</p>
                <p className="mt-1 text-lg font-semibold text-cyan-400">Direction becomes scarce</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Founder */}
        <section className="border-y border-white/10 bg-surface-900/50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold font-display">The Founder</h2>
              <p className="mt-4 text-lg text-white/60">
                Simon Peter Muchoki Wokabi is not competing against billion-dollar companies. He competes against obscurity.
              </p>
              <p className="mt-4 text-white/60">
                His greatest asset is not code. It is perspective. He understands scarcity, learning, technology, farming, education, AI, and self-reliance.
              </p>
              <p className="mt-4 text-white/60">
                Few people sit at that intersection. That intersection is the Komputeks monopoly.
              </p>
              <div className="mt-8 rounded-2xl border border-brand-500/20 bg-brand-500/5 p-6 backdrop-blur-xl">
                <p className="text-lg font-medium font-display">
                  &ldquo;If you&apos;re building anyway — maybe a business, modernizing an organization, creating opportunities, learning a skill or simply trying to make tomorrow a little better than today — you probably don&apos;t have everything you need.&rdquo;
                </p>
                <p className="mt-2 text-sm text-brand-400">
                  Luckily, progress has never belonged exclusively to people with the most resources, but those who keep building anyway.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Compete On */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold font-display">What We Refuse To Compete On</h3>
              <ul className="mt-4 space-y-2 text-white/40">
                {['AI model size', 'GPU count', 'Venture funding', 'Advertising budgets'].map((item) => (
                  <li key={item} className="line-through">{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-500/20 bg-brand-500/5 p-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold gradient-text">What We Compete On</h3>
              <ul className="mt-4 space-y-2">
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
    </div>
  );
}