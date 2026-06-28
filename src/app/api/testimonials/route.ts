import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('komputeks_testimonials')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('GET /api/testimonials error:', err);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { data, error } = await supabase
      .from('komputeks_testimonials')
      .insert(body)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('POST /api/testimonials error:', err);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createAdminClient();
    const { id } = await request.json();
    const { error } = await supabase
      .from('komputeks_testimonials')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/testimonials error:', err);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}