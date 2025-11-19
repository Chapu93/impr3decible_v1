'use client'

import { useState, useEffect } from 'react'
import { Search, Bell } from 'lucide-react'

interface User {
  name: string
  email: string
  role: string
  companyName?: string
}

export function Header() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user as User)
        }
      })
      .catch(err => console.error('Error loading user:', err))
  }, [])

  return (
    <header className="bg-gray-900/30 backdrop-blur-xl border-b border-gray-800/50 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" strokeWidth={2} />
            <input
              type="search"
              placeholder="Buscar clientes, sitios, plantillas..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-white placeholder-gray-500 transition-all"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4 ml-8">
          {/* Notifications */}
          <button className="relative p-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all group">
            <Bell className="w-6 h-6" strokeWidth={2} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full group-hover:scale-150 transition-transform"></span>
          </button>

          {/* User Avatar & Info */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-800/50">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-white">
                {user?.name || 'Cargando...'}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                {user?.companyName || user?.role || 'Admin'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
