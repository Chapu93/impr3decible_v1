import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import SkeletonLoader from '../components/SkeletonLoader'
import { products, categories } from '../data/products'
import { useDebounce } from '../hooks/useDebounce'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('relevance')
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [isLoading, setIsLoading] = useState(false)
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm || selectedMaterials.length || selectedColors.length) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 300)
      return () => clearTimeout(timer)
    }
  }, [debouncedSearchTerm, selectedMaterials, selectedColors])

  let filteredProducts = products

  // Filter by category
  if (selectedCategory !== 'Todas') {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    )
  }

  // Filter by search term (debounced)
  if (debouncedSearchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  }

  // Filter by materials
  if (selectedMaterials.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.material.some(m => selectedMaterials.includes(m))
    )
  }

  // Filter by colors
  if (selectedColors.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.colors.some(c => selectedColors.includes(c))
    )
  }

  // Filter by price range
  filteredProducts = filteredProducts.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  )

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  const toggleMaterial = (material) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    )
  }

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  const allMaterials = [...new Set(products.flatMap(p => p.material))]
  const allColors = [...new Set(products.flatMap(p => p.colors))]

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar - Filters */}
        <aside className="w-full lg:w-1/4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Filtros</h2>
            {(selectedMaterials.length > 0 || selectedColors.length > 0 || selectedCategory !== 'Todas') && (
              <button
                onClick={() => {
                  setSelectedCategory('Todas')
                  setSelectedMaterials([])
                  setSelectedColors([])
                  setPriceRange([0, 100])
                }}
                className="text-sm text-primary hover:text-orange-600 transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="space-y-6 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-4">
            {/* Categorías */}
            <div>
              <h3 className="font-semibold mb-3 text-text-light dark:text-text-dark">Categorías</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`text-left w-full px-2 py-1 rounded transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materiales */}
            <div className="border-t border-border-light dark:border-border-dark pt-4">
              <h3 className="font-semibold mb-3 text-text-light dark:text-text-dark">Material</h3>
              <div className="space-y-2">
                {allMaterials.map((material) => (
                  <label key={material} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={() => toggleMaterial(material)}
                      className="h-4 w-4 rounded border-border-light dark:border-border-dark text-primary focus:ring-primary focus:ring-offset-surface-light dark:focus:ring-offset-surface-dark"
                    />
                    <span className="ml-3 text-sm text-text-muted-light dark:text-text-muted-dark group-hover:text-primary transition-colors">
                      {material}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div className="border-t border-border-light dark:border-border-dark pt-4">
              <h3 className="font-semibold mb-3 text-text-light dark:text-text-dark">Color</h3>
              <div className="flex flex-wrap gap-2">
                {allColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                      selectedColors.includes(color)
                        ? 'bg-primary text-white ring-2 ring-primary ring-offset-2 ring-offset-surface-light dark:ring-offset-surface-dark'
                        : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-muted-light dark:text-text-muted-dark hover:border-primary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Rango de Precio */}
            <div className="border-t border-border-light dark:border-border-dark pt-4">
              <h3 className="font-semibold mb-3 text-text-light dark:text-text-dark">Precio</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-text-muted-light dark:text-text-muted-dark">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full sm:max-w-xs">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-light dark:border-border-dark rounded-lg text-sm bg-surface-light dark:bg-surface-dark placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
                placeholder="Buscar productos..."
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark text-xl">
                  search
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-text-light dark:text-text-dark"
              >
                Ordenar por:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border-border-light dark:border-border-dark text-sm bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary text-text-light dark:text-text-dark"
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre</option>
                <option value="rating">Mejor Valorados</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <SkeletonLoader key={i} type="card" />
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedProducts.map((product, index) => (
                  <div key={product.id} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center text-text-muted-light dark:text-text-muted-dark">
                Mostrando {sortedProducts.length} producto(s)
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark">
                search_off
              </span>
              <p className="mt-4 text-xl font-semibold text-text-light dark:text-text-dark">
                No se encontraron productos
              </p>
              <p className="mt-2 text-text-muted-light dark:text-text-muted-dark">
                Intenta con otros términos de búsqueda o filtros
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Products
