import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'España',
  })

  const [orderPlaced, setOrderPlaced] = useState(false)

  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/carrito')
    return null
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica de procesamiento del pedido
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center py-16 bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark">
          <span className="material-symbols-outlined text-8xl text-green-500">check_circle</span>
          <h2 className="mt-6 text-3xl font-bold text-text-light dark:text-text-dark">
            ¡Pedido Realizado con Éxito!
          </h2>
          <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">
            Gracias por tu compra. Recibirás un correo de confirmación pronto.
          </p>
          <div className="mt-8 space-x-4">
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Volver al Inicio
            </button>
            <button
              onClick={() => navigate('/productos')}
              className="bg-surface-light dark:bg-surface-dark font-bold py-3 px-8 rounded-lg border border-border-light dark:border-border-dark hover:border-primary hover:text-primary transition-all"
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    )
  }

  const subtotal = getCartTotal()
  const shipping = 10.0
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
                Información de Contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
                  >
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
                  >
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
                  >
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
                Dirección de Envío
              </h2>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
                  >
                    Dirección *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
                    >
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
                    >
                      Código Postal *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
                    >
                      País *
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                    >
                      <option value="España">España</option>
                      <option value="México">México</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Chile">Chile</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Realizar Pedido
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
              Resumen del Pedido
            </h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex gap-3 text-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold text-text-light dark:text-text-dark">
                      {item.name}
                    </p>
                    <p className="text-text-muted-light dark:text-text-muted-dark">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-text-light dark:text-text-dark">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-3 border-t border-border-light dark:border-border-dark pt-4">
              <div className="flex justify-between text-text-muted-light dark:text-text-muted-dark">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-muted-light dark:text-text-muted-dark">
                <span>Envío</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-text-light dark:text-text-dark border-t border-border-light dark:border-border-dark pt-3">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
