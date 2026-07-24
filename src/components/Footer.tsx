import Link from 'next/link'
import { Github, Twitter, Mail, Sparkles } from 'lucide-react'
import { SITE_NAME, SITE_TAGLINE, SOCIAL_LINKS, NAV_LINKS } from '@/lib/constants'
import NewsletterForm from './NewsletterForm'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
              <span className="text-xl font-bold font-display text-white">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-white/60 max-w-md mb-6">{SITE_TAGLINE}. We build systems that help people create more value than their resources would normally allow.</p>
            <div className="max-w-sm">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Get practical insights</p>
              <NewsletterForm source="footer" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigate</h4>
            <ul className="space-y-2">{NAV_LINKS.map(link => (<li key={link.href}><Link href={link.href} className="text-sm text-white/60 hover:text-brand-400 transition-colors">{link.label}</Link></li>))}</ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              {SOCIAL_LINKS.map(s => (<a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-brand-400 hover:bg-white/10 transition-all" aria-label={s.label}><i className={`text-sm ${s.icon === 'twitter' ? 'fa-brands fa-twitter' : s.icon === 'github' ? 'fa-brands fa-github' : 'fa-solid fa-envelope'}`}></i></a>))}
            </div>
            <p className="text-xs text-white/40">Since 2015. Built with determination, not excuses.</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p className="text-xs text-white/40">Technology is not the product. Business performance is.</p>
        </div>
      </div>
    </footer>
  )
}