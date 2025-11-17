import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ImageZoom from '../components/ImageZoom'
import { getProductById, products } from '../data/products'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const [selectedMaterial, setSelectedMaterial] = useState(product?.material[0] || '')
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
          Producto no encontrado
        </h2>
        <Link to="/productos" className="text-primary hover:underline mt-4 inline-block">
          Volver a productos
        </Link>
      </div>
    )
  }

  const relatedProducts = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity, { material: selectedMaterial, color: selectedColor })
    navigate('/carrito')
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="aspect-square w-full bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden border border-border-light dark:border-border-dark">
            <ImageZoom src={product.image} alt={product.name} />
          </div>
          <p className="text-xs text-center text-text-muted-light dark:text-text-muted-dark">
            <span className="material-symbols-outlined text-sm align-middle">info</span>
            Haz clic en la imagen para ampliar
          </p>
        </div>

        {/* Product Info */}
        <div className="animate-fade-in-up animation-delay-200">
          <div className="flex items-start justify-between">
            <h1 className="text-4xl font-bold tracking-tight text-text-light dark:text-text-dark flex-1">
              {product.name}
            </h1>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-full transition-all duration-300 ${
                isInWishlist(product.id)
                  ? 'bg-primary text-white scale-110'
                  : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:bg-primary hover:text-white'
              }`}
              aria-label={isInWishlist(product.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <span className="material-symbols-outlined">
                {isInWishlist(product.id) ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-xl">
                  {i < Math.floor(product.rating) ? 'star' : i < product.rating ? 'star_half' : 'star'}
                </span>
              ))}
              <span className="ml-2 text-sm text-text-muted-light dark:text-text-muted-dark">
                ({product.reviews} opiniones)
              </span>
            </div>
          </div>
          <p className="mt-6 text-text-muted-light dark:text-text-muted-dark leading-relaxed">
            {product.longDescription || product.description}
          </p>

          <div className="mt-8 space-y-6">
            {/* Material Selection */}
            <div>
              <h3 className="text-sm font-semibold text-text-light dark:text-text-dark">
                Material
              </h3>
              <div className="mt-2 flex gap-3">
                {product.material.map((material) => (
                  <button
                    key={material}
                    onClick={() => setSelectedMaterial(material)}
                    className={`px-4 py-2 rounded-md text-sm border-2 transition-colors ${
                      selectedMaterial === material
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-border-light dark:border-border-dark text-text-muted-light dark:text-text-muted-dark hover:border-primary hover:text-primary'
                    }`}
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-semibold text-text-light dark:text-text-dark">Color</h3>
              <div className="mt-2 flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md text-sm border transition-colors ${
                      selectedColor === color
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-border-light dark:border-border-dark text-text-muted-light dark:text-text-muted-dark hover:border-primary hover:text-primary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-sm font-semibold text-text-light dark:text-text-dark">
                Cantidad
              </h3>
              <div className="mt-2 flex items-center border border-border-light dark:border-border-dark rounded-md w-fit bg-surface-light dark:bg-surface-dark">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center bg-transparent border-x border-border-light dark:border-border-dark focus:ring-0 focus:outline-none text-text-light dark:text-text-dark"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">add_shopping_cart</span>
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
            Productos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/producto/${relatedProduct.id}`}
                className="group flex flex-col overflow-hidden rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-shadow duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    src={relatedProduct.image}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
                    {relatedProduct.name}
                  </h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-md font-bold text-primary">
                      ${relatedProduct.price.toFixed(2)}
                    </span>
                    <span className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark hover:text-primary">
                      Ver más
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetail
