import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    toggleWishlist(product)
  }

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-background-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-md hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative overflow-hidden">
        <img
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          src={product.image}
          loading="lazy"
        />
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            inWishlist
              ? 'bg-primary text-white scale-110'
              : 'bg-white/80 dark:bg-black/50 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white'
          }`}
          aria-label={inWishlist ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <span className="material-symbols-outlined text-xl">
            {inWishlist ? 'favorite' : 'favorite_border'}
          </span>
        </button>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-text-light dark:text-text-dark">{product.name}</h3>
        <p className="mt-2 text-sm text-text-muted-light dark:text-text-muted-dark flex-grow">
          {product.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-orange-600 transition-all duration-500 hover:scale-105 hover:shadow-lg flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add_shopping_cart</span>
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
