import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

const GITHUB_CLIENT_ID = process.env.KOMPUTEKS_GITHUB_APP_CLIENT_ID || 'komputeks';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ connected: false });

  const supabase = createAdminClient();
  const { data } = await supabase
    .from('komputeks_platform_tokens')
    .select('id, provider, github_username, created_at')
    .eq('user_id', userId)
    .eq('provider', 'github')
    .single();

  if (data) {
    return NextResponse.json({ connected: true, username: data.github_username, connectedAt: data.created_at });
  }
  return NextResponse.json({ connected: false });
}

export async function DELETE(request: Request) {
  try {
    const { userId, provider } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    const supabase = createAdminClient();
    const { error } = await supabase
      .from('komputeks_platform_tokens')
      .delete()
      .eq('user_id', userId)
      .eq('provider', provider || 'github');
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Token delete error:', err);
    return NextResponse.json({ error: 'Failed to disconnect' }, { status: 500 });
  }
}
