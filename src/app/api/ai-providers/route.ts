import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('komputeks_ai_providers').select('id,name,provider_type,models,capabilities,active,is_admin').order('created_at', { ascending: true });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) { console.error('GET /api/ai-providers error:', err); return NextResponse.json({ error: 'Failed to fetch providers' }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const is_admin = body.is_admin !== false;
    const { data, error } = await supabase.from('komputeks_ai_providers').insert({ name: body.name, provider_type: body.provider_type, api_key: body.api_key, models: body.models || [], capabilities: body.capabilities || ['text'], active: true, is_admin }).select().single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) { console.error('POST /api/ai-providers error:', err); return NextResponse.json({ error: 'Failed to create provider' }, { status: 500 }); }
}

export async function PUT(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const { data, error } = await supabase.from('komputeks_ai_providers').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) { console.error('PUT /api/ai-providers error:', err); return NextResponse.json({ error: 'Failed to update' }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createAdminClient();
    const { id } = await request.json();
    const { error } = await supabase.from('komputeks_ai_providers').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) { console.error('DELETE /api/ai-providers error:', err); return NextResponse.json({ error: 'Failed to delete' }, { status: 500 }); }
}