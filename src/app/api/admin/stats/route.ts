import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const [products, contacts, subscribers, users] = await Promise.all([
      supabase.from('komputeks_products').select('id', { count: 'exact' }),
      supabase.from('komputeks_contacts').select('id,read', { count: 'exact' }),
      supabase.from('komputeks_subscribers').select('id', { count: 'exact' }),
      supabase.from('komputeks_users').select('id', { count: 'exact' }),
    ]);
    return NextResponse.json({
      products: { total: products.count || 0, working: 0 },
      contacts: { total: contacts.count || 0, unread: contacts.data?.filter(c => !c.read).length || 0 },
      subscribers: { total: subscribers.count || 0 },
      users: { total: users.count || 0 },
    });
  } catch (err) {
    console.error('GET /api/admin/stats error:', err);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}