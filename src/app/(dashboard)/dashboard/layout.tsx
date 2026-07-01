import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, Shield, LogOut } from 'lucide-react';
import { LogoutButton } from './logout-button';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('komputeks_users')
    .select('role')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-1">
            <div className="mb-4 glass-card p-4">
              <p className="font-semibold text-white">{user.email}</p>
              <p className="text-xs text-white/40">{isAdmin ? 'Admin' : 'User'}</p>
            </div>
            <Link href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors">
              <User className="h-4 w-4" /> Profile
            </Link>
            {isAdmin && (
              <Link href="/admin" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors">
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