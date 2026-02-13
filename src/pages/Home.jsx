import { useEffect, useState } from 'react'

const HERO_SLIDES = [
  {
    title: 'Export-ready rice lots',
    description: 'Basmati, non-basmati, and sella options for bulk buyers.',
    image: '/images/basmati-rice.webp',
    badge: 'Rice',
  },
  {
    title: 'Whole spices for global buyers',
    description: 'Chilli, coriander, garlic, oregano, and more.',
    image: '/images/spices.webp',
    badge: 'Spices',
  },
  {
    title: 'Confectionery supply',
    description: 'Candy, lollipop, and jelly assortments on request.',
    image: '/images/confectionery.webp',
    badge: 'Confectionery',
  },
]

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0)

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
                <a className="btn primary" href="/products">
                  Explore Products
                </a>
                <a className="btn ghost" href="/contact">
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
              <div className="hero-slider">
                {HERO_SLIDES.map((slide, index) => (
                  <div
                    key={slide.title}
                    className={`hero-slide ${
                      index === activeSlide ? 'active' : ''
                    }`}
                    aria-hidden={index !== activeSlide}
                  >
                    <img src={slide.image} alt={slide.title} />
                    <span className="hero-slide-badge">{slide.badge}</span>
                    <div className="hero-slide-content">
                      <p className="hero-slide-title">{slide.title}</p>
                      <p className="hero-slide-copy">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hero-dots">
                {HERO_SLIDES.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    className={`hero-dot ${index === activeSlide ? 'active' : ''}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip section-divider">
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

        <section className="section light section-divider" id="process">
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

        <section className="section accent section-divider">
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
              href="/contact"
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
