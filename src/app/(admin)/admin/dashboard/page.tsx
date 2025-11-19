import { Users, Globe, Palette, Package, CheckCircle2, Clock, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
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
            <div className="px-3 py-1 bg-green-500/20 rounded-full">
              <span className="text-xs font-semibold text-green-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Total Clientes</h3>
          <p className="text-4xl font-bold text-white mb-2">1</p>
          <p className="text-sm text-green-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Activo
          </p>
        </div>

        <div className="group relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Globe className="w-7 h-7 text-blue-400" strokeWidth={2} />
            </div>
            <div className="px-3 py-1 bg-blue-500/20 rounded-full">
              <span className="text-xs font-semibold text-blue-400">Online</span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Sitios Web</h3>
          <p className="text-4xl font-bold text-white mb-2">1</p>
          <p className="text-sm text-blue-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Publicado
          </p>
        </div>

        <div className="group relative bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Palette className="w-7 h-7 text-orange-400" strokeWidth={2} />
            </div>
            <div className="px-3 py-1 bg-orange-500/20 rounded-full">
              <span className="text-xs font-semibold text-orange-400">Nuevo</span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Plantillas</h3>
          <p className="text-4xl font-bold text-white mb-2">1</p>
          <p className="text-sm text-orange-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> E-commerce
          </p>
        </div>

        <div className="group relative bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-xl border border-pink-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-500/20 rounded-xl">
              <Package className="w-7 h-7 text-pink-400" strokeWidth={2} />
            </div>
            <div className="px-3 py-1 bg-pink-500/20 rounded-full">
              <span className="text-xs font-semibold text-pink-400">Demo</span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Productos</h3>
          <p className="text-4xl font-bold text-white mb-2">3</p>
          <p className="text-sm text-pink-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> En catálogo
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
              Autenticación exitosa. Panel admin completamente funcional.
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
              <div className="flex items-center gap-2 text-blue-400">
                <Clock className="w-5 h-5" />
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
          <button className="group relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-purple-700/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 text-left">
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
          </button>

          <button className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-700/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 text-left">
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
          </button>

          <button className="group relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-700/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 text-left">
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
          </button>
        </div>
      </div>
    </div>
  )
}
