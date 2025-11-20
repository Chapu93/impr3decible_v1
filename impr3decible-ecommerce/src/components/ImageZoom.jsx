import { useState, useEffect } from 'react'

const ImageZoom = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false)

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isZoomed])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isZoomed])

  const handleClose = (e) => {
    e?.stopPropagation()
    setIsZoomed(false)
  }

  return (
    <>
      <div
        className="cursor-zoom-in relative overflow-hidden rounded-lg"
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
          <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
        </div>
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de la imagen"
        >
          <button
            className="absolute top-6 right-6 p-4 bg-primary hover:bg-orange-600 rounded-full transition-all duration-300 z-[10000] shadow-2xl hover:scale-110"
            onClick={handleClose}
            aria-label="Cerrar (ESC)"
            type="button"
          >
            <span className="material-symbols-outlined text-white text-4xl">close</span>
          </button>
          
          <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-2 rounded-lg text-sm z-[10000]">
            Click en cualquier lugar o presiona ESC para cerrar
          </div>

          <img
            src={src}
            alt={alt}
            className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain animate-scale-in rounded-lg shadow-2xl cursor-pointer"
            onClick={handleClose}
          />
        </div>
      )}
    </>
  )
}

export default ImageZoom
