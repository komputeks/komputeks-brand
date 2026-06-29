import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service', description: 'Komputeks terms of service.' };

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold font-display">Terms of Service</h1>
        <p className="mt-2 text-sm text-white/50">Last updated: June 2025</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/60">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">1. Acceptance</h2>
            <p className="mt-2">By accessing or using Komputeks services, you agree to be bound by these Terms of Service.</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">2. Description of Services</h2>
            <p className="mt-2">Komputeks provides web-based tools, platforms, and resources designed to help people build with limited resources.</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">3. User Accounts</h2>
            <p className="mt-2">You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your credentials.</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">4. Free Tier</h2>
            <p className="mt-2">Many Komputeks services are offered free of charge. Free tier usage is subject to reasonable limits. We may introduce paid features with clear notice.</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">5. Intellectual Property</h2>
            <p className="mt-2">Komputeks content and software are protected by intellectual property laws. You retain ownership of content you create using our services.</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold font-display">6. Contact</h2>
            <p className="mt-2">For questions about these terms, contact us at xpatworld2021@gmail.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}