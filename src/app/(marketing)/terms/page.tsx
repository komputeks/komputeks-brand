import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Komputeks terms of service — the rules and guidelines for using our platform.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-[family-name:var(--font-display)]">Terms of Service</h1>
        <p className="mt-2 text-sm text-white/40">Last updated: June 2025</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/60">
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">1. Acceptance</h2>
            <p className="mt-2">By accessing or using Komputeks services, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">2. Description of Services</h2>
            <p className="mt-2">Komputeks provides web-based tools, platforms, and resources designed to help people build with limited resources. Services may change or be discontinued with notice.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">3. User Accounts</h2>
            <p className="mt-2">You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">4. Acceptable Use</h2>
            <p className="mt-2">You agree not to misuse our services, attempt unauthorized access, spam other users, or use the platform for illegal activities. We reserve the right to suspend accounts that violate these terms.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">5. Free Tier</h2>
            <p className="mt-2">Many Komputeks services are offered free of charge. Free tier usage is subject to reasonable limits. We may introduce paid features in the future with clear notice.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">6. Intellectual Property</h2>
            <p className="mt-2">Komputeks content and software are protected by intellectual property laws. You retain ownership of content you create using our services.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">7. Limitation of Liability</h2>
            <p className="mt-2">Komputeks is provided &ldquo;as is&rdquo; without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">8. Contact</h2>
            <p className="mt-2">For questions about these terms, contact us at xpatworld2021@gmail.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}