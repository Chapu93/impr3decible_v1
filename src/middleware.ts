import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Detectar subdominio
  const subdomain = hostname.split('.')[0]

  // Admin panel
  if (subdomain === 'admin') {
    url.pathname = `/admin${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Client panel
  if (subdomain === 'panel') {
    url.pathname = `/client${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Demo site o cualquier otro subdominio que no sea localhost
  if (subdomain !== 'localhost' && !subdomain.includes('localhost')) {
    url.pathname = `/site/${subdomain}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
