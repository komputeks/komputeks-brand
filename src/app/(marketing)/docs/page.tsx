import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, Map } from 'lucide-react';

export const metadata: Metadata = { title: 'Documentation', description: 'Learn how to use Komputeks products.' };

const docPages = [
  { href: '/docs/user-manual', icon: BookOpen, title: 'User Manual', description: 'How to use Komputeks products effectively.' },
  { href: '/docs/changelog', icon: Clock, title: 'Changelog', description: 'Every change, decision, and anti-pattern avoided.' },
  { href: '/docs/roadmap', icon: Map, title: 'Roadmap', description: 'Upcoming features and growth experiments.' },
];

export default function DocsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold font-display"><span className="gradient-text">Documentation</span></h1>
          <p className="mt-4 text-lg text-white/60">Everything you need to know about Komputeks.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docPages.map(({ href, icon: Icon, title, description }) => (
            <Link key={href} href={href} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
              <Icon className="mb-4 h-8 w-8 text-brand-400" />
              <h2 className="text-lg font-semibold font-display text-white group-hover:text-brand-400">{title}</h2>
              <p className="mt-2 text-sm text-white/60">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}