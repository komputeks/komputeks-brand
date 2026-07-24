'use client';

import { useState, useEffect } from 'react';
import { Github, Globe, Server, Database, CheckCircle, Loader2 } from 'lucide-react';

const providers = [
  { key: 'github', label: 'GitHub', icon: Github },
  { key: 'vercel', label: 'Vercel', icon: Globe },
  { key: 'netlify', label: 'Netlify', icon: Globe },
  { key: 'cloudflare', label: 'Cloudflare', icon: Server },
  { key: 'supabase', label: 'Supabase', icon: Database },
];

export function ConnectedAccountsManager({ userId }: { userId: string }) {
  const [accounts, setAccounts] = useState<{ provider: string; connected: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/connected-accounts?userId=${userId}`)
      .then((r) => r.json())
      .then((data) => {
        const connectedProviders = (data || []).map((a: { provider: string }) => a.provider);
        setAccounts(providers.map((p) => ({ provider: p.key, connected: connectedProviders.includes(p.key) })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  const handleConnect = (providerKey: string) => {
    if (providerKey === 'github') {
      const clientId = 'Iv23li5fIiDYD0frXvzB';
      const redirectUri = `${window.location.origin}/api/github-callback`;
      const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo`;
      window.open(url, 'github-connect', 'width=600,height=700');
    }
  };

  if (loading) return <div className="py-8 text-center"><Loader2 className="h-6 w-6 animate-spin text-brand-400" /></div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Connected Accounts</h2>
      <p className="text-sm text-white/60">Connect your services to enable one-click deployment. This only happens once.</p>
      <div className="space-y-3">
        {providers.map((p) => {
          const connected = accounts.find((a) => a.provider === p.key)?.connected || false;
          return (
            <div key={p.key} className="glass-card flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <p.icon className="h-5 w-5 text-white/70" />
                <span className="font-medium text-white">{p.label}</span>
                {connected ? <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-green-500/20 text-green-400">Connected</span> : <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/5 text-white/50">Not Connected</span>}
              </div>
              {connected ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <button onClick={() => handleConnect(p.key)} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-brand-500 text-white hover:bg-brand-600 transition-colors">Connect</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
