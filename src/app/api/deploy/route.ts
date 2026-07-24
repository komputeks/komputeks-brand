import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, productId, repoName, targetProvider, accessToken } = body;

    if (!userId || !productId || !repoName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Get product details
    const { data: product, error: productError } = await supabase
      .from('komputeks_products')
      .select('*')
      .eq('id', productId)
      .single();
    if (productError || !product) throw new Error('Product not found');

    // Create deployment record
    const { data: deployment, error: deployError } = await supabase
      .from('komputeks_deployments')
      .insert({
        user_id: userId,
        product_id: productId,
        status: 'provisioning',
        target_provider: targetProvider || 'github',
        repo_name: repoName,
      })
      .select()
      .single();
    if (deployError) throw deployError;

    // If GitHub access token provided, create repo via Octokit
    if (accessToken) {
      try {
        const octokit = new Octokit({ auth: accessToken });
        const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
          name: repoName,
          private: false,
          description: product.tagline,
          auto_init: true,
        });

        await supabase.from('komputeks_deployments').update({
          status: 'repo_created',
          repo_url: repo.html_url,
          logs: `Repository created: ${repo.html_url}`,
        }).eq('id', deployment.id);

        return NextResponse.json({
          deploymentId: deployment.id,
          repoUrl: repo.html_url,
          status: 'repo_created',
          message: 'Repository created successfully! Next step: push template code.',
        });
      } catch (octokitError: unknown) {
        const errMsg = octokitError instanceof Error ? octokitError.message : 'GitHub API error';
        await supabase.from('komputeks_deployments').update({
          status: 'failed',
          logs: `GitHub repo creation failed: ${errMsg}`,
        }).eq('id', deployment.id);
        return NextResponse.json({ error: errMsg }, { status: 500 });
      }
    }

    return NextResponse.json({
      deploymentId: deployment.id,
      status: 'provisioning',
      message: 'Deployment initiated. Connect your GitHub account to proceed.',
    });
  } catch (err) {
    console.error('POST /api/deploy error:', err);
    return NextResponse.json({ error: 'Deployment failed' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const supabase = createAdminClient();

    let query = supabase.from('komputeks_deployments').select('*, komputeks_products(name, slug, tagline)').order('created_at', { ascending: false });
    if (userId) query = query.eq('user_id', userId);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error('GET /api/deploy error:', err);
    return NextResponse.json({ error: 'Failed to fetch deployments' }, { status: 500 });
  }
}