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
      'Dark/light/system theme toggle.',
    ],
    decisions: [
      'Chose Next.js App Router over Pages Router for Server Components and better performance.',
      'Used Supabase for auth, database, and storage to stay free-tier friendly.',
      'Defaulted to dark mode to match the brand identity.',
      'Used amber/gold as the accent color to represent value and determination.',
      'Avoided NextAuth in favor of Supabase Auth for tighter integration and free tier compatibility.',
      'Used Zod for all validation on both client and server.',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">Changelog</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">Every change, decision, and anti-pattern avoided.</p>
        <div className="mt-10 space-y-10">
          {entries.map((entry) => (
            <article key={entry.title} className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">{entry.date}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-zinc-900 dark:text-white">{entry.title}</h2>
              <div className="mt-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Changes</h3>
                <ul className="mt-2 space-y-1">
                  {entry.changes.map((change) => (
                    <li key={change} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Architectural Decisions</h3>
                <ul className="mt-2 space-y-1">
                  {entry.decisions.map((decision) => (
                    <li key={decision} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
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