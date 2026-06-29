import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Roadmap', description: 'Upcoming features and growth experiments.' };

const roadmap = [
  { phase: 'Now', items: ['Launch brand website', 'Supabase auth', 'Admin dashboard', 'PWA support', 'SEO optimization'], color: 'green' },
  { phase: 'Next', items: ['Blog system', 'Product-specific docs', 'Email notifications', 'Google Knowledge Panel', 'Social media integration'], color: 'brand' },
  { phase: 'Future', items: ['AI chatbot', 'Community forum', 'Referral flow', 'Android TWA/APK', 'Analytics dashboard', 'Multi-language'], color: 'white' },
];

export default function RoadmapPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold font-display"><span className="gradient-text">Roadmap</span></h1>
        <p className="mt-4 text-lg text-white/60">Upcoming features and growth experiments.</p>
        <div className="mt-10 space-y-8">
          {roadmap.map(({ phase, items, color }) => (
            <div key={phase} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className={`inline-block rounded-lg px-3 py-1 text-sm font-bold uppercase tracking-wider ${
                color === 'green' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                color === 'brand' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' :
                'bg-white/10 text-white/80'
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