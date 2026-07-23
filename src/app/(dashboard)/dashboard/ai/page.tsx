'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GridSkeleton } from '@/components/ui/skeleton';
import { Plus, Trash2, Bot, Key } from 'lucide-react';

interface AIProvider { id: string; name: string; provider_type: string; models: string[]; capabilities: string[]; active: boolean; is_admin: boolean }

export default function UserAIProvidersPage() {
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', provider_type: 'openai', api_key: '', models: '', capabilities: 'text' });

  useEffect(() => { loadProviders(); }, []);
  const loadProviders = async () => { setLoading(true); try { const res = await fetch('/api/ai-providers'); if (res.ok) setProviders(await res.json()); } catch {} finally { setLoading(false); } };
  const handleCreate = async (e: React.FormEvent) => { e.preventDefault(); try { const res = await fetch('/api/ai-providers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, models: form.models.split(',').map(m => m.trim()).filter(Boolean), capabilities: form.capabilities.split(',').map(c => c.trim()).filter(Boolean), is_user: true }) }); if (res.ok) { setShowForm(false); loadProviders(); } } catch {} };
  const handleDelete = async (id: string) => { if (!confirm('Delete this provider?')) return; try { await fetch('/api/ai-providers', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); loadProviders(); } catch {} };

  const adminProviders = providers.filter(p => p.is_admin);
  const userProviders = providers.filter(p => !p.is_admin);

  return (<div><h1 className="text-2xl font-bold font-display">AI Providers</h1><p className="mt-1 text-sm text-white/60">Manage your AI providers and use them in chat.</p><div className="mt-8"><h2 className="text-lg font-semibold font-display">Admin Providers</h2><p className="text-sm text-white/40">Pre-configured by Komputeks — available to all users.</p><div className="mt-4 space-y-3">{loading ? <GridSkeleton count={2} /> : adminProviders.map(p => (<div key={p.id} className="glass-card p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div><div><div className="flex items-center gap-2"><p className="font-medium font-display">{p.name}</p><Badge variant={p.active ? 'success' : 'default'}>{p.active ? 'Active' : 'Inactive'}</Badge></div><p className="text-sm text-white/40">{p.provider_type} • {p.models?.join(', ') || 'No models'}</p></div></div></div>))}</div></div><div className="mt-8"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold font-display">Your Providers</h2><Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="mr-1 h-4 w-4" />Add Provider</Button></div>{showForm && (<Card className="mt-4"><form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-2"><Input label="Name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} required /><div className="space-y-2"><label className="text-sm font-medium text-white/80">Type</label><select value={form.provider_type} onChange={(e) => setForm(p => ({ ...p, provider_type: e.target.value }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white"><option value="openai">OpenAI</option><option value="anthropic">Anthropic</option><option value="groq">Groq</option><option value="gemini">Gemini</option><option value="custom">Custom</option></select></div><Input label="API Key" value={form.api_key} onChange={(e) => setForm(p => ({ ...p, api_key: e.target.value }))} required /><Input label="Models" value={form.models} onChange={(e) => setForm(p => ({ ...p, models: e.target.value }))} placeholder="gpt-4, gpt-3.5-turbo" /><div className="sm:col-span-2 flex gap-2"><Button type="submit">Create</Button><Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button></div></form></Card>)}<div className="mt-4 space-y-3">{userProviders.map(p => (<div key={p.id} className="flex items-center justify-between glass-card p-4"><div className="flex items-center gap-3"><Key className="h-5 w-5 text-brand-400" /><div><p className="font-medium font-display">{p.name}</p><p className="text-sm text-white/40">{p.provider_type}</p></div></div><Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4" /></Button></div>))}</div></div></div>);
}