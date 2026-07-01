const gains = [
  { title: 'Faster Execution', description: 'Reduce the time between identifying an opportunity and deploying a solution.' },
  { title: 'Operational Efficiency', description: 'Replace repetitive work with reliable systems.' },
  { title: 'Better Decision-Making', description: 'Transform data, processes, and information into actionable intelligence.' },
  { title: 'Revenue Growth', description: 'Deploy technology that supports acquisition, retention, conversion, and expansion.' },
  { title: 'Competitive Advantage', description: 'Adopt emerging technologies before they become industry standards.' },
];

export function LandingGains() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
          What You Gain
        </h2>
        <p className="mt-3 text-white/50">
          They charge you for these, but we give you FREE.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gains.map((gain) => (
          <div key={gain.title} className="glass-card p-6 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white">{gain.title}</h3>
            <p className="mt-2 text-sm text-white/50">{gain.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-2xl border border-brand-500/20 bg-brand-500/5 p-8 text-center backdrop-blur-xl">
        <p className="text-lg font-medium text-white">
          Take assured actions today with what you have. The momentum will follow.
        </p>
      </div>
    </section>
  );
}