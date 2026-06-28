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
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">Roadmap</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">Upcoming features and growth experiments.</p>
        <div className="mt-10 space-y-8">
          {roadmap.map(({ phase, items }) => (
            <div key={phase}>
              <h2 className={`inline-block rounded-lg px-3 py-1 text-sm font-bold uppercase tracking-wider ${
                phase === 'Now' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                phase === 'Next' ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' :
                'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
              }`}>{phase}</h2>
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
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