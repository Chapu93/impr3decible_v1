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
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <span className="text-2xl">🏢</span>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SaaS Builder
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
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 dark:border-gray-700">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <span>🚪</span>
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
