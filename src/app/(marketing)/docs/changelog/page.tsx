import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Every change, decision, and anti-pattern avoided in Komputeks.',
};

const entries = [
  {
    date: 'June 2025',
    title: 'Komputeks Brand Website v1.0',
    changes: [
      'Initial launch of the Komputeks brand website built with Next.js 15 App Router, TypeScript, Tailwind CSS v4, and Supabase.',
      'Landing page with hero, products showcase, three pillars, gains, testimonials, and email capture.',
      'About page with founder story, monopoly, and competitive positioning.',
      'Products page with category filtering and status badges.',
      'Contact form with validation and Supabase persistence.',
      'FAQ page with accordion-style answers.',
      'Privacy Policy and Terms of Service pages.',
      'Documentation section with User Manual, Changelog, and Roadmap.',
      'Authentication with email/password and Google OAuth via Supabase.',
      'Admin dashboard for content management.',
      'User dashboard for profile and preferences.',
      'PWA support with manifest and service worker.',
      'SEO optimization with sitemap, robots.txt, JSON-LD, and meta tags.',
      'Dark-only UI with glass morphism, gradient text, and blur effects.',
    ],
    decisions: [
      'Chose Next.js App Router over Pages Router for Server Components and better performance.',
      'Used Supabase for auth, database, and storage to stay free-tier friendly.',
      'Adopted Erenexa-style dark glass morphism UI with indigo/cyan gradient accents.',
      'Used Inter + Plus Jakarta Sans via next/font for premium typography.',
      'Avoided NextAuth in favor of Supabase Auth for tighter integration and free tier compatibility.',
      'Used Zod for all validation on both client and server.',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-[family-name:var(--font-display)]">
          <span className="gradient-text">Changelog</span>
        </h1>
        <p className="mt-4 text-lg text-white/60">Every change, decision, and anti-pattern avoided.</p>
        <div className="mt-10 space-y-10">
          {entries.map((entry) => (
            <article key={entry.title} className="glass-card p-6">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400 border border-brand-500/20">{entry.date}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-white font-[family-name:var(--font-display)]">{entry.title}</h2>
              <div className="mt-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">Changes</h3>
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
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">Architectural Decisions</h3>
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