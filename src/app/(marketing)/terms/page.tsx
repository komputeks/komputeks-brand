import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service', description: 'Komputeks terms of service.' };

export default function TermsPage() {
  return (
    <div className="relative pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.1),_transparent,_transparent)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-white/40">Last updated: June 2025</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/60">
          {[['1. Acceptance', 'By accessing or using Komputeks services, you agree to be bound by these Terms. If you do not agree, do not use our services.'],
            ['2. Description of Services', 'Komputeks provides web-based tools, platforms, and resources designed to help people build with limited resources. Services may change or be discontinued with notice.'],
            ['3. User Accounts', 'You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.'],
            ['4. Acceptable Use', 'You agree not to misuse our services, attempt unauthorized access, spam other users, or use the platform for illegal activities. We reserve the right to suspend accounts that violate these terms.'],
            ['5. Free Tier', 'Many Komputeks services are offered free of charge. Free tier usage is subject to reasonable limits. We may introduce paid features in the future with clear notice.'],
            ['6. Intellectual Property', 'Komputeks content and software are protected by intellectual property laws. You retain ownership of content you create using our services.'],
            ['7. Limitation of Liability', 'Komputeks is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.'],
            ['8. Contact', 'For questions about these terms, contact us at xpatworld2021@gmail.com.']
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