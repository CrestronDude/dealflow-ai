import { NextRequest, NextResponse } from 'next/server'

const PROTECTED = ['/dashboard', '/analyze']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProtected = PROTECTED.some(p => pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  // Check for session cookie (Supabase sets sb-{ref}-auth-token)
  const hasSession = req.cookies.getAll().some(c => c.name.includes('auth-token') || c.name.includes('sb-'))
  if (!hasSession) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*', '/analyze/:path*'] }
