import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Manual',
  description: 'How to use Komputeks products.',
};

export default function UserManualPage() {
  return (
    <div className="relative overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/10 via-surface-950 to-surface-950" />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold font-display tracking-tight">
          <span className="gradient-text">User Manual</span>
        </h1>
        <div className="mt-8 space-y-8 text-white/60">
          <section className="glass-card p-6">
            <h2 className="text-xl font-semibold font-display">Getting Started</h2>
            <p className="mt-2">Welcome to Komputeks. Here is how to get the most out of our ecosystem:</p>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li><strong className="text-white">Browse Products</strong> — Visit the Products page to explore all available tools.</li>
              <li><strong className="text-white">Create an Account</strong> — Sign up with your email or Google account.</li>
              <li><strong className="text-white">Subscribe to Updates</strong> — Enter your email on the homepage to receive updates.</li>
              <li><strong className="text-white">Explore Documentation</strong> — Start here for general guidance.</li>
            </ol>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-xl font-semibold font-display">Product Categories</h2>
            <ul className="mt-2 space-y-2">
              <li><strong className="text-white">Storage</strong> — Telecloud and other tools for file management.</li>
              <li><strong className="text-white">Commerce</strong> — Madeal and shopping tools.</li>
              <li><strong className="text-white">Developer Tools</strong> — SheetSync, SecretForge, and other tools for developers.</li>
              <li><strong className="text-white">AI & Automation</strong> — AI-powered tools for content, search, and automation.</li>
              <li><strong className="text-white">Communication</strong> — SMS, email, and messaging tools.</li>
            </ul>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-xl font-semibold font-display">Free Tier Philosophy</h2>
            <p className="mt-2">Every Komputeks product is designed to be useful on the free tier. We believe constraints are not the opposite of opportunity — they are where innovation begins.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-xl font-semibold font-display">Need Help?</h2>
            <p className="mt-2">Visit the Contact page to send us a message. We read every message and respond as quickly as possible.</p>
          </section>
        </div>
      </div>
    </div>
  );
}