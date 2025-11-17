import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('relevance')

  let filteredProducts = products

  // Filter by category
  if (selectedCategory !== 'Todas') {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    )
  }

  // Filter by search term
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar - Filters */}
        <aside className="w-full lg:w-1/4">
          <h2 className="text-xl font-bold mb-6 text-text-light dark:text-text-dark">Filtros</h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold mb-4 text-text-light dark:text-text-dark">
                Categorías
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`text-left w-full ${
                        selectedCategory === category
                          ? 'text-primary font-semibold'
                          : 'text-text-muted-light dark:text-text-muted-dark hover:text-primary'
                      } transition-colors`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
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
              </select>
            </div>
          </div>

          {sortedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
