'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contactSchema } from '../schemas';
import { Send, CheckCircle } from 'lucide-react';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send message');
      }
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrors({ message: err instanceof Error ? err.message : 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle className="h-12 w-12 text-green-400" />
        <h3 className="text-xl font-semibold font-display">Message Sent!</h3>
        <p className="text-white/60">We&apos;ll get back to you as soon as possible.</p>
        <Button variant="secondary" onClick={() => setSuccess(false)}>Send another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} error={errors.name} placeholder="Your name" />
        <Input label="Email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} error={errors.email} placeholder="you@example.com" />
      </div>
      <Input label="Subject" value={form.subject} onChange={(e) => handleChange('subject', e.target.value)} error={errors.subject} placeholder="What's this about?" />
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Tell us more..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
        {errors.message && <p className="text-sm text-red-400">{errors.message}</p>}
      </div>
      <Button type="submit" loading={loading} size="lg" className="w-full sm:w-auto">
        <Send className="mr-2 h-4 w-4" />
        Send Message
      </Button>
    </form>
  );
}