import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'User Manual', description: 'How to use Komputeks products.' };

export default function UserManualPage() {
  return (
    <div className="min-h-screen bg-surface-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-surface-950 to-surface-950" />
      <div className="relative z-10 pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold font-display sm:text-5xl">User Manual</h1>
          <div className="mt-8 space-y-8 text-white/60">
            <section><h2 className="text-xl font-semibold font-display">Getting Started</h2><p className="mt-2">Welcome to Komputeks. Here is how to get the most out of our ecosystem:</p><ol className="mt-3 list-inside list-decimal space-y-2"><li><strong className="text-white/80">Browse Products</strong> — Visit the Products page to explore all available tools.</li><li><strong className="text-white/80">Create an Account</strong> — Sign up with your email or Google account.</li><li><strong className="text-white/80">Subscribe to Updates</strong> — Enter your email on the homepage to receive updates.</li><li><strong className="text-white/80">Explore Documentation</strong> — Each product has its own documentation.</li></ol></section>
            <section><h2 className="text-xl font-semibold font-display">Product Categories</h2><ul className="mt-2 space-y-2"><li><strong className="text-white/80">Storage</strong> — Telecloud and other tools for file management.</li><li><strong className="text-white/80">Commerce</strong> — Madeal and shopping tools.</li><li><strong className="text-white/80">Developer Tools</strong> — SheetSync, SecretForge, and other tools.</li><li><strong className="text-white/80">AI & Automation</strong> — AI-powered tools for content and automation.</li></ul></section>
            <section><h2 className="text-xl font-semibold font-display">Free Tier Philosophy</h2><p className="mt-2">Every Komputeks product is designed to be useful on the free tier. Constraints are not the opposite of opportunity — they are where innovation begins.</p></section>
          </div>
        </div>
      </div>
    </div>
  );
}