'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GridSkeleton } from '@/components/ui/skeleton';
import { Plus, Trash2, Key, Bot } from 'lucide-react';

interface AIProvider { id: string; name: string; provider_type: string; api_key_encrypted: boolean; models: string[]; capabilities: string[]; active: boolean; created_at: string }

export default function AIProvidersAdminPage() {
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', provider_type: 'openai', api_key: '', models: '', capabilities: 'text' });

  useEffect(() => { loadProviders(); }, []);
  const loadProviders = async () => { setLoading(true); try { const res = await fetch('/api/ai-providers'); if (res.ok) setProviders(await res.json()); } catch {} finally { setLoading(false); } };
  const handleCreate = async (e: React.FormEvent) => { e.preventDefault(); try { const res = await fetch('/api/ai-providers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, models: form.models.split(',').map(m => m.trim()).filter(Boolean), capabilities: form.capabilities.split(',').map(c => c.trim()).filter(Boolean) }) }); if (res.ok) { setShowForm(false); setForm({ name: '', provider_type: 'openai', api_key: '', models: '', capabilities: 'text' }); loadProviders(); } } catch {} };
  const handleDelete = async (id: string) => { if (!confirm('Delete this provider?')) return; try { await fetch('/api/ai-providers', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); loadProviders(); } catch {} };
  const handleToggle = async (id: string, active: boolean) => { try { await fetch('/api/ai-providers', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, active: !active }) }); loadProviders(); } catch {} };

  return (<div className="pt-28 pb-20"><div className="mx-auto max-w-7xl px-6"><div className="flex items-center justify-between"><h1 className="text-2xl font-bold font-display">AI Providers</h1><Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="mr-1 h-4 w-4" />Add Provider</Button></div>{showForm && (<Card className="mt-6"><h3 className="mb-4 font-semibold font-display">New Provider</h3><form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-2"><Input label="Name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} required /><div className="space-y-2"><label className="text-sm font-medium text-white/80">Type</label><select value={form.provider_type} onChange={(e) => setForm(p => ({ ...p, provider_type: e.target.value }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white"><option value="openai">OpenAI</option><option value="anthropic">Anthropic</option><option value="groq">Groq</option><option value="gemini">Gemini</option><option value="custom">Custom</option></select></div><Input label="API Key" value={form.api_key} onChange={(e) => setForm(p => ({ ...p, api_key: e.target.value }))} required placeholder="sk-..." /><Input label="Models (comma-separated)" value={form.models} onChange={(e) => setForm(p => ({ ...p, models: e.target.value }))} placeholder="gpt-4, gpt-3.5-turbo" /><Input label="Capabilities" value={form.capabilities} onChange={(e) => setForm(p => ({ ...p, capabilities: e.target.value }))} placeholder="text, image, audio" /><div className="sm:col-span-2 flex gap-2"><Button type="submit">Create</Button><Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button></div></form></Card>)}<div className="mt-6 space-y-3">{loading ? <GridSkeleton count={3} /> : providers.map(p => (<div key={p.id} className="flex items-center justify-between glass-card p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div><div><div className="flex items-center gap-2"><p className="font-medium font-display">{p.name}</p><Badge variant={p.active ? 'success' : 'default'}>{p.active ? 'Active' : 'Inactive'}</Badge></div><p className="text-sm text-white/40">{p.provider_type} • {p.models?.join(', ') || 'No models'}</p></div></div><div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => handleToggle(p.id, p.active)}>{p.active ? 'Disable' : 'Enable'}</Button><Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4" /></Button></div></div>))}</div></div></div>);
}