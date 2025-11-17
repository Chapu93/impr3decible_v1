import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const Home = () => {
  const featuredProducts = products.slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-background-light dark:bg-background-dark transition-colors duration-500">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-text-light dark:text-text-dark">
              El cielo es el límite, la impresión 3d{' '}
              <span className="text-primary">Impr3Decible</span>.
            </h1>
            <p className="mt-6 text-lg text-text-muted-light dark:text-text-muted-dark max-w-xl mx-auto md:mx-0 opacity-0 animate-fade-in-up animation-delay-200">
              Transformamos tus diseños digitales en objetos físicos de alta calidad. Prototipos,
              piezas funcionales, maquetas y más, con la tecnología más avanzada.
            </p>
            <div className="mt-8 flex justify-center md:justify-start gap-4 opacity-0 animate-fade-in-up animation-delay-400">
              <Link
                to="/cotizar"
                className="bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-primary/50 hover:bg-orange-600 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
              >
                Obtener Cotización
              </Link>
              <a
                href="#proyectos"
                className="bg-surface-light dark:bg-surface-dark font-bold py-3 px-8 rounded-lg border border-border-light dark:border-border-dark hover:border-primary hover:text-primary transition-all duration-500 hover:scale-105"
              >
                Ver Proyectos
              </a>
            </div>
          </div>
          <div className="relative opacity-0 animate-slide-in-right animation-delay-300">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
            <img
              alt="Impresora 3D en acción creando un objeto naranja"
              className="relative rounded-lg shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaBvG6VtH3h0egq6oVoYByItGJtl4XrHFFrrR3OD9dCPrO7BTtLfudCjXEqnoB7M9_qdBQP2pjBxiIELY7ys1eSVk-jWdAqrgWOIqqoCzdQ6m3clTx544-aXToUa0_nEDNobJKuEcdP6hEGG7FkUUGR7Dl3OIWmRSzvwoERi8uxCrMr3s0e5zmpbl_h6OJIwBrBtdV7nc8q_nW-h6mm3isPNV5RWSphdg0GGidKJ6XD4JLHjObHuxMVcIIaWFZ_k4BjkNIljzSVUmE"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors duration-300" id="productos">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">
              Productos Destacados
            </h2>
            <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">
              Explora nuestra selección de productos listos para comprar. Perfectos para regalar o
              para tus proyectos personales.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/productos"
              className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-all duration-500 hover:scale-105 hover:shadow-lg transform"
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 md:py-24 bg-background-light dark:bg-background-dark transition-colors duration-300" id="proyectos">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">
              Nuestros Proyectos Recientes
            </h2>
            <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">
              Explora una selección de trabajos que hemos realizado para nuestros clientes. Calidad
              y precisión en cada pieza.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Prototipo de Dron',
                description:
                  'Diseño y fabricación de un chasis ligero y resistente para un dron de carreras. Material: PETG reforzado con carbono.',
                image:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCmtT5xGT5YzYsBQn6H89mA0wz2kFU9Jni9B77nOMhzpX1B01GC87Z5CPISzihT_v13-FjxybSKF3TkK2p4nkCeK3QkyGzwablCPArm2jO9aKXY6gF39jtoURhak00H8lgHgJnrHtXxWLTaR7NQHKpc5tSM4L6epaf0TCZnYKL_K01Vx-L_9S_Y0MXKe15D-JD5wNvMyd-B6F0Ar1dY1LLqNbRlefs0xp55_btjd0UO4nxNVLyrQFgcNycshHgmbGnF_cvtuS_cxUqw',
              },
              {
                title: 'Maqueta Arquitectónica',
                description:
                  'Maqueta de alta definición para presentación de proyecto inmobiliario. Material: Resina para máximo detalle.',
                image:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBzex9XQFz-MF33BcpOh6NzkTCfgnZvzwuajUYM1buSP_88-Sc5vzi4_tT_Cw0ZfB0SiN-Lbo7JEQ3E70BfJ-ykKSsrdio3qsw9cddgp1pBATVRrb6XpBWCpon_zEsJEYlK-13oTrqNpcc8F59I4hl63Wtrb_xeROHsnEmSEn-PX4qGtcnHB_5ir9rvB8mPoCr5N45M-hvBJn998eGqAVwj_VZXmPrZGcwztr6X7Z1KvWeLmSvrI2uMy-KQ9tNY9PWWaGOnRxAgA9D8',
              },
              {
                title: 'Piezas Mecánicas',
                description:
                  'Fabricación de engranajes y soportes a medida para maquinaria industrial. Material: ABS de alta resistencia.',
                image:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDhoAuOEbbocbjF26hKg8LIJBTG4zx4lQ3Lg1HDj1iju0ZrDn2VVxuxTpD9ZZpgtR-Wwj16QDC8kNP-UNOdk4gkuy4uTSUyWdxqsQFFf0PNz2i_BvoN-FPilrlNxhDiiDvjrJJGI71RRBKVEnquMJjZnV7O1VQuMhGgeH5w5cEyOHcBHXfASegN2QlCZtS5uQMMAX91BxZ6KGGHW-G9lI-aQhHJ4dn_BPFRThjJoXaiDZwJZzORcJ0l9PFmxyL8oYJDlh-nrtG2zPZt',
              },
            ].map((project, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-md hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-shadow duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    alt={project.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    src={project.image}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted-light dark:text-text-muted-dark">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors duration-300" id="testimonios">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Carlos Sánchez',
                role: 'Ingeniero de Producto',
                comment:
                  'La calidad de los prototipos es excepcional. Nos ha permitido acelerar nuestro ciclo de desarrollo significativamente. ¡Totalmente recomendados!',
                avatar:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8WW9Vy75C2JFgphMqbn2TnT7rJ6-SxApM7Zo0bfw5wKKbEpyFDH8Vya1HKj-tUlpuRgMaV6y_6TE0WXcfSNlVzISZUOZN_x9I_mHxZXPuRkDZhglzQg9D89Rj2GR2Cg48rghxzvBCnxtViwXHEEc9buaibIOvoRzeHaxgEQrpF339-R7x56n2d51RBnKyIHuXS1HIStU-pA8EfmVlPY5JZ_IaDWnVTN-VSWFR8IzVmjk9YCYqeftmE2JpRtJwnkSDwRuNOC5OlY1',
              },
              {
                name: 'Laura Gómez',
                role: 'Arquitecta',
                comment:
                  'El nivel de detalle en las maquetas es impresionante. Impr3Decible entendió perfectamente nuestras necesidades y entregó un trabajo impecable a tiempo.',
                avatar:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCjBhqi7FWjvn7J8ZM8EHS7G1QfN-Yq7kS48fyYc0SMmW1knzcuhlI5bsFhqDLOuHUFPdfW8NITBFwbgtCKJvPwzcNzDh1esfxGwDD96gfJY4g283-yq9Je_Ukiz27509_Ra279DtEbZE436KufcoJ5OVCq-eJb8Z2TQqNC9s2g0Kma1EP9kiHFwSP23HaBW-nQ0HTWjf-utkXLShHcSigVGFuQizpv5_jS_weN539AF2U45yJpKuve7YUN65XhWLj9lgQMqv_-urY0',
              },
              {
                name: 'Miguel Hernández',
                role: 'Hobbista',
                comment:
                  'Excelente servicio y atención al cliente. Me ayudaron a optimizar mi modelo para impresión y el resultado final fue perfecto. ¡Volveré a imprimir con ellos!',
                avatar:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBfZm0eq_ZiQGSUd7bdAxarEGxAKmE-KRNYeLfAoX3gagqgxX3a7P5hLLHmzBcu-qn8LrAOtlyow77pLh-0q8oKf3PkaJK5OCBHosa2JHW2YWU2Ktbbvcax71V1kxsG5eLiMFBl3ZwrRrzgsQzO1Jatvt69l9l2vVZVwjZGj3_Ed6XxbbMIRN_kdCRQ-WTzUX2IHCIz_zrGCeq4Ci0W5Qny800rBNh1lUttl6LpJiSPn1aXmWmAgHz-U2Za6i1_DMXtXcoJMrxhbC1O',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-surface-light dark:bg-surface-dark p-8 rounded-lg border border-border-light dark:border-border-dark"
              >
                <div className="flex items-center gap-4">
                  <img
                    alt={`Foto de perfil de ${testimonial.name}`}
                    className="w-12 h-12 rounded-full object-cover"
                    src={testimonial.avatar}
                  />
                  <div>
                    <p className="font-bold text-text-light dark:text-text-dark">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-text-muted-light dark:text-text-muted-dark italic">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
