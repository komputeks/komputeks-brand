import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      return NextResponse.redirect(new URL('/dashboard?error=no_code', request.url));
    }

    // Exchange code for token using GitHub App credentials
    const clientId = process.env.KOMPUTEKS_GITHUB_APP_CLIENT_ID || 'Iv23li5fIiDYD0frXvzB';
    const clientSecret = process.env.KOMPUTEKS_GITHUB_APP_CLIENT_SECRET || '650f7a987516f6316b9299020c415c5dd19cd583';

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.redirect(new URL('/dashboard?error=token_failed', request.url));
    }

    // Get user info from GitHub
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const githubUser = await userRes.json();

    // Store connected account
    const supabase = createAdminClient();
    // Find the user by their GitHub login or create mapping
    // For now, store in a general way
    await supabase.from('komputeks_connected_accounts').upsert({
      user_id: '00000000-0000-0000-0000-000000000000', // Will be updated with actual user ID
      provider: 'github',
      access_token: accessToken,
      provider_account_id: String(githubUser.id),
      connected: true,
    }, { onConflict: 'provider,provider_account_id' });

    // Redirect back to dashboard with success
    return NextResponse.redirect(new URL('/dashboard?github=connected', request.url));
  } catch (err) {
    console.error('GitHub callback error:', err);
    return NextResponse.redirect(new URL('/dashboard?error=callback_failed', request.url));
  }
}