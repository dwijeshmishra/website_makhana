import { useMemo, useRef, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'

const CATEGORY_ORDER = ['Rice', 'Confectionery', 'Spices', 'Agricultural']

const SUBCATEGORY_ORDER = {
  Rice: ['Basmati', 'Non-Basmati', 'Sella'],
  Confectionery: ['Candy', 'Lollipop', 'Jelly'],
  Spices: [
    'Chilli',
    'Coriander',
    'Garlic',
    'Oregano',
    'Seasoning Herbs',
    'Whole Spices',
  ],
  Agricultural: ['Onion', 'Makhana', 'Other'],
}

const CATEGORY_IMAGES = {
  Rice: '/images/basmati-rice.webp',
  Confectionery: '/images/confectionery.webp',
  Spices: '/images/spices.webp',
  Agricultural: '/images/agricultural-products.webp',
}

const CATEGORY_ICONS = {
  Rice: 'RC',
  Confectionery: 'CF',
  Spices: 'SP',
  Agricultural: 'AG',
}

const Products = ({ products, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_ORDER[0])
  const [selectedSubcategory, setSelectedSubcategory] = useState('All')
  const [query, setQuery] = useState('')
  const filtersRef = useRef(null)
  const categories = CATEGORY_ORDER

  const subcategories = useMemo(() => {
    const available = new Set(
      products
        .filter((product) => product.category === selectedCategory)
        .map((product) => product.subcategory)
        .filter(Boolean),
    )
    const ordered = SUBCATEGORY_ORDER[selectedCategory] || []
    const result = ordered.filter((item) => available.has(item))
    available.forEach((item) => {
      if (!result.includes(item)) {
        result.push(item)
      }
    })
    return result
  }, [products, selectedCategory])

  const subcategoryTabs = useMemo(() => {
    return ['All', ...subcategories]
  }, [subcategories])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = product.category === selectedCategory
      const matchesSubcategory =
        selectedSubcategory === 'All' ||
        product.subcategory === selectedSubcategory
      const searchable = [
        product.name,
        product.summary,
        product.category,
        product.subcategory,
        product.tags?.join(' '),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const matchesQuery =
        normalizedQuery.length === 0 || searchable.includes(normalizedQuery)
      return matchesCategory && matchesSubcategory && matchesQuery
    })
  }, [products, selectedCategory, selectedSubcategory, query])

  const categoryCounts = useMemo(() => {
    return products.reduce((acc, product) => {
      const category = product.category
      if (!category) {
        return acc
      }
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {})
  }, [products])

  return (
    <main>
      <section className="section section-products">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Our products</p>
              <h2>{selectedCategory} products</h2>
            </div>
            <p className="section-subtitle">
              Select a subcategory or search within {selectedCategory}.
            </p>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-card ${
                  category === selectedCategory ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedCategory(category)
                  setSelectedSubcategory('All')
                  setQuery('')
                  if (filtersRef.current) {
                    filtersRef.current.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }
                }}
              >
                <img src={CATEGORY_IMAGES[category]} alt={`${category} category`} />
                <div className="category-card-body">
                  <span className="category-icon">{CATEGORY_ICONS[category]}</span>
                  <div>
                    <h3>{category}</h3>
                    <p>Explore {category.toLowerCase()} products</p>
                    <span className="category-link">View category →</span>
                  </div>
                  <span className="category-pill">
                    {categoryCounts[category] || 0} items
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="product-toolbar" ref={filtersRef}>
            <div className="toolbar-row">
              <div className="category-tabs">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`chip ${
                      category === selectedCategory ? 'active' : ''
                    }`}
                    onClick={() => {
                      setSelectedCategory(category)
                      setSelectedSubcategory('All')
                      setQuery('')
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="toolbar-row">
              <div className="subcategory-tabs">
                {subcategoryTabs.map((subcategory) => (
                  <button
                    key={subcategory}
                    type="button"
                    className={`chip ${
                      subcategory === selectedSubcategory ? 'active' : ''
                    }`}
                    onClick={() => setSelectedSubcategory(subcategory)}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search products"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <p className="product-count">
                Showing {filteredProducts.length} product
                {filteredProducts.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="product-grid">
              {filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No matching products found.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Products
