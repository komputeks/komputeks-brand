import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import { subscribeSchema } from '@/features/subscribers/schemas';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('komputeks_subscribers')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('GET /api/subscribers error:', err);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = subscribeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('komputeks_subscribers')
      .insert({ email: result.data.email, source: result.data.source })
      .select()
      .single();
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already subscribed!' });
      }
      throw error;
    }
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('POST /api/subscribers error:', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}