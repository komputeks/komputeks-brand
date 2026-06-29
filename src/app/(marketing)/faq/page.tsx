import type { Metadata } from 'next';
import { getFAQs } from '@/features/products/service';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Komputeks products and services.',
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-surface-950 to-surface-950" />
      <div className="relative z-10 pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold font-display sm:text-5xl">
            <span className="gradient-text">FAQ</span>
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Everything you need to know about Komputeks.
          </p>
          {faqs.length > 0 ? (
            <div className="mt-10 space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={faq.id}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                  open={i === 0}
                >
                  <summary className="cursor-pointer font-semibold font-display">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{faq.answer}</p>
                </details>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-white/50">No FAQs yet. Check back soon!</p>
          )}
        </div>
      </div>
    </div>
  );
}