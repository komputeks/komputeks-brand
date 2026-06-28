import type { Metadata } from 'next';
import { ContactForm } from '@/features/contacts/components/contact-form';
import { Mail, Github, Twitter, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Komputeks. We build for people with more determination than resources.',
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              Get In Touch
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Have a question, idea, or just want to connect? We read every message.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <Mail className="h-5 w-5 text-brand-500" />
                <span>xpatworld2021@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <MapPin className="h-5 w-5 text-brand-500" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <Github className="h-5 w-5 text-brand-500" />
                <a href="https://github.com/komputeks" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 dark:hover:text-brand-400">github.com/komputeks</a>
              </div>
              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <Twitter className="h-5 w-5 text-brand-500" />
                <a href="https://twitter.com/komputeks" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 dark:hover:text-brand-400">@komputeks</a>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}