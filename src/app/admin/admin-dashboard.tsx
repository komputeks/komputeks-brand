'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
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
    } catch (err) { console.error('Failed to load admin data:', err); }
    finally { setLoading(false); }
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
    try { const res = await fetch('/api/products', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); if (res.ok) loadData(); }
    catch (err) { console.error('Delete failed:', err); }
  };

  const handleMarkRead = async (id: string, read: boolean) => {
    try { await fetch('/api/contacts', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read }) }); loadData(); }
    catch (err) { console.error('Update failed:', err); }
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
        {tab === 'products' && (
          <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="mr-1 h-4 w-4" /> Add Product</Button>
        )}
      </div>
      <div className="mt-6 flex gap-1 rounded-xl bg-white/5 p-1">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key)} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-300 ${tab === key ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}>
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
                  <Card className="p-6">
                    <h3 className="mb-4 font-semibold font-display">New Product</h3>
                    <form onSubmit={handleCreateProduct} className="grid gap-3 sm:grid-cols-2">
                      <Input label="Name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} required />
                      <Input label="Slug" value={form.slug} onChange={(e) => setForm(p => ({ ...p, slug: e.target.value }))} required />
                      <Input label="Tagline" value={form.tagline} onChange={(e) => setForm(p => ({ ...p, tagline: e.target.value }))} required />
                      <Input label="Category" value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} />
                      <Input label="URL" value={form.url} onChange={(e) => setForm(p => ({ ...p, url: e.target.value }))} placeholder="https://..." />
                      <Input label="Icon" value={form.icon} onChange={(e) => setForm(p => ({ ...p, icon: e.target.value }))} />
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-white/80">Description</label>
                        <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} required rows={3} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
                      </div>
                      <div className="sm:col-span-2 flex gap-2">
                        <Button type="submit">Create</Button>
                        <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                      </div>
                    </form>
                  </Card>
                )}
                {products.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium font-display">{p.name}</p>
                        <Badge variant={p.status === 'working' ? 'success' : p.status === 'partly-working' ? 'warning' : 'default'}>{p.status}</Badge>
                      </div>
                      <p className="text-sm text-white/50">{p.tagline}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(p.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                  </div>
                ))}
              </div>
            )}
            {tab === 'contacts' && (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div key={c.id} className={`rounded-xl border bg-white/5 p-4 backdrop-blur-xl ${c.read ? 'border-white/10' : 'border-brand-500/30'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium font-display">{c.name}</p>
                          {!c.read && <Badge variant="warning">New</Badge>}
                        </div>
                        <p className="text-xs text-white/50">{c.email}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleMarkRead(c.id, !c.read)}>
                        {c.read ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-green-400" />}
                      </Button>
                    </div>
                    <p className="mt-1 text-sm font-medium text-white/80">{c.subject}</p>
                    <p className="mt-1 text-sm text-white/60">{c.message}</p>
                  </div>
                ))}
                {contacts.length === 0 && <p className="py-8 text-center text-white/50">No contacts yet.</p>}
              </div>
            )}
            {tab === 'subscribers' && (
              <div className="space-y-2">
                {subscribers.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
                    <Mail className="h-4 w-4 text-brand-400" />
                    <span className="text-sm">{s.email}</span>
                    <span className="text-xs text-white/50">{s.source}</span>
                  </div>
                ))}
                {subscribers.length === 0 && <p className="py-8 text-center text-white/50">No subscribers yet.</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}