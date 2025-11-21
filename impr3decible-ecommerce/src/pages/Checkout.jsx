import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useSEO } from '../hooks/useSEO'

const Checkout = () => {
  useSEO({
    title: 'Finalizar Compra',
    description: 'Completa tu pedido de forma segura. Introduce tus datos de envío y realiza el pago.',
    keywords: 'checkout, pago, finalizar compra',
    url: window.location.origin + '/checkout'
  })
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

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [orderPlaced, setOrderPlaced] = useState(false)

  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/carrito')
    return null
  }

  // Validación de campos individuales
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return 'Este campo es obligatorio'
        if (value.trim().length < 2) return 'Debe tener al menos 2 caracteres'
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'Solo se permiten letras'
        return ''

      case 'email':
        if (!value.trim()) return 'El email es obligatorio'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Formato de email inválido'
        return ''

      case 'phone':
        if (!value.trim()) return 'El teléfono es obligatorio'
        const phoneClean = value.replace(/\s|-/g, '')
        if (formData.country === 'España') {
          if (!/^(\+34|0034)?[6789]\d{8}$/.test(phoneClean)) {
            return 'Formato: +34 XXX XXX XXX o 6/7/8/9XX XXX XXX'
          }
        } else if (!/^\+?[\d\s-]{9,15}$/.test(value)) {
          return 'Formato de teléfono inválido'
        }
        return ''

      case 'address':
        if (!value.trim()) return 'La dirección es obligatoria'
        if (value.trim().length < 5) return 'La dirección es demasiado corta'
        return ''

      case 'city':
        if (!value.trim()) return 'La ciudad es obligatoria'
        if (value.trim().length < 2) return 'El nombre de la ciudad es muy corto'
        return ''

      case 'zipCode':
        if (!value.trim()) return 'El código postal es obligatorio'
        if (formData.country === 'España') {
          if (!/^\d{5}$/.test(value)) return 'Formato: 5 dígitos (ej: 28001)'
        } else if (!/^[\d\w\s-]{3,10}$/.test(value)) {
          return 'Formato de código postal inválido'
        }
        return ''

      default:
        return ''
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    const error = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar todos los campos
    const newErrors = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })

    // Marcar todos los campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)

    // Si hay errores, no enviar
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Scroll al primer error
      const firstErrorField = Object.keys(newErrors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.focus()
      }
      return
    }

    // Si todo es válido, procesar el pedido
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center py-16 bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark animate-scale-in">
          <span className="material-symbols-outlined text-8xl text-green-500">check_circle</span>
          <h2 className="mt-6 text-3xl font-bold text-text-light dark:text-text-dark">
            ¡Pedido Realizado con Éxito!
          </h2>
          <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">
            Gracias por tu compra, {formData.firstName}. Recibirás un correo de confirmación en {formData.email} pronto.
          </p>
          <div className="mt-8 space-x-4">
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-all duration-500 hover:scale-105"
            >
              Volver al Inicio
            </button>
            <button
              onClick={() => navigate('/productos')}
              className="bg-surface-light dark:bg-surface-dark font-bold py-3 px-8 rounded-lg border border-border-light dark:border-border-dark hover:border-primary hover:text-primary transition-all duration-500 hover:scale-105"
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

  const InputField = ({ label, name, type = 'text', ...props }) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
      >
        {label} *
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className={`w-full rounded-lg border bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary text-text-light dark:text-text-dark transition-all duration-300 ${
          touched[name] && errors[name]
            ? 'border-red-500 focus:border-red-500'
            : 'border-border-light dark:border-border-dark focus:border-primary'
        }`}
        {...props}
      />
      {touched[name] && errors[name] && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1 animate-fade-in">
          <span className="material-symbols-outlined text-sm">error</span>
          {errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8 animate-fade-in-up">
        Finalizar Compra
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 animate-fade-in-up animation-delay-200">
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Contact Information */}
            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Información de Contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Nombre" name="firstName" />
                <InputField label="Apellidos" name="lastName" />
                <InputField label="Email" name="email" type="email" placeholder="ejemplo@correo.com" />
                <InputField
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  placeholder={formData.country === 'España' ? '+34 612 345 678' : '+XX XXX XXX XXX'}
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                Dirección de Envío
              </h2>
              <div className="space-y-6">
                <InputField
                  label="Dirección"
                  name="address"
                  placeholder="Calle, número, piso, puerta"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField label="Ciudad" name="city" placeholder="Madrid" />
                  <InputField
                    label="Código Postal"
                    name="zipCode"
                    placeholder={formData.country === 'España' ? '28001' : 'CP'}
                  />
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
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
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
              className="w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:bg-orange-600 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/50 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              Confirmar y Pagar ${total.toFixed(2)}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 animate-fade-in-up animation-delay-300">
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 sticky top-24 shadow-md">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">receipt_long</span>
              Resumen del Pedido
            </h2>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex gap-3 text-sm pb-3 border-b border-border-light dark:border-border-dark last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    loading="lazy"
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
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-200 flex items-start gap-2">
                <span className="material-symbols-outlined text-lg">info</span>
                <span>Todos los campos son obligatorios para procesar tu pedido de forma segura.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
