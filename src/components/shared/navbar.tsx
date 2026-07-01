'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Search, Sparkles, LogOut, Shield, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setSearchOpen(false); }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isAdmin = session?.user && (session.user as Record<string, unknown>).role === 'admin';

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-surface-950/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent')}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-cyan-500">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold font-[family-name:var(--font-display)]">Komputeks</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={cn('rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300', pathname === href ? 'text-brand-400 bg-brand-500/10' : 'text-white/60 hover:text-white hover:bg-white/5')}>
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(!searchOpen)} className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>

          {session ? (
            <div className="hidden items-center gap-2 md:flex">
              {isAdmin && <Link href="/admin" className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white" aria-label="Admin"><Shield className="h-5 w-5" /></Link>}
              <Link href="/dashboard" className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white" aria-label="Dashboard"><User className="h-5 w-5" /></Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-red-400" aria-label="Sign out"><LogOut className="h-5 w-5" /></button>
            </div>
          ) : (
            <Link href="/login" className="hidden rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:from-brand-500 hover:to-brand-400 hover:shadow-lg hover:shadow-brand-500/25 md:block">
              Sign In
            </Link>
          )}

          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-white/60 hover:bg-white/5 md:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="border-b border-white/5 bg-surface-950/95 px-4 py-3 backdrop-blur-xl">
          <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input ref={searchRef} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search projects, services, blog..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
            </div>
          </form>
        </div>
      )}

      {open && (
        <div className="border-t border-white/5 bg-surface-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={cn('rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300', pathname === href ? 'text-brand-400 bg-brand-500/10' : 'text-white/60 hover:text-white hover:bg-white/5')}>{label}</Link>
            ))}
            <form onSubmit={handleSearch} className="mt-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-brand-500 focus:outline-none" />
              </div>
            </form>
            <hr className="my-2 border-white/5" />
            {session ? (
              <>
                <Link href="/dashboard" className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5">Dashboard</Link>
                {isAdmin && <Link href="/admin" className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5">Admin</Link>}
                <button onClick={() => signOut({ callbackUrl: '/' })} className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-400 hover:bg-red-500/10">Sign Out</button>
              </>
            ) : (
              <Link href="/login" className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-2.5 text-center text-sm font-semibold text-white">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
