'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

export default function DeploymentPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [githubConnected, setGithubConnected] = useState(false);
  const [githubUsername, setGithubUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const res = await fetch(`/api/platform-tokens?userId=${user.id}&provider=github`);
        if (res.ok) {
          const data = await res.json();
          setGithubConnected(data.connected); setGithubUsername(data.username || '');
        }
      }
    } catch {} finally { setLoading(false); }
  };

  const connectGithub = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'komputeks';
    const redirectUri = `${window.location.origin}/api/github-oauth`;
    const state = userId || '';
    window.open(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo&state=${encodeURIComponent(state)}`, 'github-auth', 'width=500,height=600');
    const poll = setInterval(async () => {
      const res = await fetch(`/api/platform-tokens?userId=${userId}&provider=github`);
      if (res.ok) { const data = await res.json(); if (data.connected) { setGithubConnected(true); setGithubUsername(data.username || ''); clearInterval(poll); } }
    }, 3000);
    setTimeout(() => clearInterval(poll), 120000);
  };

  const disconnectGithub = async () => {
    if (!confirm('Disconnect GitHub account?')) return;
    try {
      await fetch('/api/platform-tokens', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, provider: 'github' }) });
      setGithubConnected(false); setGithubUsername('');
    } catch {}
  };

  return (<div>
    <h1 className="text-2xl font-bold font-display">Deployment</h1>
    <p className="mt-1 text-sm text-white/60">Connected accounts for deploying projects.</p>

    <div className="mt-8 space-y-4">
      {/* GitHub */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Github className="h-5 w-5 text-white" /></div>
            <div>
              <p className="font-medium font-display">GitHub</p>
              {githubConnected ? (
                <p className="text-sm text-green-400">Connected — {githubUsername}</p>
              ) : (<p className="text-sm text-white/40">Not connected</p>)}
            </div>
          </div>
          {githubConnected ? (
            <Button variant="danger" size="sm" onClick={disconnectGithub}><Trash2 className="h-4 w-4 mr-1" />Disconnect</Button>
          ) : (
            <Button size="sm" onClick={connectGithub}><Github className="h-4 w-4 mr-1" />Connect</Button>
          )}
        </div>
      </Card>

      {/* Vercel */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><span className="text-lg font-bold font-display text-white/60">V</span></div>
            <div>
              <p className="font-medium font-display">Vercel</p>
              <p className="text-sm text-white/40">Connect via PAT for auto-deployment</p>
            </div>
          </div>
          <Badge variant="default">Coming Soon</Badge>
        </div>
      </Card>

      {/* Netlify */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><span className="text-lg font-bold font-display text-white/60">N</span></div>
            <div>
              <p className="font-medium font-display">Netlify</p>
              <p className="text-sm text-white/40">Connect via PAT for deployment</p>
            </div>
          </div>
          <Badge variant="default">Coming Soon</Badge>
        </div>
      </Card>

      {/* Cloudflare */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><span className="text-lg font-bold font-display text-white/60">CF</span></div>
            <div>
              <p className="font-medium font-display">Cloudflare Pages</p>
              <p className="text-sm text-white/40">Connect via API token</p>
            </div>
          </div>
          <Badge variant="default">Coming Soon</Badge>
        </div>
      </Card>
    </div>

    {/* Upgrade CTA */}
    <div className="mt-8 rounded-xl bg-gradient-to-r from-brand-500/10 to-cyan-500/10 border border-brand-500/20 p-6 text-center">
      <p className="font-semibold font-display">Upgrade to Pro</p>
      <p className="text-sm text-white/40 mt-1">Pro users can connect multiple deployment platforms and get priority deployments.</p>
      <button className="mt-3 px-5 py-2 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-xl text-white font-medium transition-all">Coming Soon</button>
    </div>
  </div>);
}