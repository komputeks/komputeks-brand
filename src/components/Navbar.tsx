'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, Search, Sparkles, User, LayoutDashboard } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import SearchModal from './SearchModal'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface-950/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display text-white">Komputeks</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === link.href ? 'text-brand-400' : 'text-white/70 hover:text-white'}`}>{link.label}</Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} aria-label="Search" className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"><Search className="w-5 h-5" /></button>
              {session?.user ? (
                <div className="hidden sm:flex items-center gap-2">
                  {(session.user as Record<string, unknown>).role === 'admin' && <Link href="/admin" className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors" title="Admin"><LayoutDashboard className="w-5 h-5" /></Link>}
                  <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"><User className="w-4 h-4" /><span className="max-w-[120px] truncate">{session.user.name || session.user.email}</span></Link>
                </div>
              ) : (
                <Link href="/login" className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">Sign in</Link>
              )}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-white/70" aria-label="Menu">{mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-surface-950">
            <div className="px-6 py-3 space-y-1">
              {NAV_LINKS.map(link => (<Link key={link.href} href={link.href} className={`block px-3 py-2 text-sm font-medium rounded-lg ${pathname === link.href ? 'text-brand-400 bg-brand-500/10' : 'text-white/70 hover:bg-white/5'}`}>{link.label}</Link>))}
              {session?.user ? (
                <>
                  <Link href="/dashboard" className="block px-3 py-2 text-sm font-medium rounded-lg text-white/70 hover:bg-white/5">Dashboard</Link>
                  {(session.user as Record<string, unknown>).role === 'admin' && <Link href="/admin" className="block px-3 py-2 text-sm font-medium rounded-lg text-white/70 hover:bg-white/5">Admin</Link>}
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="block w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-white/70 hover:bg-white/5">Sign out</button>
                </>
              ) : (<Link href="/login" className="block px-3 py-2 text-sm font-medium rounded-lg text-white/70 hover:bg-white/5">Sign in</Link>)}
            </div>
          </div>
        )}
      </nav>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}