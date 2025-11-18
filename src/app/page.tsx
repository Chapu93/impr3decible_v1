export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            SaaS Website Builder
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12">
            Plataforma para venta de sitios web personalizables
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🏢</div>
              <h2 className="text-xl font-bold mb-2">Panel Admin</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Gestiona clientes, sitios y plantillas
              </p>
              <a
                href="http://admin.localhost:3000"
                className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Ir al Panel
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">👤</div>
              <h2 className="text-xl font-bold mb-2">Panel Cliente</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Personaliza tu sitio web
              </p>
              <a
                href="http://panel.localhost:3000"
                className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Ir al Panel
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🌐</div>
              <h2 className="text-xl font-bold mb-2">Sitio Demo</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Ver ejemplo de sitio publicado
              </p>
              <a
                href="http://demo.localhost:3000"
                className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Ver Demo
              </a>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">🔧 Estado de Servicios</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                PostgreSQL
              </div>
              <div>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Redis
              </div>
              <div>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                MinIO
              </div>
              <div>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                MailHog
              </div>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>Credenciales de prueba en el archivo README.md</p>
          </div>
        </div>
      </div>
    </main>
  )
}
