'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GridSkeleton } from '@/components/ui/skeleton';
import type { Product, Contact, Subscriber } from '@/features/products/types';
import { Plus, Trash2, CheckCircle, XCircle, Users, MessageSquare, Package, Mail } from 'lucide-react';

type Tab = 'products' | 'contacts' | 'subscribers';

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', tagline: '', description: '', url: '', status: 'not-started' as Product['status'], category: 'Developer Tools', icon: 'code', sort_order: 0 });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes, sRes] = await Promise.all([fetch('/api/products'), fetch('/api/contacts'), fetch('/api/subscribers')]);
      if (pRes.ok) setProducts(await pRes.json());
      if (cRes.ok) setContacts(await cRes.json());
      if (sRes.ok) setSubscribers(await sRes.json());
    } catch (err) { console.error('Failed to load:', err); } finally { setLoading(false); }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, url: form.url || null }) });
      if (res.ok) { setShowForm(false); setForm({ name: '', slug: '', tagline: '', description: '', url: '', status: 'not-started', category: 'Developer Tools', icon: 'code', sort_order: 0 }); loadData(); }
    } catch (err) { console.error('Create failed:', err); }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try { const res = await fetch('/api/products', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); if (res.ok) loadData(); } catch (err) { console.error('Delete failed:', err); }
  };

  const handleMarkRead = async (id: string, read: boolean) => {
    try { await fetch('/api/contacts', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read }) }); loadData(); } catch (err) { console.error('Update failed:', err); }
  };

  const tabs: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'products', label: 'Products', icon: Package },
    { key: 'contacts', label: 'Contacts', icon: MessageSquare },
    { key: 'subscribers', label: 'Subscribers', icon: Users },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-display">Admin Dashboard</h1>
        {tab === 'products' && <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="mr-1 h-4 w-4" /> Add Product</Button>}
      </div>

      <div className="mt-6 flex gap-1 rounded-lg bg-white/5 border border-white/10 p-1">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key)} className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300 ${tab === key ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading ? <GridSkeleton count={3} /> : (
          <>
            {tab === 'products' && (
              <div className="space-y-4">
                {showForm && (
                  <div className="glass-card p-6">
                    <h3 className="mb-4 font-semibold font-display">New Product</h3>
                    <form onSubmit={handleCreateProduct} className="grid gap-3 sm:grid-cols-2">
                      <Input label="Name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} required />
                      <Input label="Slug" value={form.slug} onChange={(e) => setForm(p => ({ ...p, slug: e.target.value }))} required />
                      <Input label="Tagline" value={form.tagline} onChange={(e) => setForm(p => ({ ...p, tagline: e.target.value }))} required />
                      <Input label="Category" value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} />
                      <Input label="URL" value={form.url} onChange={(e) => setForm(p => ({ ...p, url: e.target.value }))} placeholder="https://..." />
                      <Input label="Icon" value={form.icon} onChange={(e) => setForm(p => ({ ...p, icon: e.target.value }))} />
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-white/80">Description</label>
                        <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} required rows={3} className="mt-1 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-300 placeholder:text-white/40" />
                      </div>
                      <div className="sm:col-span-2 flex gap-2">
                        <Button type="submit">Create</Button>
                        <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                      </div>
                    </form>
                  </div>
                )}
                {products.map((p) => (
                  <div key={p.id} className="flex items-center justify-between glass-card p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium font-display">{p.name}</p>
                        <Badge variant={p.status === 'working' ? 'success' : p.status === 'partly-working' ? 'warning' : 'default'}>{p.status}</Badge>
                      </div>
                      <p className="text-sm text-white/40">{p.tagline}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(p.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                  </div>
                ))}
              </div>
            )}

            {tab === 'contacts' && (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div key={c.id} className={`glass-card p-4 ${!c.read ? 'border-brand-500/30' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium font-display">{c.name}</p>
                          {!c.read && <Badge variant="warning">New</Badge>}
                        </div>
                        <p className="text-xs text-white/40">{c.email}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleMarkRead(c.id, !c.read)}>
                        {c.read ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-green-400" />}
                      </Button>
                    </div>
                    <p className="mt-1 text-sm font-medium">{c.subject}</p>
                    <p className="mt-1 text-sm text-white/60">{c.message}</p>
                  </div>
                ))}
                {contacts.length === 0 && <p className="py-8 text-center text-white/40">No contacts yet.</p>}
              </div>
            )}

            {tab === 'subscribers' && (
              <div className="space-y-2">
                {subscribers.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 glass-card p-3">
                    <Mail className="h-4 w-4 text-brand-400" />
                    <span className="text-sm font-medium">{s.email}</span>
                    <span className="text-xs text-white/40">{s.source}</span>
                  </div>
                ))}
                {subscribers.length === 0 && <p className="py-8 text-center text-white/40">No subscribers yet.</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}