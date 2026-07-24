import type { Metadata } from 'next';
import { getFAQs } from '@/features/products/service';

export const metadata: Metadata = { title: 'FAQ', description: 'Frequently asked questions about Komputeks.' };

export default async function FAQPage() {
  const faqs = await getFAQs();
  return (
    <div className="relative pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.1),_transparent,_transparent)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-white/60">Everything you need to know about Komputeks.</p>
        {faqs.length > 0 ? (
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <details key={faq.id} className="group glass-card p-5" open={i === 0}>
                <summary className="cursor-pointer font-semibold text-white">{faq.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{faq.answer}</p>
              </details>
            ))}
          </div>
        ) : (<p className="mt-10 text-white/40">No FAQs yet. Check back soon!</p>)}
      </div>
    </div>
  );
}