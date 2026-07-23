import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Changelog', description: 'Every change and decision in Komputeks.' };

const entries = [
  {
    date: 'June 2025',
    title: 'Komputeks Brand Website v2.0',
    changes: [
      'Complete UI/UX overhaul to match Erenexa design system with indigo/cyan brand, glass morphism, gradient text, Plus Jakarta Sans',
      'Added floating AI Chatbot with Komputeks AI integration',
      'Added connected accounts dashboard for GitHub, Vercel, Netlify, Cloudflare',
      'Added project detail page with deployment wizard',
      'Added AI providers admin management',
      'Added user AI providers dashboard',
      'Enhanced user dashboard with tabs for Analytics, Projects, AI, Deploy, Environments, Profile',
      'Added bot blocking middleware for AI scrapers',
      'Dark-only design matching brand identity',
    ],
    decisions: [
      'Switched from amber/gold to indigo/cyan brand colors to match Erenexa design system',
      'Removed light mode toggle since dark-only matches brand identity',
      'Added glass morphism cards with bg-white/5 backdrop-blur-xl',
      'Added gradient text effects from brand-400 through cyan to brand-400',
      'Added Plus Jakarta Sans for display headings',
      'Added floating AI chatbot for visitor engagement',
      'Added deployment wizard for one-click project deployment',
    ],
  },
  {
    date: 'June 2025',
    title: 'Komputeks Brand Website v1.0',
    changes: [
      'Initial launch with Next.js 15, TypeScript, Tailwind v4, Supabase',
      'Landing page, About, Products, Contact, FAQ, Privacy, Terms, Docs',
      'Auth with email/password and Google OAuth',
      'Admin dashboard and User dashboard',
      'PWA support and SEO optimization',
    ],
    decisions: [
      'Chose Next.js App Router over Pages Router',
      'Used Supabase Auth over NextAuth',
      'Defaulted to dark mode',
      'Used amber/gold accent color',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold font-display">Changelog</h1>
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
