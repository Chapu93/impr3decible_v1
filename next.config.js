/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Habilitar standalone output para Docker
  output: 'standalone',
  
  // Configuración de imágenes
  images: {
    domains: [
      'localhost',
      'admin.localhost',
      'panel.localhost',
      // MinIO local
      '127.0.0.1',
      // Agregar dominios de producción aquí
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.localhost',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  
  // Variables de entorno públicas
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL,
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
  },
  
  // Experimental features
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost', '*.localhost'],
    },
  },
  
  // Rewrites para subdominios (desarrollo)
  async rewrites() {
    return [
      // Panel Admin
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'admin.localhost',
          },
        ],
        destination: '/admin/:path*',
      },
      // Panel Cliente
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'panel.localhost',
          },
        ],
        destination: '/client/:path*',
      },
      // Sitios públicos (subdominios)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)\\.localhost',
          },
        ],
        destination: '/site/:subdomain/:path*',
      },
    ]
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
