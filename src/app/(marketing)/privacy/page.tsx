import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Komputeks privacy policy.' };

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold font-display">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/50">Last updated: June 2025</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/60">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">1. Information We Collect</h2>
            <p className="mt-2">We collect information you provide directly: email address when you subscribe, name and message when you contact us, and account details when you sign up. We also collect usage data automatically through standard analytics.</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">2. How We Use Your Information</h2>
            <p className="mt-2">We use your information to provide and improve our services, communicate with you about updates, respond to your inquiries, and ensure the security of our platform.</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">3. Data Storage</h2>
            <p className="mt-2">Your data is stored securely using Supabase (PostgreSQL) hosted on AWS. We implement Row Level Security and encryption at rest and in transit.</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">4. Third-Party Services</h2>
            <p className="mt-2">We use Google OAuth for authentication. Google may collect information according to their privacy policy. We do not sell or share your personal data with other third parties.</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">5. Your Rights</h2>
            <p className="mt-2">You can request access to, correction of, or deletion of your personal data at any time by contacting us. You can unsubscribe from emails at any time.</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">6. Contact</h2>
            <p className="mt-2">For privacy-related questions, contact us at xpatworld2021@gmail.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}