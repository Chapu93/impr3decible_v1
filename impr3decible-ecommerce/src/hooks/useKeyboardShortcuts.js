import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Solo si no está en un input o textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      // Ctrl/Cmd + K para buscar
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        navigate('/productos')
        // Focus en el search input después de un pequeño delay
        setTimeout(() => {
          const searchInput = document.querySelector('input[type="search"]')
          if (searchInput) searchInput.focus()
        }, 100)
      }

      // Ctrl/Cmd + H para ir a Home
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault()
        navigate('/')
      }

      // Ctrl/Cmd + B para ir al carrito
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        navigate('/carrito')
      }

      // Ctrl/Cmd + / para mostrar ayuda de shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        showShortcutsHelp()
      }

      // ESC para scroll to top
      if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    const showShortcutsHelp = () => {
      const shortcuts = [
        'Ctrl/Cmd + K: Buscar productos',
        'Ctrl/Cmd + H: Ir a inicio',
        'Ctrl/Cmd + B: Ver carrito',
        'Ctrl/Cmd + /: Ver atajos',
        'ESC: Ir arriba'
      ]
      alert('Atajos de teclado:\n\n' + shortcuts.join('\n'))
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [navigate])
}
