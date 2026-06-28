import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('komputeks_products')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('GET /api/products error:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { data, error } = await supabase
      .from('komputeks_products')
      .insert(body)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('POST /api/products error:', err);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    const { data, error } = await supabase
      .from('komputeks_products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('PUT /api/products error:', err);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createAdminClient();
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    const { error } = await supabase
      .from('komputeks_products')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/products error:', err);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}