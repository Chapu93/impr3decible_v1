'use client'

import { useState, useEffect } from 'react'
import { Globe, Plus, Search, User, Palette, Eye, Edit2, Trash2, ExternalLink, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react'

interface Site {
  id: string
  subdomain: string
  customDomain: string | null
  status: 'DRAFT' | 'PUBLISHED' | 'MAINTENANCE'
  templateId: string
  clientId: string
  createdAt: string
  updatedAt: string
  client: {
    name: string
    email: string
  }
  template: {
    name: string
    type: string
  }
}

interface Client {
  id: string
  name: string
  email: string
}

interface Template {
  id: string
  name: string
  type: string
}

const statusConfig = {
  PUBLISHED: {
    label: 'Publicado',
    icon: CheckCircle2,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/20'
  },
  DRAFT: {
    label: 'Borrador',
    icon: Clock,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/20'
  },
  MAINTENANCE: {
    label: 'Mantenimiento',
    icon: XCircle,
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/20'
  }
}

export default function SitiosPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [showModal, setShowModal] = useState(false)
  const [editingSite, setEditingSite] = useState<Site | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [sitesRes, clientsRes, templatesRes] = await Promise.all([
        fetch('/api/admin/sites'),
        fetch('/api/admin/clients'),
        fetch('/api/admin/templates')
      ])

      if (sitesRes.ok) {
        const data = await sitesRes.json()
        setSites(data.sites || [])
      }
      if (clientsRes.ok) {
        const data = await clientsRes.json()
        setClients(data.clients || [])
      }
      if (templatesRes.ok) {
        const data = await templatesRes.json()
        setTemplates(data.templates || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSites = sites.filter(site => {
    const matchesSearch = 
      site.subdomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.customDomain?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'ALL' || site.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este sitio?')) return

    try {
      const response = await fetch(`/api/admin/sites/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSites(sites.filter(s => s.id !== id))
      }
    } catch (error) {
      console.error('Error deleting site:', error)
    }
  }

  const getStatusCounts = () => {
    return {
      total: sites.length,
      published: sites.filter(s => s.status === 'PUBLISHED').length,
      draft: sites.filter(s => s.status === 'DRAFT').length,
      maintenance: sites.filter(s => s.status === 'MAINTENANCE').length
    }
  }

  const counts = getStatusCounts()

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent mb-2">
            Sitios Web
          </h1>
          <p className="text-gray-400">
            Gestiona los sitios web de tus clientes
          </p>
        </div>
        <button
          onClick={() => {
            setEditingSite(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/50"
        >
          <Plus className="w-5 h-5" />
          Nuevo Sitio
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-6 h-6 text-blue-400" />
            <h3 className="text-gray-400 text-sm font-medium">Total Sitios</h3>
          </div>
          <p className="text-3xl font-bold text-white">{counts.total}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            <h3 className="text-gray-400 text-sm font-medium">Publicados</h3>
          </div>
          <p className="text-3xl font-bold text-white">{counts.published}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-yellow-400" />
            <h3 className="text-gray-400 text-sm font-medium">Borradores</h3>
          </div>
          <p className="text-3xl font-bold text-white">{counts.draft}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-6 h-6 text-orange-400" />
            <h3 className="text-gray-400 text-sm font-medium">Mantenimiento</h3>
          </div>
          <p className="text-3xl font-bold text-white">{counts.maintenance}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="search"
              placeholder="Buscar por subdominio, cliente o dominio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {['ALL', 'PUBLISHED', 'DRAFT', 'MAINTENANCE'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              {status === 'ALL' ? 'Todos' : statusConfig[status as keyof typeof statusConfig].label}
            </button>
          ))}
        </div>
      </div>

      {/* Sites Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400">Cargando sitios...</div>
        </div>
      ) : filteredSites.length === 0 ? (
        <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            {searchTerm || statusFilter !== 'ALL' ? 'No se encontraron sitios' : 'No hay sitios'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'ALL' ? 'Intenta con otros filtros' : 'Comienza creando tu primer sitio web'}
          </p>
          {!searchTerm && statusFilter === 'ALL' && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              Crear Primer Sitio
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => {
            const StatusIcon = statusConfig[site.status].icon
            return (
              <div
                key={site.id}
                className="group bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <Globe className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {site.subdomain}
                      </h3>
                      <p className="text-sm text-gray-500">.localhost</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${statusConfig[site.status].bg} ${statusConfig[site.status].border} border`}>
                    <span className={`text-xs font-semibold ${statusConfig[site.status].color} flex items-center gap-1`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig[site.status].label}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <User className="w-4 h-4" />
                    <span>{site.client.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Palette className="w-4 h-4" />
                    <span>{site.template.name}</span>
                  </div>
                  {site.customDomain && (
                    <div className="flex items-center gap-2 text-sm text-blue-400">
                      <ExternalLink className="w-4 h-4" />
                      <span>{site.customDomain}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-700/50">
                  <a
                    href={`http://${site.subdomain}.localhost:3000`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </a>
                  <button
                    onClick={() => {
                      setEditingSite(site)
                      setShowModal(true)
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(site.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <SiteModal
          site={editingSite}
          clients={clients}
          templates={templates}
          onClose={() => {
            setShowModal(false)
            setEditingSite(null)
          }}
          onSave={() => {
            fetchData()
            setShowModal(false)
            setEditingSite(null)
          }}
        />
      )}
    </div>
  )
}

// Modal Component
function SiteModal({
  site,
  clients,
  templates,
  onClose,
  onSave,
}: {
  site: Site | null
  clients: Client[]
  templates: Template[]
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    subdomain: site?.subdomain || '',
    customDomain: site?.customDomain || '',
    status: site?.status || 'DRAFT',
    clientId: site?.clientId || '',
    templateId: site?.templateId || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = site ? `/api/admin/sites/${site.id}` : '/api/admin/sites'
      const method = site ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        onSave()
      } else {
        setError(data.error || 'Error al guardar sitio')
      }
    } catch (err) {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">
          {site ? 'Editar Sitio' : 'Nuevo Sitio'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cliente *
            </label>
            <select
              required
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} ({client.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Plantilla *
            </label>
            <select
              required
              value={formData.templateId}
              onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar plantilla</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name} ({template.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subdominio *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                pattern="[a-z0-9-]+"
                value={formData.subdomain}
                onChange={(e) => setFormData({ ...formData, subdomain: e.target.value.toLowerCase() })}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="mi-sitio"
              />
              <span className="text-gray-500">.localhost</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Solo letras minúsculas, números y guiones</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Dominio Personalizado
            </label>
            <input
              type="text"
              value={formData.customDomain}
              onChange={(e) => setFormData({ ...formData, customDomain: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="www.ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Estado *
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="DRAFT">Borrador</option>
              <option value="PUBLISHED">Publicado</option>
              <option value="MAINTENANCE">Mantenimiento</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
