import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import { contactSchema } from '@/features/contacts/schemas';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('komputeks_contacts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('GET /api/contacts error:', err);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('komputeks_contacts')
      .insert(result.data)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('POST /api/contacts error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createAdminClient();
    const { id, read } = await request.json();
    const { data, error } = await supabase
      .from('komputeks_contacts')
      .update({ read })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('PUT /api/contacts error:', err);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}