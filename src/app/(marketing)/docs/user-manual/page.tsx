import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Manual',
  description: 'How to use Komputeks products effectively.',
};

export default function UserManualPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">User Manual</h1>
        <div className="mt-8 space-y-8 text-zinc-600 dark:text-zinc-400">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Getting Started</h2>
            <p className="mt-2">Welcome to Komputeks. Here is how to get the most out of our ecosystem:</p>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li><strong>Browse Products</strong> — Visit the Products page to explore all available tools. Each product shows its current status and a link to try it.</li>
              <li><strong>Create an Account</strong> — Sign up with your email or Google account. This gives you access to dashboards, saved preferences, and personalized features.</li>
              <li><strong>Subscribe to Updates</strong> — Enter your email on the homepage or any CTA section to receive updates about new products and features.</li>
              <li><strong>Explore Documentation</strong> — Each product has its own documentation. Start here for general guidance.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Product Categories</h2>
            <ul className="mt-2 space-y-2">
              <li><strong>Storage</strong> — Telecloud and other tools for file management and cloud storage leverage.</li>
              <li><strong>Commerce</strong> — Madeal and shopping tools for buying, selling, and deals.</li>
              <li><strong>Developer Tools</strong> — SheetSync, SecretForge, and other tools for developers.</li>
              <li><strong>AI & Automation</strong> — AI-powered tools for content, search, and automation.</li>
              <li><strong>Communication</strong> — SMS, email, and messaging tools.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Free Tier Philosophy</h2>
            <p className="mt-2">Every Komputeks product is designed to be useful on the free tier. We believe constraints are not the opposite of opportunity — they are where innovation begins. Paid features enhance existing functionality but never gate core value.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Need Help?</h2>
            <p className="mt-2">Visit the Contact page to send us a message. We read every message and respond as quickly as possible.</p>
          </section>
        </div>
      </div>
    </div>
  );
}