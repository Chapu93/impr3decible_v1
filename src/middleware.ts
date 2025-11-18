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

  console.log('🔍 Middleware:', { 
    hostname, 
    hostnameWithoutPort,
    subdomain, 
    parts,
    pathname: url.pathname 
  })

  // Admin panel - admin.localhost
  if (subdomain === 'admin' && parts.length > 1) {
    console.log('🏢 Redirigiendo a admin')
    url.pathname = `/admin${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Client panel - panel.localhost
  if (subdomain === 'panel' && parts.length > 1) {
    console.log('👤 Redirigiendo a client')
    url.pathname = `/client${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Demo site - demo.localhost
  if (subdomain === 'demo' && parts.length > 1) {
    console.log('🌐 Redirigiendo a demo')
    url.pathname = `/demo${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Otros subdominios (cliente1, cliente2, etc.)
  if (subdomain !== 'localhost' && parts.length > 1 && subdomain !== 'admin' && subdomain !== 'panel' && subdomain !== 'demo') {
    console.log('🌍 Redirigiendo a subdominio dinámico:', subdomain)
    url.pathname = `/${subdomain}${url.pathname}`
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
     * - any files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
}
