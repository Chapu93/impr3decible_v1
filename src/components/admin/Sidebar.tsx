'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: '📊',
  },
  {
    name: 'Clientes',
    href: '/admin/clientes',
    icon: '👥',
  },
  {
    name: 'Sitios Web',
    href: '/admin/sitios',
    icon: '🌐',
  },
  {
    name: 'Plantillas',
    href: '/admin/plantillas',
    icon: '🎨',
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: '📈',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800/50 min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800/50">
        <Link href="/admin/dashboard" className="flex items-center space-x-3 group">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl group-hover:scale-110 transition-transform">
            <span className="text-2xl">🏢</span>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-xs text-gray-500">
              SaaS Builder v1.0
            </p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg shadow-orange-500/50 scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50 hover:scale-105'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800/50">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl hover:scale-105 transition-all duration-300 border border-red-500/20"
          >
            <span>🚪</span>
            <span className="font-semibold">Cerrar Sesión</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
