'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GridSkeleton } from '@/components/ui/skeleton';
import { Rocket, ExternalLink } from 'lucide-react';

interface Deployment { id: string; product_id: string; template_repo: string; target_repo: string; target_repo_url: string | null; deployment_url: string | null; deployment_provider: string; status: string; created_at: string }

export default function MyProjectsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadDeployments(); }, []);

  const loadDeployments = async () => {
    setLoading(true);
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const res = await fetch(`/api/deploy?userId=${user.id}`);
        if (res.ok) setDeployments(await res.json());
      }
    } catch {} finally { setLoading(false); }
  };

  const statusBadge = (s: string) => {
    const map: Record<string, { variant: 'success' | 'warning' | 'info' | 'default'; label: string }> = {
      'success': { variant: 'success', label: 'Live' }, 'deploying': { variant: 'warning', label: 'Deploying' }, 'repo-created': { variant: 'info', label: 'Repo Created' }, 'pending': { variant: 'default', label: 'Pending' },
    }; const cfg = map[s] || { variant: 'default' as const, label: s }; return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
  };

  return (<div>
    <h1 className="text-2xl font-bold font-display">My Projects</h1>
    <p className="mt-1 text-sm text-white/60">Deployed projects and their status.</p>

    {loading ? <GridSkeleton count={3} /> : deployments.length === 0 ? (
      <div className="mt-8"><Card className="p-8 text-center">
        <Rocket className="h-12 w-12 text-brand-400 mx-auto mb-4" />
        <p className="font-medium font-display">No projects yet</p>
        <p className="text-sm text-white/40 mt-1">Visit a product page and click "Deploy in Minutes" to get started.</p>
        <a href="/products" className="mt-4 inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm font-medium">Browse Products →</a>
      </Card></div>
    ) : (
      <div className="mt-8 space-y-4">
        {deployments.map(d => (
          <Card key={d.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2"><p className="font-semibold font-display">{d.target_repo}</p>{statusBadge(d.status)}</div>
                <p className="text-sm text-white/40 mt-1">Template: {d.template_repo} • Provider: {d.deployment_provider}</p>
              </div>
              <div className="flex items-center gap-2">
                {d.target_repo_url && <a href={d.target_repo_url} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-lg"><ExternalLink className="h-4 w-4 text-white/50" /></a>}
              </div>
            </div>
            {d.deployment_url && <a href={d.deployment_url} target="_blank" rel="noopener noreferrer" className="mt-3 text-sm text-brand-400 hover:text-brand-300 block">Visit live site →</a>}
          </Card>
        ))}
      </div>
    )}
  </div>);
}