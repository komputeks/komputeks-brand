'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/docs', label: 'Docs' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-surface-950/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold font-display">Komputeks</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === href
                  ? 'text-brand-400 bg-brand-500/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:from-brand-500 hover:to-brand-400 hover:shadow-lg hover:shadow-brand-500/25 md:inline-flex"
          >
            Sign In
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-surface-950/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  pathname === href
                    ? 'text-brand-400 bg-brand-500/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                {label}
              </Link>
            ))}
            <hr className="my-2 border-white/10" />
            <Link
              href="/login"
              className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}