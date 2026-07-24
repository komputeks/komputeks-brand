'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { GridSkeleton } from '@/components/ui/skeleton';
import { Key, Plus, Trash2 } from 'lucide-react';

interface EnvVar { id: string; name: string; key: string; value: string; project_id: string | null; created_at: string }

export default function EnvironmentsPage() {
  const [envVars, setEnvVars] = useState<EnvVar[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', key: '', value: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const res = await fetch(`/api/env-vars?userId=${user.id}`);
        if (res.ok) setEnvVars(await res.json());
      }
    } catch {} finally { setLoading(false); }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/env-vars', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, ...form }) });
      if (res.ok) { setShowForm(false); setForm({ name: '', key: '', value: '' }); loadData(); }
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this env var?')) return;
    try {
      await fetch('/api/env-vars', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      loadData();
    } catch {}
  };

  return (<div>
    <h1 className="text-2xl font-bold font-display">Environments</h1>
    <p className="mt-1 text-sm text-white/60">Save and manage environment variables for your deployments.</p>

    <div className="mt-8 flex items-center justify-between">
      <p className="text-sm text-white/40">{envVars.length} variables saved</p>
      <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="mr-1 h-4 w-4" />Add Variable</Button>
    </div>

    {showForm && (<Card className="mt-4 p-6">
      <form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-3">
        <Input label="Name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="DATABASE_URL" />
        <Input label="Key" value={form.key} onChange={(e) => setForm(p => ({ ...p, key: e.target.value }))} placeholder="Key" />
        <Input label="Value" value={form.value} onChange={(e) => setForm(p => ({ ...p, value: e.target.value }))} placeholder="Value" />
        <div className="sm:col-span-3 flex gap-2"><Button type="submit">Save</Button><Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button></div>
      </form>
    </Card>)}

    {loading ? <GridSkeleton count={3} /> : envVars.length === 0 ? (
      <Card className="mt-4 p-8 text-center"><Key className="h-12 w-12 text-brand-400 mx-auto mb-4" /><p className="font-medium font-display">No env vars yet</p><p className="text-sm text-white/40 mt-1">Add environment variables for your deployments.</p></Card>
    ) : (
      <div className="mt-4 space-y-3">
        {envVars.map(ev => (
          <div key={ev.id} className="glass-card p-4 flex items-center justify-between">
            <div><p className="font-medium font-display">{ev.name || ev.key}</p><p className="text-xs text-white/40">Key: {ev.key}</p></div>
            <Button variant="danger" size="sm" onClick={() => handleDelete(ev.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    )}

    {/* Upgrade CTA */}
    <div className="mt-8 rounded-xl bg-gradient-to-r from-brand-500/10 to-cyan-500/10 border border-brand-500/20 p-6 text-center">
      <p className="font-semibold font-display">Upgrade to Pro</p>
      <p className="text-sm text-white/40 mt-1">Pro users get encrypted env var storage, team sharing, and deployment integration.</p>
      <button className="mt-3 px-5 py-2 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-xl text-white font-medium transition-all">Coming Soon</button>
    </div>
  </div>);
}