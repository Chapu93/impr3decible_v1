'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, FileText, Settings, LogOut, Palette, Globe } from 'lucide-react'

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Mi Sitio',
    href: '/site',
    icon: Globe,
  },
  {
    name: 'Productos',
    href: '/products',
    icon: Package,
  },
  {
    name: 'Páginas',
    href: '/pages',
    icon: FileText,
  },
  {
    name: 'Personalizar',
    href: '/customize',
    icon: Palette,
  },
  {
    name: 'Configuración',
    href: '/settings',
    icon: Settings,
  },
]

export function ClientSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800/50 min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800/50">
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl group-hover:scale-110 transition-transform">
            <Globe className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">
              Mi Panel
            </h1>
            <p className="text-xs text-gray-500">
              Website Builder
            </p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50 hover:scale-105'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800/50">
        <form action="/api/auth/client/logout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl hover:scale-105 transition-all duration-300 border border-red-500/20"
          >
            <LogOut className="w-5 h-5" strokeWidth={2} />
            <span className="font-semibold">Cerrar Sesión</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
