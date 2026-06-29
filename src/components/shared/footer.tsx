import Link from 'next/link';
import { Zap, Github, Twitter, Mail } from 'lucide-react';

const footerLinks = {
  Product: [
    { href: '/products', label: 'All Products' },
    { href: '/docs', label: 'Documentation' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/docs/changelog', label: 'Changelog' },
    { href: '/docs/roadmap', label: 'Roadmap' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

const socialLinks = [
  { href: 'https://github.com/komputeks', icon: Github, label: 'GitHub' },
  { href: 'https://twitter.com/komputeks', icon: Twitter, label: 'Twitter' },
  { href: 'mailto:xpatworld2021@gmail.com', icon: Mail, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display">Komputeks</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-white/50">
              For people building anyway. The world&apos;s most trusted ecosystem for creators with more determination than resources.
            </p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/50 transition-colors hover:text-brand-400"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-white/40">
            © {new Date().getFullYear()} Komputeks. For people building anyway.
          </p>
        </div>
      </div>
    </footer>
  );
}