'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, MessageSquare, Rocket, Key, TrendingUp } from 'lucide-react';
import { GridSkeleton } from '@/components/ui/skeleton';

interface Deployment { id: string; template_repo: string; target_repo: string; deployment_url: string | null; status: string; created_at: string }

export default function AnalyticsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [chatCount, setChatCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const res = await fetch(`/api/deploy?userId=${user.id}`);
        if (res.ok) setDeployments(await res.json());
        // Get chat count
        const chatRes = await fetch(`/api/chat-session?userId=${user.id}`);
        if (chatRes.ok) {
          const chatData = await chatRes.json();
          setChatCount(chatData.messages?.length || 0);
        }
      }
    } catch {} finally { setLoading(false); }
  };

  const statusBadge = (s: string) => {
    const map: Record<string, { variant: 'success' | 'warning' | 'info' | 'default'; label: string }> = {
      'success': { variant: 'success', label: 'Live' },
      'deploying': { variant: 'warning', label: 'Deploying' },
      'repo-created': { variant: 'info', label: 'Repo Created' },
      'pending': { variant: 'default', label: 'Pending' },
      'error': { variant: 'default', label: 'Error' },
    }; const cfg = map[s] || { variant: 'default' as const, label: s }; return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
  };

  return (<div>
    <h1 className="text-2xl font-bold font-display">Analytics</h1>
    <p className="mt-1 text-sm text-white/60">Your activity and usage overview.</p>

    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6"><div className="flex items-center gap-3"><Rocket className="h-5 w-5 text-brand-400" /><div><p className="text-sm text-white/40">Deployments</p><p className="text-2xl font-bold font-display">{deployments.length}</p></div></div></Card>
      <Card className="p-6"><div className="flex items-center gap-3"><MessageSquare className="h-5 w-5 text-cyan-400" /><div><p className="text-sm text-white/40">Chat Messages</p><p className="text-2xl font-bold font-display">{chatCount}</p></div></div></Card>
      <Card className="p-6"><div className="flex items-center gap-3"><Key className="h-5 w-5 text-green-400" /><div><p className="text-sm text-white/40">AI Providers</p><p className="text-2xl font-bold font-display">0</p></div></div></Card>
      <Card className="p-6"><div className="flex items-center gap-3"><TrendingUp className="h-5 w-5 text-purple-400" /><div><p className="text-sm text-white/40">Env Vars</p><p className="text-2xl font-bold font-display">0</p></div></div></Card>
    </div>

    <div className="mt-8">
      <h2 className="text-lg font-semibold font-display mb-4">Recent Deployments</h2>
      {loading ? <GridSkeleton count={2} /> : deployments.length === 0 ? (
        <Card className="p-8 text-center"><p className="text-white/40">No deployments yet. Visit a product page and click "Deploy in Minutes".</p></Card>
      ) : (
        <div className="space-y-3">
          {deployments.map(d => (
            <div key={d.id} className="glass-card p-4 flex items-center justify-between">
              <div><p className="font-medium font-display">{d.target_repo}</p><p className="text-xs text-white/40">From {d.template_repo}</p></div>
              <div className="flex items-center gap-3">{statusBadge(d.status)}{d.deployment_url && <a href={d.deployment_url} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-400 hover:text-brand-300">Visit →</a>}</div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Upgrade CTA */}
    <div className="mt-8 rounded-xl bg-gradient-to-r from-brand-500/10 to-cyan-500/10 border border-brand-500/20 p-6 text-center">
      <p className="font-semibold font-display">Upgrade to Pro</p>
      <p className="text-sm text-white/40 mt-1">Get unlimited deployments, priority support, and advanced analytics.</p>
      <button className="mt-3 px-5 py-2 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-xl text-white font-medium hover:from-brand-400 hover:to-cyan-400 transition-all">Coming Soon</button>
    </div>
  </div>);
}