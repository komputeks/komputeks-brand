import { TrendingUp, BookOpen, Shield } from 'lucide-react';

const pillars = [
  {
    icon: TrendingUp,
    title: 'Leverage',
    description: 'Every product must increase leverage. Accomplish more with less — less money, less time, less hardware, less experience. More output, more knowledge, more opportunity.',
    gradient: 'from-brand-500 to-brand-400',
  },
  {
    icon: BookOpen,
    title: 'Learning',
    description: 'Komputeks is a teaching organization, not merely a software company. Every product teaches. Every article teaches. Every community discussion teaches. Teaching is part of the product.',
    gradient: 'from-cyan-500 to-cyan-400',
  },
  {
    icon: Shield,
    title: 'Ownership',
    description: 'The future belongs to people who own assets. Komputeks helps people build skills, audiences, businesses, data, and communities. Dependency is not the goal. Ownership is.',
    gradient: 'from-green-500 to-green-400',
  },
];

export function LandingPillars() {
  return (
    <section className="border-y border-white/10 bg-surface-900/50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold font-display">The Three Pillars</h2>
          <p className="mt-3 text-white/60">
            Everything we build serves one or more of these pillars.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description, gradient }) => (
            <div key={title} className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}> 
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold font-display">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}