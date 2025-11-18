import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Obtener hostname (puede incluir puerto)
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Remover puerto si existe
  const hostnameWithoutPort = hostname.split(':')[0]
  
  // Detectar subdominio
  const parts = hostnameWithoutPort.split('.')
  const subdomain = parts[0]

  console.log('🔍 Middleware:', { hostname, subdomain, pathname: url.pathname })

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

  // Demo site y otros subdominios (excepto localhost solo)
  if (subdomain !== 'localhost' && parts.length > 1) {
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
