'use client'

import { useState, useEffect } from 'react'
import { Globe, ExternalLink, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

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

export default function SitePage() {
  const [site, setSite] = useState<Site | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSite()
  }, [])

  const fetchSite = async () => {
    try {
      const response = await fetch('/api/client/dashboard')
      if (response.ok) {
        const data = await response.json()
        if (data.sites && data.sites.length > 0) {
          setSite(data.sites[0])
        }
      }
    } catch (error) {
      console.error('Error loading site:', error)
    } finally {
      setLoading(false)
    }
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

  if (!site) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-12 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">
            No tienes un sitio web
          </h2>
          <p className="text-gray-400">
            Contacta con tu administrador para que te asigne un sitio.
          </p>
        </div>
      </div>
    )
  }

  const statusConfig = {
    PUBLISHED: { label: 'Publicado', color: 'text-green-400', bg: 'bg-green-500/20', icon: CheckCircle2 },
    DRAFT: { label: 'Borrador', color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: Clock },
    MAINTENANCE: { label: 'Mantenimiento', color: 'text-orange-400', bg: 'bg-orange-500/20', icon: AlertCircle }
  }

  const StatusIcon = statusConfig[site.status].icon

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent mb-8">
        Mi Sitio Web
      </h1>

      {/* Site Info Card */}
      <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-500/20 rounded-2xl">
              <Globe className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {site.subdomain}.localhost
              </h2>
              <p className="text-gray-400">
                Plantilla: {site.template.name}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${statusConfig[site.status].bg}`}>
            <StatusIcon className={`w-5 h-5 ${statusConfig[site.status].color}`} />
            <span className={`font-semibold ${statusConfig[site.status].color}`}>
              {statusConfig[site.status].label}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">URL del sitio</p>
              <p className="text-white font-mono">
                http://{site.subdomain}.localhost:3000
              </p>
            </div>

            {site.customDomain && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Dominio personalizado</p>
                <p className="text-white">{site.customDomain}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500 mb-1">Tipo de plantilla</p>
              <p className="text-white">{site.template.type}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Fecha de creación</p>
              <p className="text-white">
                {new Date(site.createdAt).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <a
            href={`http://${site.subdomain}.localhost:3000`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all font-semibold"
          >
            <ExternalLink className="w-5 h-5" />
            Ver Sitio en Vivo
          </a>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-3">
          Información del Sitio
        </h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>• Tu sitio está alojado en nuestros servidores seguros</p>
          <p>• Puedes personalizar el diseño desde la sección "Personalizar"</p>
          <p>• Gestiona tus productos y páginas desde las secciones correspondientes</p>
          <p>• Los cambios se reflejan automáticamente en tu sitio</p>
        </div>
      </div>
    </div>
  )
}
