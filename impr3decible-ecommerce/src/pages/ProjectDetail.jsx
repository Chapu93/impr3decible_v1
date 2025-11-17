import { useParams, Link } from 'react-router-dom'

const ProjectDetail = () => {
  const { slug } = useParams()

  const projects = {
    'prototipo-dron': {
      title: 'Prototipo Funcional de Dron V2',
      subtitle: 'Un caso de éxito en la iteración rápida y fabricación de componentes complejos para un vehículo aéreo no tripulado.',
      mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGTByBhgYqme3DgNLLCvUHxeCkNcQgn8rTVc0Mu8QmUvV_lPi-KFldHuN-QeYmVnx-6dOJI4XqN_a9niIsWvfn46TLis7wqKrvU5vRqH7ePdIenuVrX65CZuDnCBb2E-U_CklUlPlA_BSIYR6btpGz8Ed7zC4A6cIocYBEUyM-cgCJb69VtlMa_RX7gigC1_YSiu88Q58NbhL6PUt3qU6k9wI9sNTq_FR98hXrifgJxWTcpTffUAH_lSA7MZ4ZKOGcURQt_4V5DgnF',
      gallery: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAVzv75_SrwRlDAXeTi2mI99Nk2HoezXKIyPsLGDAlTxmb3URtYiY9joMna-SvkEH6fjV69OEX0Kbj_mzg6yYrMtUYngCpz4tWy3EM0HeJUejd9emHqLqW1ceAM8nSGUCjNBGUmQ9sIYTRQTTJ5aFOv4ItjdqOErV8-yiW-p09iYotNTEnRRduramzgHagWZadVTweRU6mbFolKxSAcZFwgNnyOBgKsmAHpRBQn6Sa5N3y2RcmTOGIPD_GqCLNjvxtEgpnq5EgVXaiS',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCi-FYTQsCYg-raNG1fXWX5bB0gG-Xtzmw0gHQP6JSjT-3Bh0Qykru-V5rfLeP7GqF6Nx1PmLArLHrLbyHunNh-Hut2SzSyVILVis_gyGNxJNlatsrGc2mI8YF9YERTlzthuS_IP3ZuNllD4y3g8tgpG-RkZQ0XZKXF0Dj2tQcBCMc1XpJaZdoZp1RyDoJ26D0AC43WXCUTttOZ8eIjsWswIBRKHfRNtXu_UR2SCc9nu7cAiTTQVba4PW6VTf6HSVSTW4zF4-OAsAuX',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDHS6xI60PiYrR8DIpO4oig-msFaO2kGKucADOPNZcPpizYtXJzo71i2fWIGqFRoD6iF3CudHuml8HaVWBekG_hRn_uA1QC_pcpfh_RmLlfml_GIS-RcJD-NGiD1GngftJFd7PTLXRcOD7XUtJcdoTzM3IYpXaImVadw4TdFaPMeMP2VDRQOS_gAJ3LS6qMVbKX2MXSVg6_kXM23QlYZiPJ6nnpkYcDQ9zMdsxjLxUcx9apQ13oRywMpzU6kxG70CUEjEfFRG67FRr2',
      ],
      materials: [
        { name: 'Chasis principal', value: 'PETG Carbon Fiber' },
        { name: 'Tren de aterrizaje', value: 'TPU Flexible' },
        { name: 'Soportes motor', value: 'ABS de alta temperatura' },
      ],
      technology: 'Impresión FDM (Modelado por deposición fundida)',
      date: 'Julio 2024',
      description: `
        <p>El cliente, una startup de tecnología agrícola, nos contactó para desarrollar un prototipo funcional para su nuevo dron de monitoreo de cultivos. El objetivo principal era crear una estructura ligera, resistente a las condiciones de campo y capaz de albergar su electrónica personalizada, incluyendo sensores y una cámara de alta definición.</p>
      `,
      challenge: `
        <p>El principal reto consistía en integrar múltiples componentes en un chasis compacto, manteniendo un peso mínimo sin comprometer la integridad estructural. Las piezas debían tener tolerancias muy precisas para un ensamblaje perfecto y ser resistentes a la vibración de los motores y a posibles impactos leves durante los aterrizajes.</p>
      `,
      solution: `
        <p>Tras analizar los requerimientos, propusimos un enfoque mult-material. Utilizamos PETG reforzado con fibra de carbono para el cuerpo principal por su excelente relación rigidez-peso. Para el tren de aterrizaje, optamos por TPU flexible para absorber impactos. Los soportes de los motores se imprimieron en ABS para resistir las altas temperaturas generadas. Realizamos 3 iteraciones de diseño en menos de una semana, ajustando las geometrías según el feedback del cliente para optimizar el montaje y la distribución del peso.</p>
      `,
      results: `
        <p>El prototipo final no solo cumplió con todas las especificaciones técnicas, sino que superó las expectativas en cuanto a durabilidad en las pruebas de campo. El cliente pudo validar su diseño electrónico rápidamente, reduciendo su tiempo de desarrollo en un 40% en comparación con métodos de fabricación tradicionales. Este éxito les permitió asegurar una nueva ronda de financiación para pasar a la producción en masa.</p>
      `,
    },
    // Podemos agregar más proyectos aquí
  }

  const project = projects[slug]

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
          Proyecto no encontrado
        </h2>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-12 opacity-0 animate-fade-in-up">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-orange-600 transition-colors mb-4"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Volver al Inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-text-muted-light dark:text-text-muted-dark">
              {project.subtitle}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 opacity-0 animate-fade-in-up animation-delay-200">
            {/* Images */}
            <div className="md:col-span-3">
              <div className="bg-surface-light dark:bg-surface-dark p-2 rounded-lg border border-border-light dark:border-border-dark shadow-lg">
                <img
                  alt={project.title}
                  className="rounded-md w-full aspect-video object-cover"
                  src={project.mainImage}
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {project.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="bg-surface-light dark:bg-surface-dark p-1 rounded-md border border-border-light dark:border-border-dark cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      alt={`Detalle ${idx + 1}`}
                      className="rounded-sm w-full h-full object-cover"
                      src={img}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="md:col-span-2">
              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark shadow-lg space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">palette</span>
                    Materiales Utilizados
                  </h3>
                  <ul className="mt-2 list-disc list-inside text-text-muted-light dark:text-text-muted-dark text-sm space-y-1">
                    {project.materials.map((material, idx) => (
                      <li key={idx}>
                        <span className="font-semibold text-text-light dark:text-text-dark">
                          {material.name}:
                        </span>{' '}
                        {material.value}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border-light dark:border-border-dark"></div>
                <div>
                  <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">build_circle</span>
                    Tecnología
                  </h3>
                  <p className="mt-2 text-text-muted-light dark:text-text-muted-dark text-sm">
                    {project.technology}
                  </p>
                </div>
                <div className="border-t border-border-light dark:border-border-dark"></div>
                <div>
                  <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">calendar_month</span>
                    Fecha
                  </h3>
                  <p className="mt-2 text-text-muted-light dark:text-text-muted-dark text-sm">
                    {project.date}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-surface-light dark:bg-surface-dark p-8 md:p-12 rounded-lg border border-border-light dark:border-border-dark shadow-lg mt-12 opacity-0 animate-fade-in-up animation-delay-400">
            <div className="prose prose-p:text-text-muted-light dark:prose-p:text-text-muted-dark prose-headings:text-text-light dark:prose-headings:text-text-dark max-w-none">
              <h2 className="text-2xl font-bold text-primary border-b border-border-light dark:border-border-dark pb-3">
                Descripción del Proyecto
              </h2>
              <div dangerouslySetInnerHTML={{ __html: project.description }} />

              <h3 className="text-xl font-bold mt-8">El Desafío</h3>
              <div dangerouslySetInnerHTML={{ __html: project.challenge }} />

              <h3 className="text-xl font-bold mt-8">Nuestra Solución</h3>
              <div dangerouslySetInnerHTML={{ __html: project.solution }} />

              <h3 className="text-xl font-bold mt-8">Resultados</h3>
              <div dangerouslySetInnerHTML={{ __html: project.results }} />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center opacity-0 animate-fade-in-up animation-delay-600">
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">
              ¿Tienes una idea similar?
            </h2>
            <p className="mt-3 text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
              Podemos ayudarte a convertir tu concepto en un prototipo funcional. Contáctanos para una cotización sin compromiso.
            </p>
            <div className="mt-8 flex flex-col items-center">
              <Link
                to="/cotizar"
                className="w-full md:w-auto bg-primary text-white font-bold py-4 px-12 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:bg-orange-600 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-3 text-lg"
              >
                <span className="material-symbols-outlined">request_quote</span>
                Solicitar un proyecto similar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProjectDetail
