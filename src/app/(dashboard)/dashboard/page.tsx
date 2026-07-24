import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div>
      <h1 className="text-2xl font-bold font-display">Dashboard</h1>
      <p className="mt-1 text-sm text-white/60">Welcome back!</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="glass-card p-6"><h3 className="text-sm font-medium text-white/40">Email</h3><p className="mt-1 text-lg font-semibold font-display">{user.email}</p></div>
        <div className="glass-card p-6"><h3 className="text-sm font-medium text-white/40">Member Since</h3><p className="mt-1 text-lg font-semibold font-display">{new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p></div>
      </div>

      <div className="mt-8 glass-card p-6">
        <h3 className="text-lg font-semibold font-display">Your Komputeks Journey</h3>
        <p className="mt-2 text-sm text-white/60">You&apos;re part of a growing ecosystem of creators building with limited resources.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a href="/products" className="rounded-xl bg-brand-500/10 border border-brand-500/20 px-4 py-3 text-sm font-medium text-brand-400 hover:bg-brand-500/20 transition-all duration-300">Browse Products →</a>
          <a href="/docs" className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 transition-all duration-300">Read Documentation →</a>
        </div>
      </div>
    </div>
  );
}