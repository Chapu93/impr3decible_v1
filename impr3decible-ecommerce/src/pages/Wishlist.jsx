import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useSEO } from '../hooks/useSEO'

const Wishlist = () => {
  useSEO({
    title: 'Mis Favoritos',
    description: 'Tu lista de productos favoritos de impresión 3D. Guarda tus productos preferidos para comprarlos más tarde.',
    keywords: 'favoritos, lista de deseos, wishlist',
    url: window.location.origin + '/favoritos'
  })
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = (product) => {
    addToCart(product)
    showToast(`${product.name} añadido al carrito`, 'success')
  }

  const handleRemove = (productId, productName) => {
    removeFromWishlist(productId)
    showToast(`${productName} eliminado de favoritos`, 'info')
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
          <span className="material-symbols-outlined text-8xl text-text-muted-light dark:text-text-muted-dark mb-6">
            favorite_border
          </span>
          <h2 className="text-3xl font-bold mb-4 text-text-light dark:text-text-dark">
            Tu lista de favoritos está vacía
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark mb-8">
            Explora nuestros productos y añade tus favoritos haciendo clic en el corazón ❤️
          </p>
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 hover:scale-105 transition-all duration-500"
          >
            <span className="material-symbols-outlined">search</span>
            Explorar Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">
          Mis Favoritos ❤️
        </h1>
        <p className="mt-2 text-text-muted-light dark:text-text-muted-dark">
          Tienes {wishlistItems.length} {wishlistItems.length === 1 ? 'producto' : 'productos'} en tu lista de deseos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product, index) => (
          <div
            key={product.id}
            className="bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            <div className="relative">
              <Link to={`/producto/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </Link>
              <button
                onClick={() => handleRemove(product.id, product.name)}
                className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-red-50 dark:hover:bg-red-900/50 transition-all duration-300 hover:scale-110"
                aria-label="Eliminar de favoritos"
              >
                <span className="material-symbols-outlined text-red-500 text-xl">
                  favorite
                </span>
              </button>
            </div>

            <div className="p-4">
              <Link to={`/producto/${product.id}`}>
                <h3 className="font-bold text-lg mb-2 text-text-light dark:text-text-dark hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`material-symbols-outlined text-sm ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-xs text-text-muted-light dark:text-text-muted-dark">
                  ({product.reviews})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 hover:scale-105 transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-lg">shopping_cart</span>
                  Añadir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center animate-fade-in-up animation-delay-300">
        <Link
          to="/productos"
          className="inline-flex items-center gap-2 bg-surface-light dark:bg-surface-dark font-bold py-3 px-8 rounded-lg border border-border-light dark:border-border-dark hover:border-primary hover:text-primary transition-all duration-500 hover:scale-105"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Seguir Explorando
        </Link>
      </div>
    </div>
  )
}

export default Wishlist
