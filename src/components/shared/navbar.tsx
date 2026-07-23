'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' }, { href: '/about', label: 'About' }, { href: '/products', label: 'Products' }, { href: '/docs', label: 'Docs' }, { href: '/faq', label: 'FAQ' }, { href: '/contact', label: 'Contact' },
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

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-surface-950/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent')}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold font-display">Komputeks</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={cn('px-3 py-2 text-sm font-medium rounded-lg transition-colors', pathname === href ? 'text-brand-400 bg-brand-500/10' : 'text-white/70 hover:text-white hover:bg-white/5')}>{label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block"><span className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors">Sign In</span></Link>
          <Link href="/signup" className="hidden md:block">
            <span className="px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all">Get Started</span>
          </Link>
          <button onClick={() => setOpen(!open)} className="p-2 hover:bg-white/5 rounded-lg transition-colors md:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-b border-white/10 bg-surface-950/95 backdrop-blur-xl px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={cn('px-3 py-2.5 text-sm font-medium rounded-lg transition-colors', pathname === href ? 'text-brand-400 bg-brand-500/10' : 'text-white/70 hover:text-white hover:bg-white/5')}>{label}</Link>
            ))}
            <hr className="my-2 border-white/10" />
            <Link href="/login" className="px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white rounded-lg">Sign In</Link>
            <Link href="/signup" className="px-3 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold rounded-xl text-center">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}