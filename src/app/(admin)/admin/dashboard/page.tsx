'use client'

import { useState, useEffect } from 'react'
import { Users, Globe, Palette, Package, CheckCircle2, Clock, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface DashboardMetrics {
  metrics: {
    clients: {
      total: number
      thisMonth: number
      growth: number
    }
    sites: {
      total: number
      published: number
      draft: number
      maintenance: number
    }
    templates: {
      total: number
      usage: Array<{
        name: string
        type: string
        _count: {
          sites: number
        }
      }>
    }
  }
  recent: {
    clients: Array<{
      id: string
      name: string
      email: string
      createdAt: string
      _count: {
        sites: number
      }
    }>
    sites: Array<{
      id: string
      subdomain: string
      status: string
      createdAt: string
      client: {
        name: string
      }
      template: {
        name: string
      }
    }>
  }
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard')
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
          <div className="text-gray-400 text-lg">Cargando métricas...</div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-400 mb-2">Error al cargar datos</h3>
          <p className="text-gray-400">Por favor, recarga la página</p>
        </div>
      </div>
    )
  }

  const { metrics, recent } = data

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-3 h-3" />
    if (growth < 0) return <TrendingDown className="w-3 h-3" />
    return <Minus className="w-3 h-3" />
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-400 bg-green-500/20'
    if (growth < 0) return 'text-red-400 bg-red-500/20'
    return 'text-gray-400 bg-gray-500/20'
  }

  const totalSitesInUse = metrics.templates.usage.reduce((sum, t) => sum + t._count.sites, 0)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header con gradiente */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent mb-3">
          Dashboard
        </h1>
        <p className="text-gray-400 text-lg">
          Bienvenido de nuevo, Admin
        </p>
      </div>

      {/* Stats Cards - Diseño moderno con glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Users className="w-7 h-7 text-purple-400" strokeWidth={2} />
            </div>
            <div className={`px-3 py-1 rounded-full ${getGrowthColor(metrics.clients.growth)}`}>
              <span className="text-xs font-semibold flex items-center gap-1">
                {getGrowthIcon(metrics.clients.growth)} {metrics.clients.growth > 0 ? '+' : ''}{metrics.clients.growth}%
              </span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Total Clientes</h3>
          <p className="text-4xl font-bold text-white mb-2">{metrics.clients.total}</p>
          <p className="text-sm text-purple-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> {metrics.clients.thisMonth} este mes
          </p>
        </div>

        <div className="group relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Globe className="w-7 h-7 text-blue-400" strokeWidth={2} />
            </div>
            <div className="px-3 py-1 bg-green-500/20 rounded-full">
              <span className="text-xs font-semibold text-green-400">{metrics.sites.published} Online</span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Sitios Web</h3>
          <p className="text-4xl font-bold text-white mb-2">{metrics.sites.total}</p>
          <p className="text-sm text-blue-400 flex items-center gap-1">
            <Clock className="w-4 h-4" /> {metrics.sites.draft} borradores
          </p>
        </div>

        <div className="group relative bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Palette className="w-7 h-7 text-orange-400" strokeWidth={2} />
            </div>
            <div className="px-3 py-1 bg-orange-500/20 rounded-full">
              <span className="text-xs font-semibold text-orange-400">
                {totalSitesInUse} en uso
              </span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Plantillas</h3>
          <p className="text-4xl font-bold text-white mb-2">{metrics.templates.total}</p>
          <p className="text-sm text-orange-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> {metrics.templates.usage.length} tipos
          </p>
        </div>

        <div className="group relative bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-xl border border-pink-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-500/20 rounded-xl">
              <Package className="w-7 h-7 text-pink-400" strokeWidth={2} />
            </div>
            <div className="px-3 py-1 bg-pink-500/20 rounded-full">
              <span className="text-xs font-semibold text-pink-400">Estado</span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Mantenimiento</h3>
          <p className="text-4xl font-bold text-white mb-2">{metrics.sites.maintenance}</p>
          <p className="text-sm text-pink-400 flex items-center gap-1">
            <Clock className="w-4 h-4" /> Sitios pausados
          </p>
        </div>
      </div>

      {/* Success Message - Moderno */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="relative flex items-start gap-4">
          <div className="p-4 bg-green-500/20 rounded-2xl">
            <CheckCircle2 className="w-12 h-12 text-green-400" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">
              ¡Sistema Operativo!
            </h3>
            <p className="text-gray-300 mb-4 text-lg">
              Panel admin completamente funcional con métricas en tiempo real.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Setup Completo</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Auth Funcionando</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Métricas Reales</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Diseño de cards moderno */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/clientes" className="group relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-purple-700/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:w-64 group-hover:h-64 transition-all duration-500"></div>
            <div className="relative">
              <div className="p-4 bg-purple-500/20 rounded-2xl w-fit mb-4">
                <Users className="w-10 h-10 text-purple-400" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Gestionar Clientes
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Ver, crear y editar clientes de tu plataforma
              </p>
              <span className="text-purple-400 text-sm font-semibold flex items-center gap-2">
                Ir a clientes <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </div>
          </Link>

          <Link href="/admin/sitios" className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-700/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:w-64 group-hover:h-64 transition-all duration-500"></div>
            <div className="relative">
              <div className="p-4 bg-blue-500/20 rounded-2xl w-fit mb-4">
                <Globe className="w-10 h-10 text-blue-400" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Gestionar Sitios
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Crear y configurar sitios web personalizables
              </p>
              <span className="text-blue-400 text-sm font-semibold flex items-center gap-2">
                Ir a sitios <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </div>
          </Link>

          <Link href="/admin/plantillas" className="group relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-700/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl group-hover:w-64 group-hover:h-64 transition-all duration-500"></div>
            <div className="relative">
              <div className="p-4 bg-orange-500/20 rounded-2xl w-fit mb-4">
                <Palette className="w-10 h-10 text-orange-400" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Ver Plantillas
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Administrar plantillas disponibles del sistema
              </p>
              <span className="text-orange-400 text-sm font-semibold flex items-center gap-2">
                Ir a plantillas <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
