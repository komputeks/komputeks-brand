import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { AuthProvider } from '@/components/shared/auth-provider';
import { GoogleOneTap } from '@/components/shared/google-one-tap';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: { default: 'Komputeks — For People Building Anyway', template: '%s | Komputeks' },
  description: 'The world\'s most trusted ecosystem for people building with limited resources. Knowledge, tools, and community for creators with more determination than resources.',
  keywords: ['komputeks', 'build anyway', 'leverage', 'creators', 'developers', 'tools', 'free tier', 'constraints', 'determination'],
  authors: [{ name: 'Simon Wokabi', url: 'https://komputeks.github.io' }],
  creator: 'Komputeks',
  openGraph: { type: 'website', locale: 'en_US', siteName: 'Komputeks', title: 'Komputeks — For People Building Anyway', description: 'The world\'s most trusted ecosystem for people building with limited resources.' },
  twitter: { card: 'summary_large_image', title: 'Komputeks — For People Building Anyway', description: 'The world\'s most trusted ecosystem for people building with limited resources.', creator: '@komputeks' },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Komputeks',
  url: 'https://komputeks-brand.vercel.app', logo: 'https://komputeks-brand.vercel.app/favicon.svg',
  description: 'The world\'s most trusted ecosystem for people building with limited resources.',
  foundingDate: '2015', founder: { '@type': 'Person', name: 'Simon Peter Muchoki Wokabi' },
  sameAs: ['https://github.com/komputeks', 'https://twitter.com/komputeks'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="theme-color" content="#020617" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})});}` }} />
      </head>
      <body className="min-h-screen bg-surface-950 text-white antialiased">
        <AuthProvider>
          <GoogleOneTap />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
