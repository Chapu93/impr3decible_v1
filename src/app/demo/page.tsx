export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🌐</div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Sitio Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            demo.localhost:3000
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-green-600">✅ Funcionando!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Este es el sitio público demo. Aquí se renderizará:
            </p>
            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              <li>✅ La plantilla E-commerce completa</li>
              <li>✅ Personalización del cliente (colores, textos, logo)</li>
              <li>✅ Productos del catálogo</li>
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
                📁 Archivo: src/app/demo/page.tsx<br />
                📖 Roadmap: PROXIMOS_PASOS.md<br />
                🗄️ Subdominio: demo
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">💡 Próximo Paso</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
              En la <strong>Fase 4</strong> desarrollaremos el sistema que cargará dinámicamente
              la plantilla e-commerce que ya tienes en <code>impr3decible-ecommerce/</code> con
              la configuración personalizada de cada cliente desde la base de datos.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="http://localhost:3000"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              ← Volver al Home
            </a>
            <a
              href="http://admin.localhost:3000"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Panel Admin
            </a>
            <a
              href="http://panel.localhost:3000"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Panel Cliente
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
