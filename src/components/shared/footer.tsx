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
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <Zap className="h-6 w-6 text-brand-500" />
              <span className="text-zinc-900 dark:text-white">Komputeks</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
              For people building anyway. The world&apos;s most trusted ecosystem for creators with more determination than resources.
            </p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-600 transition-colors hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} Komputeks. For people building anyway.
          </p>
        </div>
      </div>
    </footer>
  );
}