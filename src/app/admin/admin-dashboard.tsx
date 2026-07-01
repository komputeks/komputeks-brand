'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GridSkeleton } from '@/components/ui/skeleton';
import type { Product, Contact, Subscriber } from '@/features/products/types';
import {
  Plus, Trash2, CheckCircle, XCircle, Users, MessageSquare, Package,
  Mail, BarChart3, Settings, FileText, Shield, Activity, Eye, Ban,
  ChevronDown, ChevronUp, Search
} from 'lucide-react';

type Tab = 'overview' | 'products' | 'contacts' | 'subscribers' | 'users' | 'settings';

interface UserRow { id: string; email: string; full_name: string | null; role: string; created_at: string; }

export function AdminDashboard() {
  const { data: session } = useSession();
  const [tab, setTab] = useState<Tab>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ name: '', slug: '', tagline: '', description: '', url: '', status: 'not-started' as Product['status'], category: 'Developer Tools', icon: 'code', sort_order: 0 });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, cRes, sRes, uRes] = await Promise.all([
        fetch('/api/products'), fetch('/api/contacts'), fetch('/api/subscribers'), fetch('/api/admin/users'),
      ]);
      if (pRes.ok) setProducts(await pRes.json());
      if (cRes.ok) setContacts(await cRes.json());
      if (sRes.ok) setSubscribers(await sRes.json());
      if (uRes.ok) setUsers(await uRes.json());
    } catch (err) { console.error('Failed to load admin data:', err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

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

  const handleRoleChange = async (userId: string, role: string) => {
    try { await fetch('/api/admin/users', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: userId, role }) }); loadData(); }
    catch (err) { console.error('Role change failed:', err); }
  };

  const unreadContacts = contacts.filter(c => !c.read).length;
  const workingProducts = products.filter(p => p.status === 'working').length;
  const filteredProducts = searchTerm ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase())) : products;

  const tabs: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'products', label: 'Products', icon: Package },
    { key: 'contacts', label: 'Contacts', icon: MessageSquare, badge: unreadContacts },
    { key: 'subscribers', label: 'Subscribers', icon: Users },
    { key: 'users', label: 'Users', icon: Shield },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Admin Dashboard</h1>
          <p className="text-sm text-white/50">Manage your Komputeks ecosystem</p>
        </div>
        {tab === 'products' && <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="mr-1 h-4 w-4" /> Add Product</Button>}
      </div>

      <div className="flex gap-1 overflow-x-auto rounded-xl bg-white/5 p-1">
        {tabs.map(({ key, label, icon: Icon, badge }) => (
          <button key={key} onClick={() => setTab(key)} className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${tab === key ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}>
            <Icon className="h-4 w-4" /> {label}
            {badge ? <span className="ml-1 rounded-full bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">{badge}</span> : null}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading ? <GridSkeleton count={3} /> : (
          <>
            {/* OVERVIEW */}
            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card className="p-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10"><Package className="h-5 w-5 text-brand-400" /></div><div><p className="text-2xl font-bold font-[family-name:var(--font-display)]">{products.length}</p><p className="text-xs text-white/50">Total Products</p></div></div></Card>
                  <Card className="p-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10"><Activity className="h-5 w-5 text-green-400" /></div><div><p className="text-2xl font-bold font-[family-name:var(--font-display)]">{workingProducts}</p><p className="text-xs text-white/50">Live Products</p></div></div></Card>
                  <Card className="p-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10"><Users className="h-5 w-5 text-cyan-400" /></div><div><p className="text-2xl font-bold font-[family-name:var(--font-display)]">{subscribers.length}</p><p className="text-xs text-white/50">Subscribers</p></div></div></Card>
                  <Card className="p-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10"><MessageSquare className="h-5 w-5 text-yellow-400" /></div><div><p className="text-2xl font-bold font-[family-name:var(--font-display)]">{unreadContacts}</p><p className="text-xs text-white/50">Unread Messages</p></div></div></Card>
                </div>
                <Card>
                  <CardHeader><h3 className="font-semibold font-[family-name:var(--font-display)]">Recent Contacts</h3></CardHeader>
                  <CardContent>{contacts.slice(0, 5).map(c => (
                    <div key={c.id} className="flex items-center justify-between border-b border-white/5 py-3 last:border-0">
                      <div><p className="text-sm font-medium">{c.name}</p><p className="text-xs text-white/50">{c.subject}</p></div>
                      <div className="flex items-center gap-2">{!c.read && <Badge variant="warning">New</Badge>}<span className="text-xs text-white/40">{new Date(c.created_at).toLocaleDateString()}</span></div>
                    </div>
                  ))}</CardContent>
                </Card>
              </div>
            )}

            {/* PRODUCTS */}
            {tab === 'products' && (
              <div className="space-y-4">
                <Input placeholder="Filter products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                {showForm && (
                  <Card className="p-6">
                    <h3 className="mb-4 font-semibold font-[family-name:var(--font-display)]">New Product</h3>
                    <form onSubmit={handleCreateProduct} className="grid gap-3 sm:grid-cols-2">
                      <Input label="Name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} required />
                      <Input label="Slug" value={form.slug} onChange={(e) => setForm(p => ({ ...p, slug: e.target.value }))} required />
                      <Input label="Tagline" value={form.tagline} onChange={(e) => setForm(p => ({ ...p, tagline: e.target.value }))} required />
                      <Input label="Category" value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} />
                      <Input label="URL" value={form.url} onChange={(e) => setForm(p => ({ ...p, url: e.target.value }))} placeholder="https://..." />
                      <Input label="Icon" value={form.icon} onChange={(e) => setForm(p => ({ ...p, icon: e.target.value }))} />
                      <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium text-white/80">Description</label><textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} required rows={3} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" /></div>
                      <div className="sm:col-span-2 flex gap-2"><Button type="submit">Create</Button><Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button></div>
                    </form>
                  </Card>
                )}
                {filteredProducts.map(p => (
                  <div key={p.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10">
                    <div><div className="flex items-center gap-2"><p className="font-medium font-[family-name:var(--font-display)]">{p.name}</p><Badge variant={p.status === 'working' ? 'success' : p.status === 'partly-working' ? 'warning' : 'default'}>{p.status}</Badge></div><p className="text-sm text-white/50">{p.tagline}</p></div>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(p.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                  </div>
                ))}
              </div>
            )}

            {/* CONTACTS */}
            {tab === 'contacts' && (
              <div className="space-y-3">
                {contacts.map(c => (
                  <div key={c.id} className={`rounded-xl border bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 ${c.read ? 'border-white/10' : 'border-brand-500/30'}`}>
                    <div className="flex items-start justify-between"><div><div className="flex items-center gap-2"><p className="font-medium font-[family-name:var(--font-display)]">{c.name}</p>{!c.read && <Badge variant="warning">New</Badge>}</div><p className="text-xs text-white/50">{c.email}</p></div>
                    <Button variant="ghost" size="sm" onClick={() => handleMarkRead(c.id, !c.read)}>{c.read ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-green-400" />}</Button></div>
                    <p className="mt-1 text-sm font-medium text-white/80">{c.subject}</p><p className="mt-1 text-sm text-white/60">{c.message}</p>
                  </div>
                ))}
                {contacts.length === 0 && <p className="py-8 text-center text-white/50">No contacts yet.</p>}
              </div>
            )}

            {/* SUBSCRIBERS */}
            {tab === 'subscribers' && (
              <div className="space-y-2">
                {subscribers.map(s => (
                  <div key={s.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl"><Mail className="h-4 w-4 text-brand-400" /><span className="text-sm">{s.email}</span><span className="text-xs text-white/50">{s.source}</span></div>
                ))}
                {subscribers.length === 0 && <p className="py-8 text-center text-white/50">No subscribers yet.</p>}
              </div>
            )}

            {/* USERS */}
            {tab === 'users' && (
              <div className="space-y-3">
                {users.map(u => (
                  <div key={u.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-400">{(u.full_name || u.email).charAt(0).toUpperCase()}</div>
                      <div><p className="font-medium font-[family-name:var(--font-display)]">{u.full_name || u.email}</p><p className="text-xs text-white/50">{u.email}</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={u.role === 'admin' ? 'info' : 'default'}>{u.role}</Badge>
                      {u.role !== 'admin' && <Button variant="ghost" size="sm" onClick={() => handleRoleChange(u.id, 'admin')} title="Promote to admin"><ChevronUp className="h-4 w-4 text-brand-400" /></Button>}
                      {u.role === 'admin' && u.email !== session?.user?.email && <Button variant="ghost" size="sm" onClick={() => handleRoleChange(u.id, 'user')} title="Demote to user"><ChevronDown className="h-4 w-4 text-white/40" /></Button>}
                    </div>
                  </div>
                ))}
                {users.length === 0 && <p className="py-8 text-center text-white/50">No users yet.</p>}
              </div>
            )}

            {/* SETTINGS */}
            {tab === 'settings' && (
              <Card className="p-6 space-y-6">
                <h3 className="font-semibold font-[family-name:var(--font-display)]">Site Settings</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Site Name" defaultValue="Komputeks" disabled />
                  <Input label="Site URL" defaultValue="https://komputeks-brand.vercel.app" disabled />
                  <Input label="Admin Email" defaultValue={session?.user?.email || ''} disabled />
                  <Input label="Google Client ID" defaultValue={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? '••••••' : 'Not set'} disabled />
                </div>
                <p className="text-xs text-white/40">Environment variables are managed via Vercel dashboard. Changes here are for display only.</p>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
