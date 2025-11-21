import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useSEO } from '../hooks/useSEO'

const Cart = () => {
  useSEO({
    title: 'Carrito de Compra',
    description: 'Revisa y gestiona los productos en tu carrito de compra antes de finalizar tu pedido.',
    keywords: 'carrito, compra, checkout',
    url: window.location.origin + '/carrito'
  })
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center py-16">
          <span className="material-symbols-outlined text-8xl text-text-muted-light dark:text-text-muted-dark">
            shopping_cart
          </span>
          <h2 className="mt-6 text-2xl font-bold text-text-light dark:text-text-dark">
            Tu carrito está vacío
          </h2>
          <p className="mt-2 text-text-muted-light dark:text-text-muted-dark">
            Agrega algunos productos increíbles para comenzar
          </p>
          <Link
            to="/productos"
            className="mt-8 inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Explorar Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8">
        Carrito de Compras
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 flex gap-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <Link
                  to={`/producto/${item.id}`}
                  className="text-lg font-bold text-text-light dark:text-text-dark hover:text-primary"
                >
                  {item.name}
                </Link>
                <div className="mt-2 text-sm text-text-muted-light dark:text-text-muted-dark space-y-1">
                  {item.options?.material && <p>Material: {item.options.material}</p>}
                  {item.options?.color && <p>Color: {item.options.color}</p>}
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center border border-border-light dark:border-border-dark rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.options)}
                      className="px-3 py-1 text-text-muted-light dark:text-text-muted-dark hover:text-primary"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x border-border-light dark:border-border-dark text-text-light dark:text-text-dark">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.options)}
                      className="px-3 py-1 text-text-muted-light dark:text-text-muted-dark hover:text-primary"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.options)}
                    className="text-red-500 hover:text-red-600 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                    <span className="text-sm">Eliminar</span>
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
                  ${item.price.toFixed(2)} c/u
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
              Resumen del Pedido
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-text-muted-light dark:text-text-muted-dark">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-muted-light dark:text-text-muted-dark">
                <span>Envío</span>
                <span>Calculado en checkout</span>
              </div>
              <div className="border-t border-border-light dark:border-border-dark pt-4">
                <div className="flex justify-between text-xl font-bold text-text-light dark:text-text-dark">
                  <span>Total</span>
                  <span className="text-primary">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 w-full block bg-primary text-white text-center font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Proceder al Checkout
            </Link>
            <Link
              to="/productos"
              className="mt-4 w-full block text-center text-primary hover:text-orange-600 font-semibold"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
