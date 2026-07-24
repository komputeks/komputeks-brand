import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Komputeks privacy policy.' };

export default function PrivacyPage() {
  return (
    <div className="relative pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.1),_transparent,_transparent)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/40">Last updated: June 2025</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/60">
          {[['1. Information We Collect', 'We collect information you provide directly: email address when you subscribe, name and message when you contact us, and account details when you sign up. We also collect usage data automatically through standard analytics.'],
            ['2. How We Use Your Information', 'We use your information to provide and improve our services, communicate with you about updates, respond to your inquiries, and ensure the security of our platform.'],
            ['3. Data Storage', 'Your data is stored securely using Supabase (PostgreSQL) hosted on AWS. We implement Row Level Security and encryption at rest and in transit.'],
            ['4. Third-Party Services', 'We use Google OAuth for authentication. Google may collect information according to their privacy policy. We do not sell or share your personal data with other third parties.'],
            ['5. Your Rights', 'You can request access to, correction of, or deletion of your personal data at any time by contacting us. You can unsubscribe from emails at any time.'],
            ['6. Contact', 'For privacy-related questions, contact us at xpatworld2021@gmail.com.']
          ].map(([title, desc]) => (
            <section key={title} className="glass-card p-6">
              <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
              <p className="mt-2">{desc}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}