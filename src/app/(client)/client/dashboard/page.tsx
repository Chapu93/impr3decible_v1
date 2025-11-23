'use client'

import { useState, useEffect } from 'react'
import { Globe, Package, FileText, Eye, TrendingUp, Clock, CheckCircle2, ExternalLink, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Site {
  id: string
  subdomain: string
  customDomain: string | null
  status: 'DRAFT' | 'PUBLISHED' | 'MAINTENANCE'
  createdAt: string
  template: {
    name: string
    type: string
  }
}

interface DashboardData {
  sites: Site[]
  stats: {
    totalProducts: number
    totalPages: number
    publishedSites: number
  }
}

export default function ClientDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/client/dashboard')
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400 text-lg">Cargando...</div>
        </div>
      </div>
    )
  }

  const primarySite = data?.sites?.[0]
  const stats = data?.stats || { totalProducts: 0, totalPages: 0, publishedSites: 0 }

  const statusConfig = {
    PUBLISHED: { label: 'Publicado', color: 'text-green-400', bg: 'bg-green-500/20', icon: CheckCircle2 },
    DRAFT: { label: 'Borrador', color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: Clock },
    MAINTENANCE: { label: 'Mantenimiento', color: 'text-orange-400', bg: 'bg-orange-500/20', icon: AlertCircle }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent mb-3">
          Dashboard
        </h1>
        <p className="text-gray-400 text-lg">
          ¡Bienvenido! Aquí puedes gestionar tu sitio web
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="group relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Globe className="w-7 h-7 text-blue-400" strokeWidth={2} />
            </div>
            <div className={`px-3 py-1 rounded-full ${primarySite ? statusConfig[primarySite.status].bg : 'bg-gray-500/20'}`}>
              <span className={`text-xs font-semibold ${primarySite ? statusConfig[primarySite.status].color : 'text-gray-400'}`}>
                {primarySite ? statusConfig[primarySite.status].label : 'Sin sitio'}
              </span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Mi Sitio Web</h3>
          <p className="text-3xl font-bold text-white mb-2">
            {primarySite ? primarySite.subdomain : 'N/A'}
          </p>
          {primarySite && (
            <p className="text-sm text-blue-400">
              {primarySite.template.name}
            </p>
          )}
        </div>

        <div className="group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Package className="w-7 h-7 text-purple-400" strokeWidth={2} />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Productos</h3>
          <p className="text-3xl font-bold text-white mb-2">{stats.totalProducts}</p>
          <p className="text-sm text-purple-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> En catálogo
          </p>
        </div>

        <div className="group relative bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <FileText className="w-7 h-7 text-orange-400" strokeWidth={2} />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Páginas</h3>
          <p className="text-3xl font-bold text-white mb-2">{stats.totalPages}</p>
          <p className="text-sm text-orange-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Creadas
          </p>
        </div>
      </div>

      {/* Site Info Card */}
      {primarySite ? (
        <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {primarySite.subdomain}.localhost
              </h2>
              <p className="text-gray-400">
                Plantilla: {primarySite.template.name} ({primarySite.template.type})
              </p>
            </div>
            <a
              href={`http://${primarySite.subdomain}.localhost:3000`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all"
            >
              <Eye className="w-5 h-5" />
              Ver Sitio
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Información</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Estado:</span>
                  <span className={statusConfig[primarySite.status].color}>
                    {statusConfig[primarySite.status].label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Creado:</span>
                  <span className="text-white">
                    {new Date(primarySite.createdAt).toLocaleDateString('es-ES')}
                  </span>
                </div>
                {primarySite.customDomain && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dominio:</span>
                    <span className="text-white">{primarySite.customDomain}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Analytics (Próximamente)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Visitantes:</span>
                  <span className="text-white">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Páginas vistas:</span>
                  <span className="text-white">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tasa de rebote:</span>
                  <span className="text-white">-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                No tienes un sitio web aún
              </h3>
              <p className="text-gray-400">
                Contacta con tu administrador para que te asigne un sitio web.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/products" className="group relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-purple-700/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:w-64 group-hover:h-64 transition-all duration-500"></div>
            <div className="relative">
              <div className="p-4 bg-purple-500/20 rounded-2xl w-fit mb-4">
                <Package className="w-10 h-10 text-purple-400" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Gestionar Productos
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Añade, edita o elimina productos de tu catálogo
              </p>
              <span className="text-purple-400 text-sm font-semibold flex items-center gap-2">
                Ir a productos <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </div>
          </Link>

          <Link href="/pages" className="group relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-700/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl group-hover:w-64 group-hover:h-64 transition-all duration-500"></div>
            <div className="relative">
              <div className="p-4 bg-orange-500/20 rounded-2xl w-fit mb-4">
                <FileText className="w-10 h-10 text-orange-400" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Gestionar Páginas
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Crea y edita las páginas de tu sitio
              </p>
              <span className="text-orange-400 text-sm font-semibold flex items-center gap-2">
                Ir a páginas <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </div>
          </Link>

          <Link href="/customize" className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-700/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:w-64 group-hover:h-64 transition-all duration-500"></div>
            <div className="relative">
              <div className="p-4 bg-blue-500/20 rounded-2xl w-fit mb-4">
                <Globe className="w-10 h-10 text-blue-400" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Personalizar Sitio
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Cambia colores, fuentes y diseño de tu sitio
              </p>
              <span className="text-blue-400 text-sm font-semibold flex items-center gap-2">
                Personalizar <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
