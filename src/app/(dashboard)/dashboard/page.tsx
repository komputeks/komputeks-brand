import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div>
      <h1 className="text-2xl font-bold font-display">Dashboard</h1>
      <p className="mt-1 text-sm text-white/60">Welcome back!</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-white/50">Email</h3>
          <p className="mt-1 text-lg font-semibold font-display">{user.email}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-white/50">Member Since</h3>
          <p className="mt-1 text-lg font-semibold font-display">{formatDate(user.created_at)}</p>
        </Card>
      </div>
      <div className="mt-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold font-display">Your Komputeks Journey</h3>
          <p className="mt-2 text-sm text-white/60">
            You&apos;re part of a growing ecosystem of creators building with limited resources.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a href="/products" className="rounded-xl bg-brand-500/10 px-4 py-3 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20">
              Browse Products →
            </a>
            <a href="/docs" className="rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10">
              Read Documentation →
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}