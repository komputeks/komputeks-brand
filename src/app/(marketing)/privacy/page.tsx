import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Komputeks privacy policy.',
};

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/10 via-surface-950 to-surface-950" />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold font-display tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/40">Last updated: June 2025</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/60">
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold font-display">1. Information We Collect</h2>
            <p className="mt-2">We collect information you provide directly: email address when you subscribe, name and message when you contact us, and account details when you sign up. We also collect usage data automatically through standard analytics.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold font-display">2. How We Use Your Information</h2>
            <p className="mt-2">We use your information to provide and improve our services, communicate with you about updates, respond to your inquiries, and ensure the security of our platform.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold font-display">3. Data Storage</h2>
            <p className="mt-2">Your data is stored securely using Supabase (PostgreSQL) hosted on AWS. We implement Row Level Security and encryption at rest and in transit.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold font-display">4. Third-Party Services</h2>
            <p className="mt-2">We use Google OAuth for authentication. Google may collect information according to their privacy policy. We do not sell or share your personal data with other third parties.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold font-display">5. Your Rights</h2>
            <p className="mt-2">You can request access to, correction of, or deletion of your personal data at any time by contacting us. You can unsubscribe from emails at any time.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold font-display">6. Contact</h2>
            <p className="mt-2">For privacy-related questions, contact us at xpatworld2021@gmail.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}