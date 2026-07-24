import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const supabase = createAdminClient();
  let query = supabase.from('komputeks_env_vars').select('*');
  if (userId) query = query.eq('user_id', userId);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const { userId, name, key, value, projectId } = await request.json();
    if (!userId || !key) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('komputeks_env_vars')
      .insert({ user_id: userId, name: name || key, key, value, project_id: projectId || null })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Env var create error:', err);
    return NextResponse.json({ error: 'Failed to create env var' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const supabase = createAdminClient();
    const { error } = await supabase.from('komputeks_env_vars').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Env var delete error:', err);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
