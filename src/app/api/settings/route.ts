import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase.from('komputeks_settings').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const settings: Record<string, string> = {}
  for (const row of (data || [])) { settings[row.key] = row.value }
  return NextResponse.json(settings)
}

export async function PUT(request: Request) {
  const { key, value } = await request.json()
  const supabase = createServerClient()
  const { error } = await supabase.from('komputeks_settings').upsert({ key, value }, { onConflict: 'key' })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}