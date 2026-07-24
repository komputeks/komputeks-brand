import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Shield, LogOut } from 'lucide-react';
import { LogoutButton } from './logout-button';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('komputeks_users').select('role').eq('id', user.id).single();
  const isAdmin = profile?.role === 'admin';

  return (
    <div className="min-h-screen bg-surface-950 pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-1">
            <div className="glass-card p-4 mb-4">
              <p className="font-semibold font-display">{user.email}</p>
              <p className="text-xs text-white/40">{isAdmin ? 'Admin' : 'User'}</p>
            </div>
            <Link href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all duration-300">
              Profile
            </Link>
            {isAdmin && (
              <Link href="/admin" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all duration-300">
                <Shield className="h-4 w-4" /> Admin Panel
              </Link>
            )}
            <LogoutButton />
          </aside>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}