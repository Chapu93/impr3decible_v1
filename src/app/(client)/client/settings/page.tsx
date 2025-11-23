'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Building2, Phone, Save } from 'lucide-react'

interface ClientData {
  name: string
  email: string
  companyName?: string
  phone?: string
}

export default function SettingsPage() {
  const [data, setData] = useState<ClientData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClientData()
  }, [])

  const fetchClientData = async () => {
    try {
      const response = await fetch('/api/auth/client/me')
      if (response.ok) {
        const result = await response.json()
        if (result.user) {
          setData({
            name: result.user.name,
            email: result.user.email,
            companyName: result.user.companyName,
            phone: ''
          })
        }
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    alert('Próximamente: Guardar configuración')
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400">Cargando...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-8">
        Configuración
      </h1>

      <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Información Personal
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nombre Completo
              </div>
            </label>
            <input
              type="text"
              value={data?.name || ''}
              onChange={(e) => setData({ ...data!, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </div>
            </label>
            <input
              type="email"
              value={data?.email || ''}
              disabled
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              El email no se puede cambiar
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Empresa
              </div>
            </label>
            <input
              type="text"
              value={data?.companyName || ''}
              onChange={(e) => setData({ ...data!, companyName: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Teléfono
              </div>
            </label>
            <input
              type="tel"
              value={data?.phone || ''}
              onChange={(e) => setData({ ...data!, phone: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="+54 11 1234-5678"
            />
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all font-semibold"
          >
            <Save className="w-5 h-5" />
            Guardar Cambios (Próximamente)
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Seguridad
        </h2>

        <div className="space-y-4">
          <button className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all text-left">
            Cambiar Contraseña (Próximamente)
          </button>
        </div>
      </div>
    </div>
  )
}
