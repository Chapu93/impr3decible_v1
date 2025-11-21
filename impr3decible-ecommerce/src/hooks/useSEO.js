import { useEffect } from 'react'

/**
 * Hook personalizado para gestionar meta tags de SEO
 * @param {Object} options - Opciones de SEO
 * @param {string} options.title - Título de la página
 * @param {string} options.description - Descripción de la página
 * @param {string} options.keywords - Palabras clave (opcional)
 * @param {string} options.image - URL de imagen para redes sociales (opcional)
 * @param {string} options.url - URL canónica (opcional)
 */
export const useSEO = ({ 
  title, 
  description, 
  keywords = '', 
  image = '',
  url = ''
}) => {
  useEffect(() => {
    // Título de la página
    const fullTitle = title ? `${title} | Impr3Decible` : 'Impr3Decible - Servicios de Impresión 3D'
    document.title = fullTitle

    // Meta description
    updateMetaTag('name', 'description', description)

    // Keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords)
    }

    // Open Graph (Facebook, LinkedIn)
    updateMetaTag('property', 'og:title', fullTitle)
    updateMetaTag('property', 'og:description', description)
    updateMetaTag('property', 'og:type', 'website')
    if (image) {
      updateMetaTag('property', 'og:image', image)
    }
    if (url) {
      updateMetaTag('property', 'og:url', url)
    }

    // Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image')
    updateMetaTag('name', 'twitter:title', fullTitle)
    updateMetaTag('name', 'twitter:description', description)
    if (image) {
      updateMetaTag('name', 'twitter:image', image)
    }

    // Canonical URL
    if (url) {
      updateLinkTag('canonical', url)
    }
  }, [title, description, keywords, image, url])
}

/**
 * Actualiza o crea un meta tag
 */
const updateMetaTag = (attribute, attributeValue, content) => {
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`)
  
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, attributeValue)
    document.head.appendChild(element)
  }
  
  element.setAttribute('content', content)
}

/**
 * Actualiza o crea un link tag
 */
const updateLinkTag = (rel, href) => {
  let element = document.querySelector(`link[rel="${rel}"]`)
  
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  
  element.setAttribute('href', href)
}
