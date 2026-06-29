import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Changelog', description: 'Every change, decision, and anti-pattern avoided.' };

const entries = [
  {
    date: 'June 2025',
    title: 'Komputeks Brand Website v1.0',
    changes: [
      'Initial launch with Next.js 15 App Router, TypeScript, Tailwind CSS v4, and Supabase.',
      'Landing page with hero, products showcase, three pillars, gains, testimonials, and email capture.',
      'About page with founder story, monopoly, and competitive positioning.',
      'Products page with category filtering and status badges.',
      'Contact form with validation and Supabase persistence.',
      'Authentication with email/password and Google OAuth via Supabase.',
      'Admin dashboard for content management.',
      'PWA support with manifest and service worker.',
      'SEO optimization with sitemap, robots.txt, JSON-LD, and meta tags.',
      'UI redesigned to match Erenexa design system — dark glassmorphism.',
    ],
    decisions: [
      'Chose Next.js App Router for Server Components and better performance.',
      'Used Supabase for auth, database, and storage to stay free-tier friendly.',
      'Adopted Erenexa design language: glass cards, gradient text, indigo/cyan brand.',
      'Used Zod for all validation on both client and server.',
      'Dark-only design matching the brand identity.',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold font-display"><span className="gradient-text">Changelog</span></h1>
        <p className="mt-4 text-lg text-white/60">Every change, decision, and anti-pattern avoided.</p>
        <div className="mt-10 space-y-10">
          {entries.map((entry) => (
            <article key={entry.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400 border border-brand-500/20">{entry.date}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold font-display">{entry.title}</h2>
              <div className="mt-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">Changes</h3>
                <ul className="mt-2 space-y-1">
                  {entry.changes.map((change) => (
                    <li key={change} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400" />
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">Architectural Decisions</h3>
                <ul className="mt-2 space-y-1">
                  {entry.decisions.map((decision) => (
                    <li key={decision} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                      {decision}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}