export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🏢</div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Panel de Administración
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            admin.localhost:3000
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">🚧 En Desarrollo</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Este es el Panel de Administración donde podrás:
            </p>
            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
              <li>✅ Gestionar clientes</li>
              <li>✅ Crear y editar sitios web</li>
              <li>✅ Administrar plantillas</li>
              <li>✅ Ver analytics y estadísticas</li>
              <li>✅ Gestionar usuarios admin</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">📋 Estado Actual</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              ✅ Fase 1: Setup completado<br />
              ⏳ Fase 2: Panel Admin (próximo paso)<br />
              📅 Estimado: 1-2 semanas de desarrollo
            </p>
            <div className="text-sm text-left bg-white dark:bg-gray-800 p-4 rounded">
              <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                📁 Este archivo: src/app/(admin)/admin/page.tsx<br />
                📖 Roadmap: PROXIMOS_PASOS.md<br />
                🔐 Login: admin@demo.com / admin123
              </p>
            </div>
          </div>

          <a
            href="http://localhost:3000"
            className="inline-block mt-8 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            ← Volver al Home
          </a>
        </div>
      </div>
    </div>
  )
}
