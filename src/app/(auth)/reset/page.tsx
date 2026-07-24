'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/login` });
      if (authError) throw authError;
      setSuccess(true);
    } catch (err) { setError(err instanceof Error ? err.message : 'Reset failed'); } finally { setLoading(false); }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-surface-950 to-surface-950" />
      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold font-display">Komputeks</span>
          </Link>
        </div>
        {success ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold font-display">Check your email</h1>
            <p className="mt-2 text-sm text-white/60">We sent a reset link to {email}</p>
            <Link href="/login" className="mt-4 inline-flex items-center gap-1 text-sm text-brand-400">
              <ArrowLeft className="h-4 w-4" /> Back to login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold font-display">Reset Password</h1>
            <p className="mt-2 text-sm text-white/60">Enter your email and we&apos;ll send a reset link.</p>
            <form onSubmit={handleReset} className="mt-6 space-y-4">
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button type="submit" loading={loading} className="w-full">Send Reset Link</Button>
            </form>
            <p className="mt-4 text-center text-sm text-white/60">
              <Link href="/login" className="font-medium text-brand-400 hover:text-brand-300">Back to login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}