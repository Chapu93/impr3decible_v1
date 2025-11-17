import { useState } from 'react'

const Quote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    material: 'PLA (Estándar)',
    finish: 'Estándar',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la cotización
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center py-16 bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark">
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
              setFormData({
                name: '',
                email: '',
                material: 'PLA (Estándar)',
                finish: 'Estándar',
                message: '',
              })
            }}
            className="mt-8 bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors"
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
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">
            Inicia tu Proyecto de Impresión 3D
          </h2>
          <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">
            Sube tu modelo, elige tus especificaciones y obtén una cotización instantánea. Es así de simple.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto bg-surface-light dark:bg-surface-dark p-8 md:p-12 rounded-lg border border-border-light dark:border-border-dark shadow-xl">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
                  htmlFor="file-upload"
                >
                  1. Sube tu modelo 3D
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-light dark:border-border-dark border-dashed rounded-lg hover:border-primary transition-colors">
                  <div className="space-y-1 text-center">
                    <span className="material-symbols-outlined text-4xl text-text-muted-light dark:text-text-muted-dark">
                      upload_file
                    </span>
                    <div className="flex text-sm text-text-muted-light dark:text-text-muted-dark">
                      <label
                        className="relative cursor-pointer bg-surface-light dark:bg-surface-dark rounded-md font-medium text-primary hover:text-orange-600 focus-within:outline-none"
                        htmlFor="file-upload"
                      >
                        <span>Selecciona un archivo</span>
                        <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                      </label>
                      <p className="pl-1">o arrástralo aquí</p>
                    </div>
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                      STL, OBJ, 3MF (hasta 50MB)
                    </p>
                  </div>
                </div>
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
            <div className="space-y-6 flex flex-col">
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
