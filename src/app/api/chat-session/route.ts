import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ messages: [] });

  const supabase = createAdminClient();
  const { data } = await supabase
    .from('komputeks_chat_sessions')
    .select('messages')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  return NextResponse.json({ messages: data?.messages || [] });
}

export async function POST(request: Request) {
  try {
    const { userId, messages, selectedProvider } = await request.json();
    const supabase = createAdminClient();

    // Upsert chat session
    const { error } = await supabase
      .from('komputeks_chat_sessions')
      .upsert({
        user_id: userId,
        messages,
        selected_provider: selectedProvider || null,
      }, { onConflict: 'user_id' });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Chat session save error:', err);
    return NextResponse.json({ error: 'Failed to save chat' }, { status: 500 });
  }
}
