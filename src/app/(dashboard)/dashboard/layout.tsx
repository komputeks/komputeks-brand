import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Shield, LogOut, User, Bot, Rocket, Key, BarChart3, Settings } from 'lucide-react';
import { LogoutButton } from './logout-button';

const dashboardTabs = [
  { href: '/dashboard', icon: User, label: 'Profile' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/projects', icon: Rocket, label: 'My Projects' },
  { href: '/dashboard/ai', icon: Bot, label: 'AI Providers' },
  { href: '/dashboard/deployment', icon: Settings, label: 'Deployment' },
  { href: '/dashboard/envs', icon: Key, label: 'Environments' },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('komputeks_users').select('role').eq('id', user.id).single();
  const isAdmin = profile?.role === 'admin';

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-1">
            <div className="mb-4 glass-card p-4">
              <p className="font-semibold font-display">{user.email}</p>
              <p className="text-xs text-white/40">{isAdmin ? 'Admin' : 'User'}</p>
            </div>
            {dashboardTabs.map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all duration-300">
                <Icon className="h-4 w-4" /> {label}
              </Link>
            ))}
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
