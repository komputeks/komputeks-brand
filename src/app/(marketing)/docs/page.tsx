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
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">Documentation</h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Everything you need to know about Komputeks — from getting started to understanding our architectural decisions.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docPages.map(({ href, icon: Icon, title, description }) => (
            <Link key={href} href={href} className="group rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-brand-500/5 dark:border-zinc-800 dark:bg-zinc-900">
              <Icon className="mb-4 h-8 w-8 text-brand-500" />
              <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">{title}</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}