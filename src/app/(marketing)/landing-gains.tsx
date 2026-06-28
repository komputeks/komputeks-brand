const gains = [
  { title: 'Faster Execution', description: 'Reduce the time between identifying an opportunity and deploying a solution.' },
  { title: 'Operational Efficiency', description: 'Replace repetitive work with reliable systems.' },
  { title: 'Better Decision-Making', description: 'Transform data, processes, and information into actionable intelligence.' },
  { title: 'Revenue Growth', description: 'Deploy technology that supports acquisition, retention, conversion, and expansion.' },
  { title: 'Competitive Advantage', description: 'Adopt emerging technologies before they become industry standards.' },
];

export function LandingGains() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          What You Gain
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          They charge you for these, but we give you FREE.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gains.map((gain) => (
          <div key={gain.title} className="rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{gain.title}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{gain.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-xl border border-brand-200 bg-brand-50 p-8 text-center dark:border-brand-800 dark:bg-brand-950/30">
        <p className="text-lg font-medium text-zinc-900 dark:text-white">
          Take assured actions today with what you have. The momentum will follow.
        </p>
      </div>
    </section>
  );
}