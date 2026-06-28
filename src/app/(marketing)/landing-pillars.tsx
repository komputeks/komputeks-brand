import { TrendingUp, BookOpen, Shield } from 'lucide-react';

const pillars = [
  {
    icon: TrendingUp,
    title: 'Leverage',
    description: 'Every product must increase leverage. Accomplish more with less — less money, less time, less hardware, less experience. More output, more knowledge, more opportunity.',
    color: 'text-brand-500',
    bg: 'bg-brand-100 dark:bg-brand-900/30',
  },
  {
    icon: BookOpen,
    title: 'Learning',
    description: 'Komputeks is a teaching organization, not merely a software company. Every product teaches. Every article teaches. Every community discussion teaches. Teaching is part of the product.',
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    icon: Shield,
    title: 'Ownership',
    description: 'The future belongs to people who own assets. Komputeks helps people build skills, audiences, businesses, data, and communities. Dependency is not the goal. Ownership is.',
    color: 'text-green-500',
    bg: 'bg-green-100 dark:bg-green-900/30',
  },
];

export function LandingPillars() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            The Three Pillars
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Everything we build serves one or more of these pillars.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description, color, bg }) => (
            <div key={title} className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${bg}`}>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}