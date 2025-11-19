'use client'

import { useState, useEffect } from 'react'
import { Users, Plus, Search, Mail, Calendar, Edit2, Trash2, Eye, Globe, AlertCircle } from 'lucide-react'

interface Client {
  id: string
  email: string
  name: string
  phone: string | null
  companyName: string | null
  createdAt: string
  _count?: {
    sites: number
  }
}

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  // Cargar clientes
  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients')
      if (response.ok) {
        const data = await response.json()
        setClients(data.clients || [])
      }
    } catch (error) {
      console.error('Error loading clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredClients = clients.filter(client =>
    client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return

    try {
      const response = await fetch(`/api/admin/clients/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setClients(clients.filter(c => c.id !== id))
      }
    } catch (error) {
      console.error('Error deleting client:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
            Clientes
          </h1>
          <p className="text-gray-400">
            Gestiona los clientes de tu plataforma
          </p>
        </div>
        <button
          onClick={() => {
            setEditingClient(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/50"
        >
          <Plus className="w-5 h-5" />
          Nuevo Cliente
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="search"
            placeholder="Buscar por nombre, email o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-500 transition-all"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-purple-400" />
            <h3 className="text-gray-400 text-sm font-medium">Total Clientes</h3>
          </div>
          <p className="text-3xl font-bold text-white">{clients.length}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-6 h-6 text-blue-400" />
            <h3 className="text-gray-400 text-sm font-medium">Sitios Activos</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {clients.reduce((sum, c) => sum + (c._count?.sites || 0), 0)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-green-400" />
            <h3 className="text-gray-400 text-sm font-medium">Este Mes</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {clients.filter(c => {
              const created = new Date(c.createdAt)
              const now = new Date()
              return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
            }).length}
          </p>
        </div>
      </div>

      {/* Clients Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400">Cargando clientes...</div>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            {searchTerm ? 'No se encontraron clientes' : 'No hay clientes'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 'Intenta con otro término de búsqueda' : 'Comienza agregando tu primer cliente'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              Crear Primer Cliente
            </button>
          )}
        </div>
      ) : (
        <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Cliente</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Empresa</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Sitios</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Fecha</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center text-white font-semibold">
                          {client.name?.charAt(0) || 'C'}
                        </div>
                        <div>
                          <p className="font-medium text-white">{client.name}</p>
                          {client.phone && (
                            <p className="text-sm text-gray-500">{client.phone}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {client.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{client.companyName || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-medium">{client._count?.sites || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(client.createdAt).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingClient(client)
                            setShowModal(true)
                          }}
                          className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Crear/Editar Cliente */}
      {showModal && (
        <ClientModal
          client={editingClient}
          onClose={() => {
            setShowModal(false)
            setEditingClient(null)
          }}
          onSave={() => {
            fetchClients()
            setShowModal(false)
            setEditingClient(null)
          }}
        />
      )}
    </div>
  )
}

// Modal Component
function ClientModal({
  client,
  onClose,
  onSave,
}: {
  client: Client | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    companyName: client?.companyName || '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = client ? `/api/admin/clients/${client.id}` : '/api/admin/clients'
      const method = client ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        onSave()
      } else {
        setError(data.error || 'Error al guardar cliente')
      }
    } catch (err) {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6">
          {client ? 'Editar Cliente' : 'Nuevo Cliente'}
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
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Empresa
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {!client && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña *
              </label>
              <input
                type="password"
                required={!client}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}

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
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
