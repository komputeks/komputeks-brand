'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Github, CheckCircle, AlertCircle, Loader2, ExternalLink, ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/features/products/types';

interface Step { id: number; title: string; description: string; completed: boolean; active: boolean }

export function DeployWizard({ product, onClose }: { product: Product; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [githubConnected, setGithubConnected] = useState(false);
  const [githubUsername, setGithubUsername] = useState('');
  const [deployProvider, setDeployProvider] = useState('vercel');
  const [repoName, setRepoName] = useState(product.slug);
  const [envVars, setEnvVars] = useState<Record<string, string>>({ NEXT_PUBLIC_SITE_URL: '' });
  const [deploying, setDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<{ repoUrl?: string; deploymentUrl?: string; logs?: string[]; error?: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (userId) checkGithub();
  }, [userId]);

  const checkAuth = async () => {
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsSignedIn(true);
        setUserId(user.id);
      }
    } catch {}
  };

  const checkGithub = async () => {
    try {
      const res = await fetch(`/api/platform-tokens?userId=${userId}&provider=github`);
      if (res.ok) {
        const data = await res.json();
        setGithubConnected(data.connected);
        setGithubUsername(data.username || '');
      }
    } catch {}
  };

  const connectGithub = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'komputeks';
    const redirectUri = `${window.location.origin}/api/github-oauth`;
    const state = userId || '';
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo&state=${encodeURIComponent(state)}`,
      'github-auth',
      'width=500,height=600'
    );
    // Poll for connection
    const poll = setInterval(async () => {
      const res = await fetch(`/api/platform-tokens?userId=${userId}&provider=github`);
      if (res.ok) {
        const data = await res.json();
        if (data.connected) {
          setGithubConnected(true);
          setGithubUsername(data.username || '');
          clearInterval(poll);
        }
      }
    }, 3000);
    setTimeout(() => clearInterval(poll), 120000);
  };

  const handleDeploy = async () => {
    setDeploying(true);
    try {
      const res = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productId: product.id,
          repoName,
          template: null,
          provider: deployProvider,
          envVars,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setDeployResult({ error: data.error });
      } else {
        setDeployResult(data);
        setCurrentStep(7);
      }
    } catch (err) {
      setDeployResult({ error: err instanceof Error ? err.message : 'Deployment failed' });
    } finally {
      setDeploying(false);
    }
  };

  const steps: Step[] = [
    { id: 1, title: 'Sign In', description: 'Create or sign in to your Komputeks account', completed: isSignedIn, active: currentStep === 1 },
    { id: 2, title: 'Connect GitHub', description: 'Link your GitHub account to create repos', completed: githubConnected, active: currentStep === 2 },
    { id: 3, title: 'Choose Platform', description: 'Select your deployment target', completed: currentStep > 3, active: currentStep === 3 },
    { id: 4, title: 'Configure', description: 'Set repo name and environment variables', completed: currentStep > 4, active: currentStep === 4 },
    { id: 5, title: 'Deploy', description: 'Create repo and trigger deployment', completed: currentStep > 5, active: currentStep === 5 },
    { id: 6, title: 'Live!', description: 'Your project is deployed and accessible', completed: currentStep === 7, active: currentStep === 6 },
  ];

  const canProceed = () => {
    if (currentStep === 1) return isSignedIn;
    if (currentStep === 2) return githubConnected;
    if (currentStep === 3) return deployProvider;
    if (currentStep === 4) return repoName;
    return true;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-brand-500/10 to-cyan-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Rocket className="w-6 h-6 text-brand-400" />
              <h2 className="text-xl font-bold font-display">Deploy in Minutes</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
              <ExternalLink className="w-4 h-4 text-white/50" />
            </button>
          </div>
          <p className="mt-2 text-sm text-white/60">Deploy <span className="text-brand-400 font-medium">{product.name}</span> to your own infrastructure</p>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-3 flex items-center gap-2">
          {steps.map((step) => (
            <div key={step.id} className={cn('flex items-center gap-1', step.active ? 'text-brand-400' : step.completed ? 'text-green-400' : 'text-white/30')}>
              {step.completed ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-current" />}
              <span className="text-xs font-medium">{step.title}</span>
              {step.id < steps.length && <ChevronRight className="w-3 h-3 text-white/20" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="p-6 min-h-[200px]">
          {currentStep === 1 && (
            <div>
              {isSignedIn ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="font-medium font-display">You&apos;re signed in!</p>
                  <p className="text-sm text-white/40 mt-1">Ready to proceed.</p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <AlertCircle className="w-12 h-12 text-brand-400 mx-auto mb-3" />
                  <p className="font-medium font-display">Sign in required</p>
                  <p className="text-sm text-white/40 mt-1 mb-4">You need a Komputeks account to deploy.</p>
                  <a href="/login" className="inline-flex items-center gap-2 bg-brand-500 px-5 py-2.5 rounded-xl text-white font-medium hover:bg-brand-600 transition-all">
                    Sign In <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              {githubConnected ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="font-medium font-display">GitHub connected!</p>
                  <p className="text-sm text-white/40 mt-1">Username: <span className="text-brand-400">{githubUsername}</span></p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Github className="w-12 h-12 text-white/40 mx-auto mb-3" />
                  <p className="font-medium font-display">Connect your GitHub account</p>
                  <p className="text-sm text-white/40 mt-1 mb-4">We&apos;ll create a repo in your GitHub account.</p>
                  <Button onClick={connectGithub}>
                    <Github className="w-4 h-4 mr-2" /> Connect GitHub
                  </Button>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-3">
              <p className="text-sm text-white/60 mb-4">Choose where to deploy:</p>
              {['vercel', 'netlify', 'cloudflare'].map(p => (
                <button
                  key={p}
                  onClick={() => setDeployProvider(p)}
                  className={cn('w-full p-4 rounded-xl border text-left transition-all',
                    deployProvider === p ? 'border-brand-500 bg-brand-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
                  )}
                >
                  <p className="font-medium font-display capitalize">{p}</p>
                  <p className="text-xs text-white/40">{p === 'vercel' ? 'Free tier, auto-deploy from GitHub' : p === 'netlify' ? 'Free tier, great for static sites' : 'Edge network, global performance'}</p>
                </button>
              ))}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <Input label="Repository Name" value={repoName} onChange={(e) => setRepoName(e.target.value)} placeholder="my-project" />
              <div>
                <label className="text-sm font-medium text-white/80 mb-2 block">Environment Variables</label>
                <p className="text-xs text-white/40 mb-3">Add any env vars your deployment needs. Supabase keys will be auto-configured.</p>
                {Object.entries(envVars).map(([key, value]) => (
                  <div key={key} className="flex gap-2 mb-2">
                    <input value={key} readOnly className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60" />
                    <input value={value} onChange={(e) => setEnvVars(prev => ({ ...prev, [key]: e.target.value }))} placeholder="value" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white" />
                    <button onClick={() => setEnvVars(prev => { const next = { ...prev }; delete next[key]; return next; })} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">✕</button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input id="new-env-key" placeholder="KEY" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white" />
                  <input id="new-env-value" placeholder="value" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white" />
                  <button
                    onClick={() => {
                      const k = document.getElementById('new-env-key') as HTMLInputElement;
                      const v = document.getElementById('new-env-value') as HTMLInputElement;
                      if (k?.value) { setEnvVars(prev => ({ ...prev, [k.value]: v?.value || '' })); k.value = ''; if (v) v.value = ''; }
                    }}
                    className="p-2 text-brand-400 hover:bg-brand-500/10 rounded-lg text-sm font-medium"
                  >+ Add</button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center py-6">
              {deploying ? (
                <div>
                  <Loader2 className="w-12 h-12 text-brand-400 mx-auto mb-3 animate-spin" />
                  <p className="font-medium font-display">Deploying...</p>
                  <p className="text-sm text-white/40 mt-1">Creating repo and triggering deployment</p>
                </div>
              ) : deployResult?.error ? (
                <div>
                  <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                  <p className="font-medium font-display text-red-400">Deployment Error</p>
                  <p className="text-sm text-white/40 mt-1">{deployResult.error}</p>
                </div>
              ) : (
                <div>
                  <Rocket className="w-12 h-12 text-brand-400 mx-auto mb-3" />
                  <p className="font-medium font-display">Ready to deploy!</p>
                  <p className="text-sm text-white/40 mt-1 mb-4">We&apos;ll create <span className="text-brand-400">{repoName}</span> on {deployProvider}</p>
                  <Button onClick={handleDeploy} size="lg">
                    <Rocket className="w-4 h-4 mr-2" /> Deploy Now
                  </Button>
                </div>
              )}
            </div>
          )}

          {currentStep === 7 && deployResult && (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-lg font-bold font-display">Deployed Successfully!</p>
              {deployResult.repoUrl && (
                <a href={deployResult.repoUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300">
                  <Github className="w-4 h-4" /> View Repo
                </a>
              )}
              {deployResult.deploymentUrl && (
                <a href={deployResult.deploymentUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 block">
                  <ExternalLink className="w-4 h-4" /> Visit Live Site
                </a>
              )}
              {deployResult.logs && (
                <div className="mt-4 p-3 bg-white/5 rounded-lg text-xs text-white/40 max-h-[100px] overflow-y-auto">
                  {deployResult.logs.map((log, i) => <p key={i}>{log}</p>)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <div className="flex gap-2">
            {currentStep > 1 && currentStep < 7 && (
              <Button variant="ghost" onClick={() => setCurrentStep(s => s - 1)}>Back</Button>
            )}
            {currentStep < 5 && canProceed() && (
              <Button onClick={() => setCurrentStep(s => s + 1)}>Next <ArrowRight className="w-4 h-4 ml-1" /></Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
