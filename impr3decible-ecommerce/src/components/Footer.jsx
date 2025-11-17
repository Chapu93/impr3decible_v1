import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark transition-colors duration-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <Link to="/" className="flex items-center justify-center md:justify-start gap-3">
              <img
                alt="Impr3Decible logo icon"
                className="h-8 w-auto"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvOmsiVZjUF6WDLcvPVmXrNe5YLhTgNqQVGRU2PGVfrs8raPrF5HDMQtRgJ3Eq8LL0f6kPatVBwyQqZUkWRUdWfEDN1kMwGDhFiS2hWO_iiG7IWxz83jpQc0Ou-sz2rnPBzAGXyzh-515qD79Oqc4blZDjFK9Dwv9OuuvQmNuqILowmtAqmWrDogokaQsuY2i19_FC2aLyjPvsBTfpPqFME3jsvYqpnUoBy34PeUEBBJE3kHjev5DquQq1CwZOss-Ub13NJ0VC_EWD"
              />
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-text-light dark:text-text-dark">
                  Impr<span className="text-primary">3D</span>ecible
                </span>
                <span className="text-xs text-text-muted-light dark:text-text-muted-dark -mt-1 tracking-wider">
                  IMPRESIÓN 3D
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-text-muted-light dark:text-text-muted-dark">
              Transformando tus ideas en realidad, capa por capa.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold tracking-wider uppercase text-text-light dark:text-text-dark">
                  Navegación
                </h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link
                      to="/"
                      className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/productos"
                      className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                    >
                      Productos
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#proyectos"
                      className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                    >
                      Proyectos
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonios"
                      className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                    >
                      Testimonios
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/cotizar"
                      className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                    >
                      Cotizar
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold tracking-wider uppercase text-text-light dark:text-text-dark">
                  Legal
                </h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                    >
                      Política de Privacidad
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                    >
                      Términos de Servicio
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold tracking-wider uppercase text-text-light dark:text-text-dark">
                  Contacto
                </h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <a
                      href="mailto:contacto@impr3decible.com"
                      className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                    >
                      contacto@impr3decible.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+34000000000"
                      className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                    >
                      +34 000 000 000
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border-light dark:border-border-dark text-center text-sm text-text-muted-light dark:text-text-muted-dark">
          <p>© 2024 Impr3Decible. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
