import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Dashboard</h1>
      <p className="mt-1 text-sm text-white/50">Welcome back!</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-white/50">Email</h3>
          <p className="mt-1 text-lg font-semibold font-[family-name:var(--font-display)]">{user.email}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-white/50">Role</h3>
          <p className="mt-1 text-lg font-semibold font-[family-name:var(--font-display)] capitalize">{user.role}</p>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)]">Your Komputeks Journey</h3>
          <p className="mt-2 text-sm text-white/60">
            You&apos;re part of a growing ecosystem of creators building with limited resources.
            Explore our projects, subscribe to updates, and start building anyway.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a href="/products" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-brand-400 transition-all duration-300 hover:bg-white/10">Browse Projects →</a>
            <a href="/docs" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/10">Read Documentation →</a>
          </div>
        </Card>
      </div>
    </div>
  );
}
