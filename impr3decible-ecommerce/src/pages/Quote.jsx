import { useState } from 'react'
import { useToast } from '../context/ToastContext'
import { useSEO } from '../hooks/useSEO'

const Quote = () => {
  useSEO({
    title: 'Solicitar Cotización',
    description: 'Sube tu modelo 3D y obtén una cotización personalizada. Selecciona material, acabado y especificaciones técnicas para tu proyecto.',
    keywords: 'cotización 3D, presupuesto impresión 3D, upload STL, proyecto personalizado',
    url: window.location.origin + '/cotizar'
  })
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    material: 'PLA (Estándar)',
    finish: 'Estándar',
    message: '',
  })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter(file => {
      const validExtensions = ['.stl', '.obj', '.3mf', '.step', '.stp']
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
      const isValidSize = file.size <= 50 * 1024 * 1024 // 50MB
      
      if (!validExtensions.includes(fileExtension)) {
        showToast(`${file.name}: Formato no válido. Use STL, OBJ, 3MF o STEP`, 'info')
        return false
      }
      if (!isValidSize) {
        showToast(`${file.name}: El archivo es muy grande (máx 50MB)`, 'info')
        return false
      }
      return true
    })
    
    setSelectedFiles(prev => [...prev, ...validFiles])
    if (validFiles.length > 0) {
      showToast(`${validFiles.length} archivo(s) agregado(s)`, 'success')
    }
  }

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    showToast('Archivo eliminado', 'info')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la cotización
    console.log('Archivos a enviar:', selectedFiles)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center py-16 bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark animate-scale-in">
          <span className="material-symbols-outlined text-8xl text-green-500">check_circle</span>
          <h2 className="mt-6 text-3xl font-bold text-text-light dark:text-text-dark">
            ¡Solicitud Enviada!
          </h2>
          <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">
            Gracias por tu interés. Nos pondremos en contacto contigo pronto con una cotización detallada.
          </p>
          <button
            onClick={() => {
              setSubmitted(false)
              setSelectedFiles([])
              setFormData({
                name: '',
                email: '',
                material: 'PLA (Estándar)',
                finish: 'Estándar',
                message: '',
              })
            }}
            className="mt-8 bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 hover:scale-105 transition-all duration-500"
          >
            Enviar Otra Solicitud
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="py-20 md:py-24 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto opacity-0 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">
            Inicia tu Proyecto de Impresión 3D
          </h2>
          <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">
            Sube tu modelo, elige tus especificaciones y obtén una cotización instantánea. Es así de simple.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto bg-surface-light dark:bg-surface-dark p-8 md:p-12 rounded-lg border border-border-light dark:border-border-dark shadow-xl opacity-0 animate-fade-in-up animation-delay-200">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6 opacity-0 animate-fade-in animation-delay-300">
              <div>
                <label
                  className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
                  htmlFor="file-upload"
                >
                  1. Sube tu modelo 3D
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-light dark:border-border-dark border-dashed rounded-lg hover:border-primary transition-all duration-500">
                  <div className="space-y-1 text-center">
                    <span className="material-symbols-outlined text-4xl text-text-muted-light dark:text-text-muted-dark">
                      upload_file
                    </span>
                    <div className="flex text-sm text-text-muted-light dark:text-text-muted-dark">
                      <label
                        className="relative cursor-pointer bg-surface-light dark:bg-surface-dark rounded-md font-medium text-primary hover:text-orange-600 focus-within:outline-none"
                        htmlFor="file-upload"
                      >
                        <span>Selecciona archivos</span>
                        <input 
                          className="sr-only" 
                          id="file-upload" 
                          name="file-upload" 
                          type="file"
                          accept=".stl,.obj,.3mf,.step,.stp"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">o arrástralos aquí</p>
                    </div>
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                      STL, OBJ, 3MF, STEP (hasta 50MB por archivo)
                    </p>
                  </div>
                </div>
                
                {selectedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-text-light dark:text-text-dark">
                      Archivos seleccionados ({selectedFiles.length}):
                    </p>
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-3"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="material-symbols-outlined text-primary text-xl">
                            insert_drive_file
                          </span>
                          <span className="text-sm text-text-light dark:text-text-dark truncate">
                            {file.name}
                          </span>
                          <span className="text-xs text-text-muted-light dark:text-text-muted-dark">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-2 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          aria-label="Eliminar archivo"
                        >
                          <span className="material-symbols-outlined text-red-500 text-xl">
                            delete
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
                  htmlFor="material"
                >
                  2. Elige el Material
                </label>
                <select
                  className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                >
                  <option>PLA (Estándar)</option>
                  <option>ABS (Resistente)</option>
                  <option>PETG (Duradero y Flexible)</option>
                  <option>Resina (Alta Definición)</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
                  htmlFor="finish"
                >
                  3. Acabado
                </label>
                <select
                  className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                  id="finish"
                  name="finish"
                  value={formData.finish}
                  onChange={handleInputChange}
                >
                  <option>Estándar</option>
                  <option>Lijado y Pulido</option>
                  <option>Pintado</option>
                </select>
              </div>
            </div>
            <div className="space-y-6 flex flex-col opacity-0 animate-fade-in animation-delay-400">
              <div>
                <label
                  className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
                  htmlFor="name"
                >
                  4. Tu Nombre *
                </label>
                <input
                  className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                  id="name"
                  name="name"
                  placeholder="Juan Pérez"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
                  htmlFor="email"
                >
                  5. Correo Electrónico *
                </label>
                <input
                  className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                  id="email"
                  name="email"
                  placeholder="juan.perez@ejemplo.com"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-grow">
                <label
                  className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
                  htmlFor="message"
                >
                  Notas Adicionales (Opcional)
                </label>
                <textarea
                  className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary resize-none text-text-light dark:text-text-dark"
                  id="message"
                  name="message"
                  placeholder="Algún requerimiento especial..."
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-primary/50 hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                type="submit"
              >
                <span className="material-symbols-outlined">calculate</span>
                Solicitar Cotización
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Quote
