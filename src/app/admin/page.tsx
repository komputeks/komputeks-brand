import { requireAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminDashboard } from './admin-dashboard';

export default async function AdminPage() {
  const user = await requireAdmin();
  if (!user) redirect('/dashboard');
  return <AdminDashboard />;
}
