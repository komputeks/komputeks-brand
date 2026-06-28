import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const supabase = createAdminClient();
    let query = supabase
      .from('komputeks_blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (published === 'true') query = query.eq('published', true);
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('GET /api/blog-posts error:', err);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { data, error } = await supabase
      .from('komputeks_blog_posts')
      .insert(body)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('POST /api/blog-posts error:', err);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { id, ...updates } = body;
    const { data, error } = await supabase
      .from('komputeks_blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('PUT /api/blog-posts error:', err);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createAdminClient();
    const { id } = await request.json();
    const { error } = await supabase
      .from('komputeks_blog_posts')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/blog-posts error:', err);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}