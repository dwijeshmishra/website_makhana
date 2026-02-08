import ProductCard from '../components/ProductCard.jsx'

const Home = ({ products, loading }) => {
  const galleryItems = products.slice(0, 6)

  return (
    <>
      <main>
        <section className="hero">
          <div className="container hero-content">
            <div className="hero-text">
              <div>
                <p className="eyebrow">Reliable sourcing. Consistent quality.</p>
                <h1>Pure, fresh, and export-ready products for global buyers.</h1>
                <p className="hero-copy">
                  We supply garlic, red chilli, onion, makhana, rice, and a wide
                  range of spices with strict quality control and export
                  documentation support.
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
                  <p className="stat-value">Export</p>
                  <p className="stat-label">Documentation help</p>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <img src="/images/spices.png" alt="Export spice assortment" />
              <div className="hero-badge">Export-ready lots</div>
              <div className="hero-badge secondary">Custom packaging</div>
            </div>
          </div>
        </section>

        <section id="products" className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">Our products</p>
                <h2>Explore our export catalog</h2>
              </div>
              <p className="section-subtitle">
                Pricing depends on grade, packaging, and shipment size. Contact
                us for the latest quote.
              </p>
            </div>
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
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
                packing, and export documentation with transparent updates.
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
                <h3>Dispatch & documentation</h3>
                <p>We manage packing, labeling, and export paperwork.</p>
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
                <span className="feature-icon">DOC</span>
                <h3>Documentation support</h3>
                <p>We help with export documentation and compliance.</p>
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
          <div className="container contact-card">
            <div>
              <p className="eyebrow">Contact us</p>
              <h2>Get pricing and MOQ details</h2>
              <p>
                Send your requirements and destination port. Our team will share
                the latest quote and availability.
              </p>
              <div className="contact-highlights">
                <div>
                  <p className="highlight-title">Fast response</p>
                  <p>Quotes within 24 hours for standard inquiries.</p>
                </div>
                <div>
                  <p className="highlight-title">Export support</p>
                  <p>We assist with documents and compliance.</p>
                </div>
              </div>
            </div>
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
                <a className="btn primary" href="mailto:info@samarthoverseasindia.com">
                  Send requirement
                </a>
                <a className="btn ghost" href="tel:+919826015502">
                  Call now
                </a>
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
            <a className="btn primary" href="mailto:info@samarthoverseasindia.com">
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
