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
    'maqueta-arquitectonica': {
      title: 'Maqueta Arquitectónica de Alta Definición',
      subtitle: 'Transformación de planos digitales en una maqueta física detallada para presentación de proyecto inmobiliario de lujo.',
      mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzex9XQFz-MF33BcpOh6NzkTCfgnZvzwuajUYM1buSP_88-Sc5vzi4_tT_Cw0ZfB0SiN-Lbo7JEQ3E70BfJ-ykKSsrdio3qsw9cddgp1pBATVRrb6XpBWCpon_zEsJEYlK-13oTrqNpcc8F59I4hl63Wtrb_xeROHsnEmSEn-PX4qGtcnHB_5ir9rvB8mPoCr5N45M-hvBJn998eGqAVwj_VZXmPrZGcwztr6X7Z1KvWeLmSvrI2uMy-KQ9tNY9PWWaGOnRxAgA9D8',
      gallery: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBzex9XQFz-MF33BcpOh6NzkTCfgnZvzwuajUYM1buSP_88-Sc5vzi4_tT_Cw0ZfB0SiN-Lbo7JEQ3E70BfJ-ykKSsrdio3qsw9cddgp1pBATVRrb6XpBWCpon_zEsJEYlK-13oTrqNpcc8F59I4hl63Wtrb_xeROHsnEmSEn-PX4qGtcnHB_5ir9rvB8mPoCr5N45M-hvBJn998eGqAVwj_VZXmPrZGcwztr6X7Z1KvWeLmSvrI2uMy-KQ9tNY9PWWaGOnRxAgA9D8',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBzex9XQFz-MF33BcpOh6NzkTCfgnZvzwuajUYM1buSP_88-Sc5vzi4_tT_Cw0ZfB0SiN-Lbo7JEQ3E70BfJ-ykKSsrdio3qsw9cddgp1pBATVRrb6XpBWCpon_zEsJEYlK-13oTrqNpcc8F59I4hl63Wtrb_xeROHsnEmSEn-PX4qGtcnHB_5ir9rvB8mPoCr5N45M-hvBJn998eGqAVwj_VZXmPrZGcwztr6X7Z1KvWeLmSvrI2uMy-KQ9tNY9PWWaGOnRxAgA9D8',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBzex9XQFz-MF33BcpOh6NzkTCfgnZvzwuajUYM1buSP_88-Sc5vzi4_tT_Cw0ZfB0SiN-Lbo7JEQ3E70BfJ-ykKSsrdio3qsw9cddgp1pBATVRrb6XpBWCpon_zEsJEYlK-13oTrqNpcc8F59I4hl63Wtrb_xeROHsnEmSEn-PX4qGtcnHB_5ir9rvB8mPoCr5N45M-hvBJn998eGqAVwj_VZXmPrZGcwztr6X7Z1KvWeLmSvrI2uMy-KQ9tNY9PWWaGOnRxAgA9D8',
      ],
      materials: [
        { name: 'Estructura principal', value: 'Resina transparente de alta definición' },
        { name: 'Detalles arquitectónicos', value: 'Resina blanca mate' },
        { name: 'Base y paisajismo', value: 'PLA color madera' },
      ],
      technology: 'Impresión SLA (Estereolitografía) + FDM',
      date: 'Agosto 2024',
      description: `
        <p>Un estudio de arquitectura de prestigio nos encargó la fabricación de una maqueta a escala 1:100 para presentar su nuevo proyecto residencial de lujo ante potenciales inversionistas. La maqueta debía capturar cada detalle arquitectónico del diseño, incluyendo la fachada acristalada, balcones volados, y el complejo paisajismo circundante.</p>
      `,
      challenge: `
        <p>El principal desafío era lograr un nivel de detalle excepcional que pudiera apreciarse desde cualquier ángulo, manteniendo la transparencia de las secciones acristaladas del edificio. Además, el cliente necesitaba la maqueta en un plazo muy ajustado de 10 días para una presentación crucial. Cada elemento debía ser perfectamente proporcional y los acabados tenían que tener calidad de exposición.</p>
      `,
      solution: `
        <p>Implementamos un flujo de trabajo híbrido utilizando dos tecnologías complementarias. Para la estructura del edificio y los elementos que requerían transparencia, empleamos impresión SLA con resina de alta definición, lo que nos permitió capturar todos los detalles arquitectónicos con una precisión de 50 micrones. Los elementos de paisajismo y la base se imprimieron en FDM con PLA texturizado que simula madera. Realizamos post-procesado meticuloso incluyendo lijado fino, pintura manual de detalles, y tratamiento UV para el acabado final. La maqueta se ensambló en módulos para facilitar el transporte.</p>
      `,
      results: `
        <p>La maqueta superó las expectativas del cliente, convirtiéndose en la pieza central de su presentación. Los inversionistas quedaron impresionados por el nivel de detalle y realismo, lo que facilitó la comprensión del proyecto. El estudio de arquitectura reportó que la maqueta fue instrumental para asegurar la financiación del proyecto. Como resultado, nos han contratado para tres maquetas adicionales de proyectos futuros y nos han recomendado a otros estudios de arquitectura de la región.</p>
      `,
    },
    'piezas-mecanicas': {
      title: 'Piezas Mecánicas para Maquinaria Industrial',
      subtitle: 'Fabricación a medida de componentes mecánicos de reemplazo para reducir tiempos de parada en producción.',
      mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhoAuOEbbocbjF26hKg8LIJBTG4zx4lQ3Lg1HDj1iju0ZrDn2VVxuxTpD9ZZpgtR-Wwj16QDC8kNP-UNOdk4gkuy4uTSUyWdxqsQFFf0PNz2i_BvoN-FPilrlNxhDiiDvjrJJGI71RRBKVEnquMJjZnV7O1VQuMhGgeH5w5cEyOHcBHXfASegN2QlCZtS5uQMMAX91BxZ6KGGHW-G9lI-aQhHJ4dn_BPFRThjJoXaiDZwJZzORcJ0l9PFmxyL8oYJDlh-nrtG2zPZt',
      gallery: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDhoAuOEbbocbjF26hKg8LIJBTG4zx4lQ3Lg1HDj1iju0ZrDn2VVxuxTpD9ZZpgtR-Wwj16QDC8kNP-UNOdk4gkuy4uTSUyWdxqsQFFf0PNz2i_BvoN-FPilrlNxhDiiDvjrJJGI71RRBKVEnquMJjZnV7O1VQuMhGgeH5w5cEyOHcBHXfASegN2QlCZtS5uQMMAX91BxZ6KGGHW-G9lI-aQhHJ4dn_BPFRThjJoXaiDZwJZzORcJ0l9PFmxyL8oYJDlh-nrtG2zPZt',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDhoAuOEbbocbjF26hKg8LIJBTG4zx4lQ3Lg1HDj1iju0ZrDn2VVxuxTpD9ZZpgtR-Wwj16QDC8kNP-UNOdk4gkuy4uTSUyWdxqsQFFf0PNz2i_BvoN-FPilrlNxhDiiDvjrJJGI71RRBKVEnquMJjZnV7O1VQuMhGgeH5w5cEyOHcBHXfASegN2QlCZtS5uQMMAX91BxZ6KGGHW-G9lI-aQhHJ4dn_BPFRThjJoXaiDZwJZzORcJ0l9PFmxyL8oYJDlh-nrtG2zPZt',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDhoAuOEbbocbjF26hKg8LIJBTG4zx4lQ3Lg1HDj1iju0ZrDn2VVxuxTpD9ZZpgtR-Wwj16QDC8kNP-UNOdk4gkuy4uTSUyWdxqsQFFf0PNz2i_BvoN-FPilrlNxhDiiDvjrJJGI71RRBKVEnquMJjZnV7O1VQuMhGgeH5w5cEyOHcBHXfASegN2QlCZtS5uQMMAX91BxZ6KGGHW-G9lI-aQhHJ4dn_BPFRThjJoXaiDZwJZzORcJ0l9PFmxyL8oYJDlh-nrtG2zPZt',
      ],
      materials: [
        { name: 'Engranajes principales', value: 'Nylon 12 reforzado con fibra de vidrio' },
        { name: 'Soportes y brackets', value: 'ABS de alta temperatura' },
        { name: 'Juntas y sellos', value: 'TPU 95A resistente a químicos' },
      ],
      technology: 'Impresión FDM con materiales técnicos',
      date: 'Septiembre 2024',
      description: `
        <p>Una empresa manufacturera local nos contactó en situación de emergencia: una máquina crítica en su línea de producción se había averiado y el proveedor original de las piezas de repuesto tenía un tiempo de entrega de 6 semanas. La parada de producción estaba costando miles de euros al día. Necesitaban varios componentes mecánicos incluyendo engranajes, soportes y adaptadores customizados.</p>
      `,
      challenge: `
        <p>El desafío era triple: primero, debíamos hacer ingeniería inversa de las piezas originales sin documentación técnica disponible. Segundo, las piezas debían soportar condiciones exigentes de operación continua con cargas mecánicas significativas y exposición a lubricantes industriales. Tercero, el tiempo era crítico - cada día de retraso representaba pérdidas económicas sustanciales para el cliente.</p>
      `,
      solution: `
        <p>Implementamos un proceso acelerado de escaneo 3D de las piezas dañadas para obtener las geometrías exactas. Nuestro equipo de ingeniería optimizó los diseños para impresión 3D, reforzando las áreas de mayor estrés mecánico. Seleccionamos materiales técnicos de grado industrial: Nylon 12 con fibra de vidrio para los engranajes por su excepcional resistencia al desgaste y propiedades autolubricantes, ABS de alta temperatura para los soportes estructurales, y TPU resistente a químicos para las juntas. Produjimos las piezas en 48 horas y realizamos pruebas de torque y resistencia antes de la entrega.</p>
      `,
      results: `
        <p>Las piezas impresas en 3D superaron las pruebas de rendimiento y la máquina volvió a estar operativa en menos de 72 horas desde el contacto inicial, frente a las 6 semanas que hubiera tomado el método tradicional. Esto significó un ahorro de más de 50,000€ en pérdidas por parada de producción. Tres meses después, las piezas siguen funcionando perfectamente sin signos de desgaste prematuro. El cliente ahora mantiene un stock de repuestos impresos en 3D para otras máquinas críticas y nos ha contratado para desarrollar mejoras en otros componentes de su maquinaria.</p>
      `,
    },
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
