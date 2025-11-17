import { useState } from 'react'

const ImageZoom = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false)

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
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation()
              setIsZoomed(false)
            }}
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined text-white text-3xl">close</span>
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain animate-scale-in rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageZoom
