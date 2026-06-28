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
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Everything you need to know about Komputeks.
        </p>
        {faqs.length > 0 ? (
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={faq.id}
                className="group rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                open={i === 0}
              >
                <summary className="cursor-pointer font-semibold text-zinc-900 dark:text-white">{faq.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-zinc-500 dark:text-zinc-500">No FAQs yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}