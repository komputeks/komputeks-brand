const gains = [
  { title: 'Faster Execution', description: 'Reduce the time between identifying an opportunity and deploying a solution.' },
  { title: 'Operational Efficiency', description: 'Replace repetitive work with reliable systems.' },
  { title: 'Better Decision-Making', description: 'Transform data, processes, and information into actionable intelligence.' },
  { title: 'Revenue Growth', description: 'Deploy technology that supports acquisition, retention, conversion, and expansion.' },
  { title: 'Competitive Advantage', description: 'Adopt emerging technologies before they become industry standards.' },
];

export function LandingGains() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold font-display">What You Gain</h2>
        <p className="mt-3 text-white/60">
          They charge you for these, but we give you FREE.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gains.map((gain) => (
          <div key={gain.title} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
            <h3 className="text-lg font-semibold font-display">{gain.title}</h3>
            <p className="mt-2 text-sm text-white/60">{gain.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-2xl border border-brand-500/20 bg-brand-500/5 p-8 text-center backdrop-blur-xl">
        <p className="text-lg font-medium font-display">
          Take assured actions today with what you have. The momentum will follow.
        </p>
      </div>
    </section>
  );
}