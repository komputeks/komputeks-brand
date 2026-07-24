import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

const GITHUB_CLIENT_ID = process.env.KOMPUTEKS_GITHUB_APP_CLIENT_ID || 'komputeks';
const GITHUB_CLIENT_SECRET = process.env.KOMPUTEKS_GITHUB_APP_CLIENT_SECRET || ''; 
const VERCEL_PAT = process.env.VERCEL_PAT || '';

// Template repos for each product
const TEMPLATE_REPOS: Record<string, string> = {
  'madeal': 'komputeks/madeal',
  'telecloud': 'komputeks/telecloud-storage',
  'sheetsync': 'komputeks/sheetsync',
  'fortuneforge': 'komputeks/fortuneforge',
  'secretforge': 'komputeks/secretforge',
};

export async function POST(request: Request) {
  try {
    const { userId, productId, repoName, template, provider: deployProvider, envVars } = await request.json();
    if (!userId || !productId) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const supabase = createAdminClient();

    // Get user's GitHub token
    const { data: tokenData } = await supabase
      .from('komputeks_platform_tokens')
      .select('*')
      .eq('user_id', userId)
      .eq('provider', 'github')
      .single();
    if (!tokenData) return NextResponse.json({ error: 'GitHub account not connected. Connect it first in your dashboard.' }, { status: 400 });

    const octokit = new Octokit({ auth: tokenData.access_token });

    // Determine template repo
    const templateRepo = template || TEMPLATE_REPOS[productId] || 'komputeks/komputeks-template';
    const [templateOwner, templateRepoName] = templateRepo.split('/');

    // Step 1: Create repo from template
    const logs: string[] = [];
    logs.push(`Creating repository ${repoName} from template ${templateRepo}...`);

    try {
      const { data: newRepo } = await octokit.rest.repos.createUsingTemplate({
        template_owner: templateOwner,
        template_repo: templateRepoName,
        owner: tokenData.github_username,
        name: repoName,
        description: `Deployed from Komputeks`,
        private: false,
      });
      logs.push(`Repository created: ${newRepo.full_name}`);

      // Save deployment record
      const { data: deployment, error: depError } = await supabase
        .from('komputeks_deployments')
        .insert({
          user_id: userId,
          product_id: productId,
          template_repo: templateRepo,
          target_repo: newRepo.full_name,
          target_repo_url: newRepo.html_url,
          deployment_provider: deployProvider || 'vercel',
          status: 'repo-created',
          env_vars: envVars || {},
          logs: logs.join('\n'),
        })
        .select()
        .single();
      if (depError) throw depError;

      // Step 2: If Vercel, try to create project and deploy
      if (deployProvider === 'vercel' && VERCEL_PAT) {
        logs.push('Connecting to Vercel...');
        try {
          const vercelRes = await fetch('https://api.vercel.com/v9/projects', {
            method: 'POST',
            headers: { Authorization: `Bearer ${VERCEL_PAT}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: repoName,
              framework: 'nextjs',
              gitRepository: { type: 'github', repo: newRepo.full_name },
            }),
          });
          const vercelData = await vercelRes.json();
          if (vercelData.id) {
            logs.push(`Vercel project created: ${vercelData.name}`);

            // Set env vars on Vercel project
            if (envVars && Object.keys(envVars).length > 0) {
              for (const [key, value] of Object.entries(envVars)) {
                await fetch(`https://api.vercel.com/v9/projects/${vercelData.id}/env`, {
                  method: 'POST',
                  headers: { Authorization: `Bearer ${VERCEL_PAT}`, 'Content-Type': 'application/json' },
                  body: JSON.stringify({ key, value: String(value), type: 'encrypted', target: ['production', 'preview', 'development'] }),
                });
              }
              logs.push(`Environment variables configured (${Object.keys(envVars).length} vars)`);
            }

            // Update deployment status
            await supabase
              .from('komputeks_deployments')
              .update({
                status: 'deploying',
                deployment_url: `https://${vercelData.name}.vercel.app`,
                logs: logs.join('\n'),
              })
              .eq('id', deployment.id);

            return NextResponse.json({
              status: 'success',
              repoUrl: newRepo.html_url,
              deploymentUrl: `https://${vercelData.name}.vercel.app`,
              logs,
              deploymentId: deployment.id,
            });
          } else {
            logs.push(`Vercel project creation note: ${vercelData.message || 'Proceed manually'}`);
          }
        } catch (vercelErr) {
          logs.push(`Vercel setup note: ${vercelErr instanceof Error ? vercelErr.message : 'Proceed manually via Vercel dashboard'}`);
        }
      }

      // Update deployment status for manual deploy
      await supabase
        .from('komputeks_deployments')
        .update({ status: 'repo-created', logs: logs.join('\n') })
        .eq('id', deployment.id);

      return NextResponse.json({
        status: 'success',
        repoUrl: newRepo.html_url,
        logs,
        deploymentId: deployment.id,
        nextStep: deployProvider === 'vercel' ? 'Vercel will auto-deploy from your GitHub repo.' : 'Connect your deployment platform in the dashboard.',
      });
    } catch (repoErr) {
      const errorMsg = repoErr instanceof Error ? repoErr.message : 'Failed to create repo';
      logs.push(`Error: ${errorMsg}`);
      return NextResponse.json({ error: errorMsg, logs }, { status: 500 });
    }
  } catch (err) {
    console.error('Deploy error:', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Deployment failed' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    const supabase = createAdminClient();
    const { data: deployments } = await supabase
      .from('komputeks_deployments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return NextResponse.json(deployments || []);
  } catch (err) {
    console.error('Deploy list error:', err);
    return NextResponse.json({ error: 'Failed to fetch deployments' }, { status: 500 });
  }
}
