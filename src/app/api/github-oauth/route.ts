import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

const GITHUB_CLIENT_ID = process.env.KOMPUTEKS_GITHUB_APP_CLIENT_ID || 'komputeks';
const GITHUB_CLIENT_SECRET = process.env.KOMPUTEKS_GITHUB_APP_CLIENT_SECRET || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) return NextResponse.redirect(new URL('/dashboard?github=error', request.url));
  if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

  try {
    // Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET, code }),
    });
    const tokenData = await tokenRes.json();
    if (tokenData.error) throw new Error(tokenData.error_description || tokenData.error);

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token || null;
    const scope = tokenData.scope || '';
    const expiresInSeconds: number | undefined = tokenData.expires_in;
    const expiresAt: string | null = expiresInSeconds ? new Date(Date.now() + expiresInSeconds * 1000).toISOString() : null;

    // Get GitHub user profile
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/vnd.github.v3+json' },
    });
    const githubUser = await userRes.json();
    const githubUsername = githubUser.login;

    // Store in Supabase — state contains user_id
    let userId = state;
    if (!userId) {
      // No state — redirect to login
      return NextResponse.redirect(new URL('/login?message=github-no-session', request.url));
    }

    const supabase = createAdminClient();
    const { error: dbError } = await supabase
      .from('komputeks_platform_tokens')
      .upsert({
        user_id: userId,
        provider: 'github',
        access_token: accessToken,
        refresh_token: refreshToken,
        scope,
        expires_at: expiresAt,
        github_username: githubUsername,
      }, { onConflict: 'user_id,provider' });
    if (dbError) throw dbError;

    return NextResponse.redirect(new URL('/dashboard?github=connected', request.url));
  } catch (err) {
    console.error('GitHub OAuth error:', err);
    return NextResponse.redirect(new URL('/dashboard?github=error', request.url));
  }
}
