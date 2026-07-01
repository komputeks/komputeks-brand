import type { Metadata } from 'next';
import { getFAQs } from '@/features/products/service';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Komputeks products and services.',
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-[family-name:var(--font-display)]">
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
                className="group glass-card p-5"
                open={i === 0}
              >
                <summary className="cursor-pointer font-semibold text-white">{faq.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{faq.answer}</p>
              </details>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-white/40">No FAQs yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}