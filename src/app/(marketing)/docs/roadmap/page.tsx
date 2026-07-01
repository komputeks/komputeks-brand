import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'Upcoming features and growth experiments for Komputeks.',
};

const roadmap = [
  {
    phase: 'Now',
    items: [
      'Launch brand website with all marketing pages',
      'Set up Supabase auth with email and Google OAuth',
      'Admin dashboard for content management',
      'PWA support for mobile installation',
      'SEO optimization for discoverability',
    ],
  },
  {
    phase: 'Next',
    items: [
      'Blog system with rich text editor',
      'Product-specific documentation pages',
      'Email notification system for subscribers',
      'Google Knowledge Panel optimization',
      'Social media integration (auto-posting)',
    ],
  },
  {
    phase: 'Future',
    items: [
      'Komputeks AI chatbot integration',
      'Community forum / discussion board',
      'Referral and invite flow',
      'Android TWA / APK generation',
      'Analytics dashboard for admin',
      'Multi-language support',
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-[family-name:var(--font-display)]">
          <span className="gradient-text">Roadmap</span>
        </h1>
        <p className="mt-4 text-lg text-white/60">Upcoming features and growth experiments.</p>
        <div className="mt-10 space-y-8">
          {roadmap.map(({ phase, items }) => (
            <div key={phase}>
              <h2 className={`inline-block rounded-full px-3 py-1 text-sm font-bold uppercase tracking-wider ${
                phase === 'Now' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                phase === 'Next' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' :
                'bg-white/5 text-white/50 border border-white/10'
              }`}>{phase}</h2>
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-white/60">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                    {item}
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