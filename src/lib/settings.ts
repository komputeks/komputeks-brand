import { createServerClient } from './supabase/server'

export async function getSetting(key: string): Promise<string | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase.from('komputeks_settings').select('value').eq('key', key).maybeSingle()
  if (error) { console.error(`getSetting error (${key}):`, error.message); return null }
  return (data?.value as string) || null
}

export async function setSetting(key: string, value: string): Promise<void> {
  const supabase = createServerClient()
  const { error } = await supabase.from('komputeks_settings').upsert({ key, value }, { onConflict: 'key' })
  if (error) { console.error(`setSetting error (${key}):`, error.message); throw error }
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const supabase = createServerClient()
  const { data, error } = await supabase.from('komputeks_settings').select('key, value')
  if (error) { console.error('getAllSettings error:', error.message); return {} }
  return (data || []).reduce((acc: Record<string, string>, row: any) => { acc[row.key] = row.value; return acc }, {})
}