import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Roadmap', description: 'Upcoming features and growth experiments.' };

const roadmap = [
  { phase: 'Now', color: 'border-green-500/20 bg-green-500/10 text-green-400', items: ['Launch brand website with all marketing pages', 'Set up Supabase auth with email and Google OAuth', 'Admin dashboard for content management', 'PWA support for mobile installation', 'SEO optimization for discoverability'] },
  { phase: 'Next', color: 'border-brand-500/20 bg-brand-500/10 text-brand-400', items: ['Blog system with rich text editor', 'Product-specific documentation pages', 'Email notification system for subscribers', 'Google Knowledge Panel optimization', 'Social media integration (auto-posting)'] },
  { phase: 'Future', color: 'border-white/10 bg-white/5 text-white/60', items: ['Komputeks AI chatbot integration', 'Community forum / discussion board', 'Referral and invite flow', 'Android TWA / APK generation', 'Analytics dashboard for admin', 'Multi-language support'] }
];

export default function RoadmapPage() {
  return (
    <div className="relative pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.1),_transparent,_transparent)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Roadmap</h1>
        <p className="mt-4 text-lg text-white/60">Upcoming features and growth experiments.</p>
        <div className="mt-10 space-y-8">
          {roadmap.map(({ phase, color, items }) => (
            <div key={phase}>
              <span className={`inline-block rounded-lg px-3 py-1 text-sm font-bold uppercase tracking-wider border ${color}`}>{phase}</span>
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-white/60">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}