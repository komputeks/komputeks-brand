import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('komputeks_faqs')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('GET /api/faqs error:', err);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}