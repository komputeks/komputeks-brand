import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, Map } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Learn how to use Komputeks products and stay updated on our progress.',
};

const docPages = [
  { href: '/docs/user-manual', icon: BookOpen, title: 'User Manual', description: 'How to use Komputeks products effectively.' },
  { href: '/docs/changelog', icon: Clock, title: 'Changelog', description: 'Every change, decision, and anti-pattern avoided.' },
  { href: '/docs/roadmap', icon: Map, title: 'Roadmap', description: 'Upcoming features and growth experiments.' },
];

export default function DocsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-[family-name:var(--font-display)]">
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Everything you need to know about Komputeks — from getting started to understanding our architectural decisions.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docPages.map(({ href, icon: Icon, title, description }) => (
            <Link key={href} href={href} className="group glass-card p-6 hover:bg-white/10 transition-all duration-300">
              <Icon className="mb-4 h-8 w-8 text-brand-400" />
              <h2 className="text-lg font-semibold text-white group-hover:text-brand-400 font-[family-name:var(--font-display)]">{title}</h2>
              <p className="mt-2 text-sm text-white/50">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}