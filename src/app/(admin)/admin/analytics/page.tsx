'use client'

import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Users, Globe, Activity, Calendar, Eye, MousePointer } from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalPageviews: number
    uniqueVisitors: number
    avgSessionDuration: number
    bounceRate: number
  }
  topSites: Array<{
    subdomain: string
    pageviews: number
    visitors: number
    client: {
      name: string
    }
  }>
  recentActivity: Array<{
    timestamp: string
    event: string
    site: string
    user: string
  }>
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  // Datos de ejemplo (en producción, estos vendrían de la API)
  const data: AnalyticsData = {
    overview: {
      totalPageviews: 15234,
      uniqueVisitors: 3421,
      avgSessionDuration: 245, // segundos
      bounceRate: 42.5 // porcentaje
    },
    topSites: [
      {
        subdomain: 'demo',
        pageviews: 5432,
        visitors: 1234,
        client: { name: 'Cliente Demo' }
      },
      {
        subdomain: 'cliente1',
        pageviews: 3821,
        visitors: 982,
        client: { name: 'Cliente 1' }
      },
      {
        subdomain: 'cliente2',
        pageviews: 2145,
        visitors: 654,
        client: { name: 'Cliente 2' }
      }
    ],
    recentActivity: [
      {
        timestamp: new Date().toISOString(),
        event: 'Nuevo sitio creado',
        site: 'cliente3',
        user: 'Admin'
      },
      {
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        event: 'Sitio publicado',
        site: 'demo',
        user: 'Cliente Demo'
      }
    ]
  }

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => setLoading(false), 500)
  }, [period])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-600 bg-clip-text text-transparent mb-2">
            Analytics
          </h1>
          <p className="text-gray-400">
            Estadísticas y métricas de tus sitios web
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                period === p
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              {p === '7d' ? 'Últimos 7 días' : p === '30d' ? 'Últimos 30 días' : 'Últimos 90 días'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400">Cargando analytics...</div>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Eye className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Pageviews</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">
                {data.overview.totalPageviews.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 text-sm text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5% vs período anterior</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Visitantes Únicos</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">
                {data.overview.uniqueVisitors.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 text-sm text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span>+8.3% vs período anterior</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Duración Promedio</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">
                {formatDuration(data.overview.avgSessionDuration)}
              </p>
              <div className="flex items-center gap-1 text-sm text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span>+15.2% vs período anterior</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <MousePointer className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Bounce Rate</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">
                {data.overview.bounceRate}%
              </p>
              <div className="flex items-center gap-1 text-sm text-red-400">
                <TrendingUp className="w-4 h-4 rotate-180" />
                <span>-3.1% vs período anterior</span>
              </div>
            </div>
          </div>

          {/* Top Sites */}
          <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Sitios con Más Tráfico</h2>
                <p className="text-sm text-gray-400">Top sitios por pageviews</p>
              </div>
            </div>

            <div className="space-y-4">
              {data.topSites.map((site, index) => (
                <div key={site.subdomain} className="bg-gray-900/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-lg">
                        <span className="text-blue-400 font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{site.subdomain}.localhost</h3>
                        <p className="text-xs text-gray-500">{site.client.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Pageviews</p>
                        <p className="text-lg font-bold text-white">{site.pageviews.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Visitantes</p>
                        <p className="text-lg font-bold text-white">{site.visitors.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                      style={{ width: `${(site.pageviews / data.topSites[0].pageviews) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Actividad Reciente</h2>
                <p className="text-sm text-gray-400">Últimas acciones en la plataforma</p>
              </div>
            </div>

            <div className="space-y-3">
              {data.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.event}</p>
                    <p className="text-sm text-gray-500">
                      {activity.site} • {activity.user} • {new Date(activity.timestamp).toLocaleString('es-ES')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Próximamente: Analytics Avanzadas
                </h3>
                <p className="text-gray-400 mb-4">
                  Estamos trabajando en integraciones con:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    Google Analytics para métricas detalladas
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    Tracking de eventos personalizado
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    Informes exportables en PDF
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    Dashboards personalizables
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
