import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    if (!q) return NextResponse.json({ products: [], services: [], posts: [] });
    const supabase = createAdminClient();
    const term = `%${q}%`;
    const [pRes, sRes, bRes] = await Promise.all([
      supabase.from('komputeks_products').select('*').or(`name.ilike.${term},tagline.ilike.${term},description.ilike.${term}`).limit(10),
      supabase.from('komputeks_services').select('*').or(`title.ilike.${term},excerpt.ilike.${term}`).limit(10),
      supabase.from('komputeks_blog_posts').select('*').eq('published', true).or(`title.ilike.${term},excerpt.ilike.${term}`).limit(10),
    ]);
    return NextResponse.json({ products: pRes.data || [], services: sRes.data || [], posts: bRes.data || [] });
  } catch (err) {
    console.error('GET /api/search error:', err);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}