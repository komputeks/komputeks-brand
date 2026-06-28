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
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Welcome back!</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Card>
          <h3 className="text-sm font-medium text-zinc-500">Email</h3>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">{user.email}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-zinc-500">Member Since</h3>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">{formatDate(user.created_at)}</p>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Your Komputeks Journey</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            You&apos;re part of a growing ecosystem of creators building with limited resources.
            Explore our products, subscribe to updates, and start building anyway.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a href="/products" className="rounded-lg bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700 hover:bg-brand-100 dark:bg-brand-950/30 dark:text-brand-400 dark:hover:bg-brand-950/50">
              Browse Products →
            </a>
            <a href="/docs" className="rounded-lg bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
              Read Documentation →
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}