import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'User Manual', description: 'How to use Komputeks products effectively.' };

export default function UserManualPage() {
  return (
    <div className="relative pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.1),_transparent,_transparent)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">User Manual</h1>
        <div className="mt-8 space-y-8 text-white/60">
          {[['Getting Started', 'Welcome to Komputeks. Here is how to get the most out of our ecosystem:', ['Browse Products — Visit the Products page to explore all available tools. Each product shows its current status and a link to try it.', 'Create an Account — Sign up with your email or Google account. This gives you access to dashboards, saved preferences, and personalized features.', 'Subscribe to Updates — Enter your email on the homepage or any CTA section to receive updates about new products and features.', 'Explore Documentation — Each product has its own documentation. Start here for general guidance.']],
            ['Product Categories', 'Our products span multiple categories:', ['Storage — Telecloud and other tools for file management and cloud storage leverage.', 'Commerce — Madeal and shopping tools for buying, selling, and deals.', 'Developer Tools — SheetSync, SecretForge, and other tools for developers.', 'AI & Automation — AI-powered tools for content, search, and automation.', 'Communication — SMS, email, and messaging tools.']],
            ['Free Tier Philosophy', 'Every Komputeks product is designed to be useful on the free tier. We believe constraints are not the opposite of opportunity — they are where innovation begins. Paid features enhance existing functionality but never gate core value.'],
            ['Need Help?', 'Visit the Contact page to send us a message. We read every message and respond as quickly as possible.']
          ].map(([title, intro, items], idx) => (
            <section key={idx} className="glass-card p-6">
              <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm">{intro}</p>
              {Array.isArray(items) && <ul className="mt-3 list-inside list-decimal space-y-2 text-sm">
                {items.map((item: string) => <li key={item}>{item}</li>)}
              </ul>}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}