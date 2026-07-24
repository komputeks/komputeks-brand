import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Every change, decision, and anti-pattern avoided.',
};

const entries = [
  {
    date: 'June 2025',
    title: 'Komputeks Brand Website v1.0',
    changes: [
      'Initial launch with Next.js 15 App Router, TypeScript, Tailwind CSS v4, Supabase.',
      'Landing page with hero, products showcase, three pillars, email capture.',
      'About page with founder story, monopoly, and competitive positioning.',
      'Products page with category filtering and status badges.',
      'Contact form with validation and Supabase persistence.',
      'Auth with email/password and Google OAuth via Supabase.',
      'Admin dashboard for content management.',
      'PWA support with manifest and service worker.',
      'SEO optimization with sitemap, robots.txt, JSON-LD, and meta tags.',
      'Dark/light/system theme toggle.',
      'UI overhaul matching Erenexa design system (glass cards, gradient text, surface-950 bg).',
    ],
    decisions: [
      'Chose Next.js App Router over Pages Router for Server Components.',
      'Used Supabase for auth, database, and storage — free tier friendly.',
      'Defaulted to dark mode to match the brand identity.',
      'Adopted Erenexa UI system: indigo brand + cyan accent + surface slate + glass morphism.',
      'Used Zod for all validation on both client and server.',
      'No secrets in vercel.json — env vars set via Vercel API only.',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="relative overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/10 via-surface-950 to-surface-950" />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold font-display tracking-tight">
          <span className="gradient-text">Changelog</span>
        </h1>
        <p className="mt-4 text-lg text-white/60">Every change, decision, and anti-pattern avoided.</p>
        <div className="mt-10 space-y-10">
          {entries.map((entry) => (
            <article key={entry.title} className="glass-card p-6">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-brand-500/10 border border-brand-500/20 px-3 py-1 text-xs font-medium text-brand-400">{entry.date}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold font-display">{entry.title}</h2>
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