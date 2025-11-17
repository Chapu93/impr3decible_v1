import { useState } from 'react'

const ImageZoom = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <>
      <div
        className="cursor-zoom-in relative overflow-hidden"
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
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
            onClick={() => setIsZoomed(false)}
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined text-white text-3xl">close</span>
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

export default ImageZoom
