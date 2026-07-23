import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, Settings, LogOut, Shield, Bot, Rocket, BarChart3, Key } from 'lucide-react';
import { LogoutButton } from './logout-button';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('komputeks_users').select('role').eq('id', user.id).single();
  const isAdmin = profile?.role === 'admin';
  const sidebarLinks = [{ href: '/dashboard', icon: User, label: 'Profile' }, { href: '/dashboard/ai', icon: Bot, label: 'AI Providers' }, ...(isAdmin ? [{ href: '/admin', icon: Shield, label: 'Admin Panel' }, { href: '/admin/ai-providers', icon: Key, label: 'AI Config' }] : [])];
  return (<div className="pt-24 pb-20"><div className="mx-auto max-w-7xl px-6"><div className="grid gap-8 lg:grid-cols-[240px_1fr]"><aside className="space-y-1"><div className="mb-4 glass-card p-4"><p className="font-semibold font-display">{user.email}</p><p className="text-xs text-brand-400">{isAdmin ? 'Admin' : 'User'}</p></div>{sidebarLinks.map(({ href, icon: Icon, label }) => (<Link key={href} href={href} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors"><Icon className="h-4 w-4" />{label}</Link>))}<LogoutButton /></aside><div>{children}</div></div></div></div>);
}