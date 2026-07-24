'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Package, Wrench, FileText, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/products', icon: Package, label: 'Products' },
  { href: '/services', icon: Wrench, label: 'Services' },
  { href: '/blog', icon: FileText, label: 'Blog' },
  { href: '/search', icon: Search, label: 'Search' },
];

export function MobileBottomNav() {
  const [active, setActive] = useState('/');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white px-2 py-2 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} onClick={() => setActive(href)} className={cn('flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-xs transition-colors', active === href ? 'text-brand-600 dark:text-brand-400' : 'text-zinc-500 dark:text-zinc-500')}>
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
        <Link href="/dashboard" className={cn('flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-xs text-zinc-500 dark:text-zinc-500')}>
          <User className="h-5 w-5" />
          Account
        </Link>
      </div>
    </nav>
  );
}