import { useEffect } from 'react'

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-primary'
  const icon = type === 'success' ? 'check_circle' : 'add_shopping_cart'

  return (
    <div className="fixed top-20 right-4 z-50 toast-enter">
      <div
        className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] transform transition-all duration-500 hover:scale-105`}
      >
        <span className="material-symbols-outlined">{icon}</span>
        <span className="font-semibold">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto hover:bg-white/20 rounded-full p-1 transition-colors duration-300"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>
    </div>
  )
}

export default Toast
