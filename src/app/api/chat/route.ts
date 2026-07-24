import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('komputeks_chat_threads').select('*, komputeks_chat_messages(count)').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('GET /api/chat error:', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();

    if (body.threadId && body.role && body.content) {
      // Add message to existing thread
      const { data, error } = await supabase.from('komputeks_chat_messages').insert({
        thread_id: body.threadId,
        role: body.role,
        content: body.content,
        model: body.model || 'komputeks-ai',
      }).select().single();
      if (error) throw error;
      return NextResponse.json(data, { status: 201 });
    }

    // Create new thread
    const { data: thread, error: threadError } = await supabase.from('komputeks_chat_threads').insert({
      user_id: body.userId,
      title: body.title || 'New Chat',
    }).select().single();
    if (threadError) throw threadError;

    // Add initial message
    if (body.content) {
      await supabase.from('komputeks_chat_messages').insert({
        thread_id: thread.id,
        role: body.role || 'user',
        content: body.content,
        model: body.model || 'komputeks-ai',
      });
    }

    return NextResponse.json(thread, { status: 201 });
  } catch (err) {
    console.error('POST /api/chat error:', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}