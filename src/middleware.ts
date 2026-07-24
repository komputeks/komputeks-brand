import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname
    if (pathname.startsWith('/admin')) {
      if (token?.role !== 'admin') return NextResponse.redirect(new URL('/login?error=Unauthorized', req.url))
    }
    return NextResponse.next()
  },
  { callbacks: { authorized({ req, token }) {
    if (req.nextUrl.pathname.startsWith('/admin')) return token?.role === 'admin'
    if (req.nextUrl.pathname.startsWith('/dashboard')) return token !== null
    return true
  } } }
)

export const config = { matcher: ['/admin/:path*', '/dashboard/:path*'] }