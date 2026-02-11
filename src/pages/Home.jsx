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
  Rice: '/images/basmati-rice.png',
  Confectionery: '/images/confectionery.png',
  Spices: '/images/spices.png',
  Agricultural: '/images/agricultural-products.png',
}

const Home = ({ products, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('All')
  const [query, setQuery] = useState('')
  const productsRef = useRef(null)
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
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : false
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

  const galleryItems = products.slice(0, 6)
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedSubcategory('All')
    setQuery('')

    const target = filtersRef.current || productsRef.current
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <main>
        <section className="hero">
          <div className="container hero-content">
            <div className="hero-text">
              <div>
                <p className="eyebrow">Reliable sourcing. Consistent quality.</p>
                <h1>
                  Pure, fresh, and{' '}
                  <span className="title-accent">export-ready</span> products for
                  global buyers.
                </h1>
                <p className="hero-copy">
                  We supply garlic, red chilli, onion, makhana, rice, and a wide
                  range of spices with strict quality control and export
                  ready dispatch.
                </p>
              </div>
              <div className="hero-actions">
                <a className="btn primary" href="#products">
                  Explore Products
                </a>
                <a className="btn ghost" href="#contact">
                  Request a Quote
                </a>
              </div>
              <div className="hero-stats">
                <div className="stat-card">
                  <p className="stat-value">24h</p>
                  <p className="stat-label">Quote response</p>
                </div>
                <div className="stat-card">
                  <p className="stat-value">Custom</p>
                  <p className="stat-label">Packaging options</p>
                </div>
                <div className="stat-card">
                  <p className="stat-value">On-time</p>
                  <p className="stat-label">Dispatch support</p>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <img src="/images/spices.png" alt="Export spice assortment" />
              <div className="hero-badges">
                <span className="hero-badge">Export-ready lots</span>
                <span className="hero-badge secondary">Custom packaging</span>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-grid">
            <div className="trust-item">
              <span className="trust-icon">QC</span>
              <div>
                <p className="trust-title">Quality checked</p>
                <p className="trust-copy">Consistent grading before dispatch.</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">PK</span>
              <div>
                <p className="trust-title">Custom packing</p>
                <p className="trust-copy">Flexible sizes and branding.</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">GL</span>
              <div>
                <p className="trust-title">Global supply</p>
                <p className="trust-copy">Export-ready lots, on time.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="section section-products" ref={productsRef}>
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">Our products</p>
                <h2>
                  {selectedCategory
                    ? `${selectedCategory} products`
                    : 'Explore our export catalog'}
                </h2>
              </div>
              <p className="section-subtitle">
                {selectedCategory
                  ? `Select a subcategory or search within ${selectedCategory}.`
                  : 'Pricing depends on grade, packaging, and shipment size. Contact us for the latest quote.'}
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
                  onClick={() => handleCategorySelect(category)}
                >
                  <img
                    src={CATEGORY_IMAGES[category]}
                    alt={`${category} category`}
                  />
                  <div className="category-card-body">
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
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              {selectedCategory ? (
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
              ) : null}
            </div>
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <>
                {selectedCategory ? (
                  <div className="product-grid">
                    {filteredProducts.length ? (
                      filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))
                    ) : (
                      <p>No matching products found.</p>
                    )}
                  </div>
                ) : (
                  <p className="product-hint">
                    Select a category to view products.
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        <section className="section light" id="process">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">How we work</p>
                <h2>From sourcing to shipment</h2>
              </div>
              <p className="section-subtitle">
                Share your requirements and destination. We handle grading,
                packing, and shipment readiness with transparent updates.
              </p>
            </div>
            <div className="step-grid">
              <div className="step-card">
                <p className="step-number">01</p>
                <h3>Requirement & sampling</h3>
                <p>We confirm specs, grade, and packaging preferences.</p>
              </div>
              <div className="step-card">
                <p className="step-number">02</p>
                <h3>Quality checks</h3>
                <p>Each lot is inspected for size, moisture, and purity.</p>
              </div>
              <div className="step-card">
                <p className="step-number">03</p>
                <h3>Dispatch & logistics</h3>
                <p>We manage packing, labeling, and shipment scheduling.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section accent">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">Service promise</p>
                <h2>Built for export partnerships</h2>
              </div>
            </div>
            <div className="feature-grid">
              <div className="feature-card">
                <span className="feature-icon">QC</span>
                <h3>Quality assured</h3>
                <p>Each lot is checked for size, moisture, and purity.</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">PK</span>
                <h3>Flexible packaging</h3>
                <p>Choose from standard bags or custom branded packing.</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">SUP</span>
                <h3>Consistent supply</h3>
                <p>Planned sourcing ensures steady volumes for buyers.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">Gallery</p>
                <h2>Export-ready lots</h2>
              </div>
              <p className="section-subtitle">
                Representative images from our export catalog and packing.
              </p>
            </div>
            <div className="gallery-grid">
              {galleryItems.length ? (
                galleryItems.map((product) => (
                  <figure className="gallery-item" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <figcaption>{product.name}</figcaption>
                  </figure>
                ))
              ) : (
                <p>Gallery items will appear once products are loaded.</p>
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">Contact us</p>
                <h2>Send your requirement</h2>
              </div>
              <p className="section-subtitle">
                Have a question or need a quote? Get in touch — we are here to
                help.
              </p>
            </div>
            <div className="contact-grid">
              <form
                className="contact-form"
                action="mailto:info@samarthoverseasindia.com"
              >
                <label>
                  Name
                  <input type="text" name="name" placeholder="Your name" />
                </label>
                <label>
                  Email
                  <input type="email" name="email" placeholder="your@email.com" />
                </label>
                <label className="full">
                  Message
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell us your requirement"
                  ></textarea>
                </label>
                <button className="btn primary" type="submit">
                  Send Message
                </button>
              </form>
              <div className="contact-details">
                <div>
                  <p className="contact-label">Email</p>
                  <a href="mailto:info@samarthoverseasindia.com">
                    info@samarthoverseasindia.com
                  </a>
                </div>
                <div>
                  <p className="contact-label">Phone</p>
                  <a href="tel:+919826015502">+91 98260 15502</a>
                </div>
                <div>
                  <p className="contact-label">Business inquiry</p>
                  <p>Reply within 24 hours with pricing details.</p>
                </div>
                <div className="detail-actions">
                  <a
                    className="btn primary"
                    href="mailto:info@samarthoverseasindia.com"
                  >
                    Send requirement
                  </a>
                  <a className="btn ghost" href="tel:+919826015502">
                    Call now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="cta-band">
        <div className="container cta-content">
          <div>
            <p className="eyebrow">Ready to export?</p>
            <h2>Tell us your requirement today.</h2>
            <p>
              Share grade, packaging, and destination port. We will confirm
              availability with the latest quote.
            </p>
          </div>
          <div className="cta-actions">
            <a
              className="btn primary"
              href="mailto:info@samarthoverseasindia.com"
            >
              Email requirement
            </a>
            <a className="btn ghost" href="tel:+919826015502">
              Call now
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
