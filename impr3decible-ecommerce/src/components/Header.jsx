import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const { getCartItemsCount } = useCart()
  const cartCount = getCartItemsCount()

  return (
    <header className="bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border-light dark:border-border-dark transition-colors duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img
              alt="Impr3Decible logo icon"
              className="h-8 w-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0UYA2cN4KvwU6joSctQkDmlQY9mWwsLypKPjDAK0-0ge30Eqi6PaiN4jT6Qe83ZDFaMH1OWMhiy55EFXeRBUpw8KQNknxcZU27Gy9FgJ-McsWxqDbzDtn5xm1U8z2o85WTYbRrPVIONSPrrcpt1SXG7rU5YCpqr7UVFA-GX1MjFNN0KimMZIASUdUGAz2j-1wAADxN3fVb5jdN2rVMPubaE3ASQQNFbqRtjWI68JeZXkl2K7NSbUvb-Gd1ett8wKL41xwlDcotYak"
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

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-semibold text-text-light dark:text-text-dark hover:text-primary transition-colors duration-300"
            >
              Inicio
            </Link>
            <Link
              to="/productos"
              className="text-sm font-semibold text-text-light dark:text-text-dark hover:text-primary transition-colors duration-300"
            >
              Productos
            </Link>
            <a
              href="#proyectos"
              className="text-sm font-semibold text-text-light dark:text-text-dark hover:text-primary transition-colors duration-300"
            >
              Proyectos
            </a>
            <a
              href="#testimonios"
              className="text-sm font-semibold text-text-light dark:text-text-dark hover:text-primary transition-colors duration-300"
            >
              Testimonios
            </a>
            <Link
              to="/cotizar"
              className="text-sm font-semibold text-text-light dark:text-text-dark hover:text-primary transition-colors duration-300"
            >
              Cotizar
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/carrito"
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="material-symbols-outlined text-gray-700 dark:text-gray-300">
                shopping_cart
              </span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === 'light' ? (
                <span className="material-symbols-outlined text-gray-700">dark_mode</span>
              ) : (
                <span className="material-symbols-outlined text-gray-300">light_mode</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
