export default function SitePage({ params }: { params: { subdomain: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🌐</div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Sitio: {params.subdomain}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {params.subdomain}.localhost:3000
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-green-600">🚧 En Desarrollo</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Este es un sitio público de cliente. Aquí se renderizará:
            </p>
            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
              <li>✅ La plantilla seleccionada (E-commerce, Landing, etc.)</li>
              <li>✅ Personalización del cliente (colores, textos, logo)</li>
              <li>✅ Productos y páginas del cliente</li>
              <li>✅ Carrito de compras y checkout</li>
              <li>✅ Diseño responsive</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">📋 Estado Actual</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              ✅ Fase 1: Setup completado<br />
              ⏳ Fase 4: Renderizado de sitios (después de paneles)<br />
              📅 Estimado: 1 semana de desarrollo
            </p>
            <div className="text-sm text-left bg-white dark:bg-gray-800 p-4 rounded">
              <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                📁 Este archivo: src/app/[subdomain]/page.tsx<br />
                📖 Roadmap: PROXIMOS_PASOS.md<br />
                🗄️ Subdominio detectado: <span className="text-green-600">{params.subdomain}</span>
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">💡 Cómo Funciona</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
              El sistema detecta el subdominio (<strong>{params.subdomain}</strong>) automáticamente
              y cargará la configuración del sitio desde la base de datos. Cada cliente tendrá
              su propio subdominio con su plantilla personalizada.
            </p>
          </div>

          <a
            href="http://localhost:3000"
            className="inline-block mt-8 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            ← Volver al Home
          </a>
        </div>
      </div>
    </div>
  )
}
