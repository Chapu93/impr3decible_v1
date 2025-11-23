'use client'

import { useState, useEffect } from 'react'
import { Palette, Plus, Search, Edit2, Trash2, Eye, Layers, AlertCircle, CheckCircle2 } from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string | null
  type: string
  thumbnail: string | null
  createdAt: string
  _count?: {
    sites: number
  }
}

const templateTypes = [
  { value: 'ECOMMERCE', label: 'E-commerce', color: 'orange' },
  { value: 'LANDING', label: 'Landing Page', color: 'blue' },
  { value: 'BLOG', label: 'Blog', color: 'purple' },
  { value: 'PORTFOLIO', label: 'Portfolio', color: 'pink' },
  { value: 'CORPORATE', label: 'Corporativo', color: 'green' },
]

const typeColors = {
  orange: 'from-orange-500/10 to-red-500/10 border-orange-500/20 text-orange-400',
  blue: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400',
  purple: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400',
  pink: 'from-pink-500/10 to-rose-500/10 border-pink-500/20 text-pink-400',
  green: 'from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-400',
}

export default function PlantillasPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('ALL')
  const [showModal, setShowModal] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/admin/templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data.templates || [])
      }
    } catch (error) {
      console.error('Error loading templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === 'ALL' || template.type === typeFilter

    return matchesSearch && matchesType
  })

  const handleDelete = async (id: string) => {
    const template = templates.find(t => t.id === id)
    if (!template) return

    if (template._count && template._count.sites > 0) {
      alert(`No se puede eliminar. Hay ${template._count.sites} sitio(s) usando esta plantilla.`)
      return
    }

    if (!confirm('¿Estás seguro de eliminar esta plantilla?')) return

    try {
      const response = await fetch(`/api/admin/templates/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setTemplates(templates.filter(t => t.id !== id))
      } else {
        const data = await response.json()
        alert(data.error || 'Error al eliminar plantilla')
      }
    } catch (error) {
      console.error('Error deleting template:', error)
      alert('Error al eliminar plantilla')
    }
  }

  const getTypeCounts = () => {
    return {
      total: templates.length,
      ...templateTypes.reduce((acc, type) => ({
        ...acc,
        [type.value.toLowerCase()]: templates.filter(t => t.type === type.value).length
      }), {})
    }
  }

  const counts = getTypeCounts()

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent mb-2">
            Plantillas
          </h1>
          <p className="text-gray-400">
            Gestiona las plantillas disponibles del sistema
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTemplate(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/50"
        >
          <Plus className="w-5 h-5" />
          Nueva Plantilla
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="w-6 h-6 text-orange-400" />
            <h3 className="text-gray-400 text-sm font-medium">Total Plantillas</h3>
          </div>
          <p className="text-3xl font-bold text-white">{counts.total}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-6 h-6 text-blue-400" />
            <h3 className="text-gray-400 text-sm font-medium">Tipos Disponibles</h3>
          </div>
          <p className="text-3xl font-bold text-white">{templateTypes.length}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            <h3 className="text-gray-400 text-sm font-medium">En Uso</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {templates.reduce((sum, t) => sum + (t._count?.sites || 0), 0)}
          </p>
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
              placeholder="Buscar plantillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-white placeholder-gray-500 transition-all"
            />
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setTypeFilter('ALL')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              typeFilter === 'ALL'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            Todos
          </button>
          {templateTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setTypeFilter(type.value)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                typeFilter === type.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400">Cargando plantillas...</div>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            {searchTerm || typeFilter !== 'ALL' ? 'No se encontraron plantillas' : 'No hay plantillas'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || typeFilter !== 'ALL' ? 'Intenta con otros filtros' : 'Comienza creando tu primera plantilla'}
          </p>
          {!searchTerm && typeFilter === 'ALL' && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              Crear Primera Plantilla
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const typeConfig = templateTypes.find(t => t.value === template.type)
            const colorClass = typeColors[typeConfig?.color as keyof typeof typeColors] || typeColors.orange

            return (
              <div
                key={template.id}
                className="group bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  {template.thumbnail ? (
                    <img 
                      src={template.thumbnail} 
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Palette className="w-16 h-16 text-gray-600" />
                  )}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-br ${colorClass} backdrop-blur-xl border`}>
                      <span className="text-xs font-semibold">
                        {typeConfig?.label || template.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {template.description || 'Sin descripción'}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Layers className="w-4 h-4" />
                      <span>{template._count?.sites || 0} sitios</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-700/50">
                    <button
                      onClick={() => {
                        setEditingTemplate(template)
                        setShowModal(true)
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(template.id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                      disabled={template._count && template._count.sites > 0}
                      title={template._count && template._count.sites > 0 ? 'No se puede eliminar - en uso' : 'Eliminar'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <TemplateModal
          template={editingTemplate}
          onClose={() => {
            setShowModal(false)
            setEditingTemplate(null)
          }}
          onSave={() => {
            fetchTemplates()
            setShowModal(false)
            setEditingTemplate(null)
          }}
        />
      )}
    </div>
  )
}

// Modal Component
function TemplateModal({
  template,
  onClose,
  onSave,
}: {
  template: Template | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    description: template?.description || '',
    type: template?.type || 'ECOMMERCE',
    thumbnail: template?.thumbnail || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = template ? `/api/admin/templates/${template.id}` : '/api/admin/templates'
      const method = template ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        onSave()
      } else {
        setError(data.error || 'Error al guardar plantilla')
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
          {template ? 'Editar Plantilla' : 'Nueva Plantilla'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ej: E-commerce Moderno"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Describe la plantilla..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo *
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {templateTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL de Thumbnail
            </label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
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
              className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
