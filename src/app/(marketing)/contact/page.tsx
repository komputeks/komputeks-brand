import type { Metadata } from 'next';
import { ContactForm } from '@/features/contacts/components/contact-form';
import { Mail, Github, Twitter, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Komputeks. We build for people with more determination than resources.',
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-surface-950 to-surface-950" />
      <div className="relative z-10 pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold font-display sm:text-5xl">
                <span className="gradient-text">Get In Touch</span>
              </h1>
              <p className="mt-4 text-lg text-white/60">
                Have a question, idea, or just want to connect? We read every message.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-white/60">
                  <Mail className="h-5 w-5 text-brand-400" />
                  <span>xpatworld2021@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin className="h-5 w-5 text-brand-400" />
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <Github className="h-5 w-5 text-brand-400" />
                  <a href="https://github.com/komputeks" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">github.com/komputeks</a>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <Twitter className="h-5 w-5 text-brand-400" />
                  <a href="https://twitter.com/komputeks" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">@komputeks</a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}