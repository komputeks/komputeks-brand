import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service', description: 'Komputeks terms of service.' };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-surface-950 to-surface-950" />
      <div className="relative z-10 pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold font-display sm:text-5xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-white/40">Last updated: June 2025</p>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/60">
            {[{t:'1. Acceptance',d:'By accessing or using Komputeks services, you agree to be bound by these Terms.'},{t:'2. Description of Services',d:'Komputeks provides web-based tools, platforms, and resources designed to help people build with limited resources.'},{t:'3. User Accounts',d:'You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your credentials.'},{t:'4. Acceptable Use',d:'You agree not to misuse our services, attempt unauthorized access, spam other users, or use the platform for illegal activities.'},{t:'5. Free Tier',d:'Many Komputeks services are offered free of charge. Free tier usage is subject to reasonable limits.'},{t:'6. Intellectual Property',d:'Komputeks content and software are protected by intellectual property laws. You retain ownership of content you create.'},{t:'7. Limitation of Liability',d:'Komputeks is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages.'},{t:'8. Contact',d:'For questions about these terms, contact us at xpatworld2021@gmail.com.'}].map(({t,d})=>(<section key={t}><h2 className="text-lg font-semibold font-display">{t}</h2><p className="mt-2">{d}</p></section>))}
          </div>
        </div>
      </div>
    </div>
  );
}