import { NextResponse } from 'next/server';

// GitHub OAuth callback stub — requires GitHub App Client ID/Secret configuration
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  // In production: exchange code for access token using GitHub App credentials
  return NextResponse.json({ message: 'GitHub OAuth callback received. Configure KOMPUTEKS_GITHUB_APP_CLIENT_ID and KOMPUTEKS_GITHUB_APP_CLIENT_SECRET env vars for full OAuth flow.' });
}