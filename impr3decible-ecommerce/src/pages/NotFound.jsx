import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Página No Encontrada | Impr3Decible'
  }, [])

  return (
    <div className="container mx-auto px-6 py-20 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
        {/* Animación del 404 */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 dark:text-primary/10 select-none animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-8xl md:text-9xl text-primary animate-bounce">
              search_off
            </span>
          </div>
        </div>

        {/* Mensaje */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-light dark:text-text-dark">
          ¡Oops! Página No Encontrada
        </h2>
        <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-8 max-w-xl mx-auto">
          Parece que el archivo STL de esta página se corrompió. La página que buscas no existe o ha sido movida.
        </p>

        {/* Sugerencias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-primary/50"
          >
            <span className="material-symbols-outlined">home</span>
            Volver al Inicio
          </Link>
          <Link
            to="/productos"
            className="flex items-center justify-center gap-2 bg-surface-light dark:bg-surface-dark font-bold py-3 px-6 rounded-lg border border-border-light dark:border-border-dark hover:border-primary hover:text-primary transition-all duration-500 hover:scale-105"
          >
            <span className="material-symbols-outlined">inventory_2</span>
            Ver Productos
          </Link>
        </div>

        {/* Enlaces populares */}
        <div className="mt-12 p-6 bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark">
          <h3 className="text-xl font-bold mb-4 text-text-light dark:text-text-dark">
            Enlaces Populares
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/cotizar"
              className="flex flex-col items-center gap-2 p-4 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-all duration-300 hover:scale-105 group"
            >
              <span className="material-symbols-outlined text-4xl text-primary group-hover:animate-bounce">
                calculate
              </span>
              <span className="text-sm font-semibold text-text-light dark:text-text-dark">
                Cotizar Proyecto
              </span>
            </Link>
            <Link
              to="/carrito"
              className="flex flex-col items-center gap-2 p-4 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-all duration-300 hover:scale-105 group"
            >
              <span className="material-symbols-outlined text-4xl text-primary group-hover:animate-bounce">
                shopping_cart
              </span>
              <span className="text-sm font-semibold text-text-light dark:text-text-dark">
                Ver Carrito
              </span>
            </Link>
            <Link
              to="/favoritos"
              className="flex flex-col items-center gap-2 p-4 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-all duration-300 hover:scale-105 group"
            >
              <span className="material-symbols-outlined text-4xl text-primary group-hover:animate-bounce">
                favorite
              </span>
              <span className="text-sm font-semibold text-text-light dark:text-text-dark">
                Mis Favoritos
              </span>
            </Link>
          </div>
        </div>

        {/* Decoración */}
        <div className="mt-12 flex items-center justify-center gap-4 text-text-muted-light dark:text-text-muted-dark">
          <div className="h-px w-16 bg-border-light dark:bg-border-dark"></div>
          <span className="material-symbols-outlined animate-spin" style={{ animationDuration: '3s' }}>
            3d_rotation
          </span>
          <div className="h-px w-16 bg-border-light dark:bg-border-dark"></div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
