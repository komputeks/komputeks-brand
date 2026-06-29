import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'User Manual', description: 'How to use Komputeks products.' };

export default function UserManualPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold font-display"><span className="gradient-text">User Manual</span></h1>
        <div className="mt-8 space-y-8 text-white/60">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold font-display text-white">Getting Started</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li><strong className="text-white">Browse Products</strong> — Visit the Products page to explore all available tools.</li>
              <li><strong className="text-white">Create an Account</strong> — Sign up with your email or Google account.</li>
              <li><strong className="text-white">Subscribe to Updates</strong> — Enter your email on the homepage to receive updates.</li>
              <li><strong className="text-white">Explore Documentation</strong> — Each product has its own documentation.</li>
            </ol>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold font-display text-white">Product Categories</h2>
            <ul className="mt-2 space-y-2">
              <li><strong className="text-white">Storage</strong> — Telecloud and other tools for file management.</li>
              <li><strong className="text-white">Commerce</strong> — Madeal and shopping tools.</li>
              <li><strong className="text-white">Developer Tools</strong> — SheetSync, SecretForge, and other tools.</li>
              <li><strong className="text-white">AI & Automation</strong> — AI-powered tools.</li>
            </ul>
          </section>
          <section className="rounded-2xl border border-brand-500/20 bg-brand-500/5 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold font-display text-white">Free Tier Philosophy</h2>
            <p className="mt-2">Every Komputeks product is designed to be useful on the free tier. Constraints are not the opposite of opportunity — they are where innovation begins.</p>
          </section>
        </div>
      </div>
    </div>
  );
}