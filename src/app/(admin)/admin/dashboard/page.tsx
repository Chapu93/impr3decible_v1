export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bienvenido al panel de administración
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Clientes
              </h3>
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">1</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              ✅ Activo
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Sitios Web
              </h3>
              <span className="text-2xl">🌐</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">1</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
              ✅ Publicado
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Plantillas
              </h3>
              <span className="text-2xl">🎨</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">1</p>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
              E-commerce
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Productos
              </h3>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">3</p>
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
              En sitio demo
            </p>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <span className="text-3xl mr-4">🎉</span>
            <div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                ¡Autenticación Exitosa!
              </h3>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Has iniciado sesión correctamente en el panel de administración.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  ✅ Fase 1: Setup completado<br />
                  ✅ Autenticación funcionando<br />
                  ⏳ Siguiente: Dashboard completo con métricas reales
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors text-left">
              <span className="text-2xl mb-2 block">👥</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Gestionar Clientes
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ver, crear y editar clientes
              </p>
            </button>

            <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left">
              <span className="text-2xl mb-2 block">🌐</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Gestionar Sitios
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Crear y configurar sitios web
              </p>
            </button>

            <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-left">
              <span className="text-2xl mb-2 block">🎨</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Ver Plantillas
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Administrar plantillas disponibles
              </p>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <a
            href="/api/auth/logout"
            className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Cerrar Sesión
          </a>
        </div>
      </div>
    </div>
  )
}
