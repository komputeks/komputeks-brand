'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, ArrowLeft } from 'lucide-react';
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
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (authError) throw authError;
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-20">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold">
            <Zap className="h-6 w-6 text-brand-500" />
            Komputeks
          </Link>
        </div>
        {success ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Check your email</h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">We sent a password reset link to {email}</p>
            <Link href="/login" className="mt-4 inline-flex items-center gap-1 text-sm text-brand-600 dark:text-brand-400">
              <ArrowLeft className="h-4 w-4" /> Back to login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Reset Password</h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Enter your email and we&apos;ll send you a reset link.</p>
            <form onSubmit={handleReset} className="mt-6 space-y-4">
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" loading={loading} className="w-full">Send Reset Link</Button>
            </form>
            <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/login" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">Back to login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}