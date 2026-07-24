import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Bot blocking — allow SERP bots, block AI scrapers
const ALLOWED_BOTS = ['googlebot', 'bingbot', 'duckduckbot', 'slurp', 'yandexbot', 'baiduspider', 'applebot', 'facebot', 'twitterbot', 'linkedinbot', 'pinterestbot', 'discordbot', 'slackbot', 'telegrambot'];
const BLOCKED_BOTS = ['gptbot', 'chatgpt-user', 'ccbot', 'anthropic-ai', 'google-extended', 'bytespider', 'ai2bot', 'perplexity-bot', 'omgili', 'omgilibot', 'mj12bot', 'semrushbot', 'ahrefsbot', 'dotbot', 'seznambot', 'seoauditbot', 'crawler'];

function isBlockedBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  if (!ua || ua.length < 5) return true;
  for (const bot of BLOCKED_BOTS) { if (ua.includes(bot)) return true; }
  for (const bot of ALLOWED_BOTS) { if (ua.includes(bot)) return false; }
  return false;
}

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  // Block AI scrapers (but allow API routes for functionality)
  if (isBlockedBot(userAgent) && !request.nextUrl.pathname.startsWith('/api/')) {
    const response = new NextResponse('Blocked', { status: 403 });
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noai, noimageai');
    return response;
  }

  let supabaseResponse = NextResponse.next({ request });

  // Add X-Robots-Tag header for AI-specific blocking on all responses
  supabaseResponse.headers.set('X-Robots-Tag', 'googlebot: all, noai: noindex, noimageai: noindex');

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet: { name: string; value: string; options: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if ((isAdminRoute || isDashboardRoute) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminRoute && user) {
    const { data: profile } = await supabase
      .from('komputeks_users')
      .select('role')
      .eq('id', user.id)
      .single();
    if (!profile || profile.role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
