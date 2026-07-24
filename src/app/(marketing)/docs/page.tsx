import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, Map } from 'lucide-react';

export const metadata: Metadata = { title: 'Documentation', description: 'Learn how to use Komputeks products.' };

const docPages = [
  { href: '/docs/user-manual', icon: BookOpen, title: 'User Manual', description: 'How to use Komputeks products effectively.', gradient: 'from-brand-500 to-brand-400' },
  { href: '/docs/changelog', icon: Clock, title: 'Changelog', description: 'Every change, decision, and anti-pattern avoided.', gradient: 'from-cyan-500 to-brand-400' },
  { href: '/docs/roadmap', icon: Map, title: 'Roadmap', description: 'Upcoming features and growth experiments.', gradient: 'from-green-500 to-cyan-400' },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-surface-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-surface-950 to-surface-950" />
      <div className="relative z-10 pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold font-display sm:text-5xl">Documentation</h1>
            <p className="mt-4 text-lg text-white/60">Everything you need to know about Komputeks.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {docPages.map(({ href, icon: Icon, title, description, gradient }) => (
              <Link key={href} href={href} className="group glass-card p-6 hover:bg-white/10 transition-all duration-300">
                <div className={`mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradient}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold font-display group-hover:text-brand-400 transition-colors">{title}</h2>
                <p className="mt-2 text-sm text-white/60">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}