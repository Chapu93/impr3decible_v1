import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-background-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-md hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-shadow duration-300"
    >
      <div className="overflow-hidden">
        <img
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          src={product.image}
        />
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
            className="bg-primary text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-orange-600 transition-colors flex items-center gap-2"
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
