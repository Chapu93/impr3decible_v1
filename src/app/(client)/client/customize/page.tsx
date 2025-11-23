'use client'

import { useState } from 'react'
import { Palette, Save } from 'lucide-react'

export default function CustomizePage() {
  const [colors, setColors] = useState({
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
  })

  const handleSave = () => {
    // TODO: Implementar guardado de configuración
    alert('Próximamente: Guardar personalización')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-8">
        Personalizar Sitio
      </h1>

      {/* Preview Info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <Palette className="w-8 h-8 text-blue-400" />
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              Próximamente: Editor Visual
            </h3>
            <p className="text-gray-400 mb-4">
              Estamos trabajando en un editor visual completo que te permitirá:
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Cambiar colores y fuentes de tu sitio</li>
              <li>• Personalizar el diseño con drag & drop</li>
              <li>• Previsualizar cambios en tiempo real</li>
              <li>• Editar contenido directamente</li>
              <li>• Subir tu propio logo e imágenes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Temporary Color Picker */}
      <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Vista Previa - Colores
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color Primario
            </label>
            <input
              type="color"
              value={colors.primary}
              onChange={(e) => setColors({ ...colors, primary: e.target.value })}
              className="w-20 h-12 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color Secundario
            </label>
            <input
              type="color"
              value={colors.secondary}
              onChange={(e) => setColors({ ...colors, secondary: e.target.value })}
              className="w-20 h-12 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color de Fondo
            </label>
            <input
              type="color"
              value={colors.background}
              onChange={(e) => setColors({ ...colors, background: e.target.value })}
              className="w-20 h-12 rounded-lg cursor-pointer"
            />
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all"
          >
            <Save className="w-5 h-5" />
            Guardar Cambios (Próximamente)
          </button>
        </div>
      </div>
    </div>
  )
}
