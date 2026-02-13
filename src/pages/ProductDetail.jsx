import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'

const ProductDetail = ({ products, loading }) => {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)
  const related = products.filter((item) => item.id !== id).slice(0, 3)

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <p>Loading product details...</p>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="section">
        <div className="container">
          <p className="eyebrow">Product not found</p>
          <h1>We could not find that product.</h1>
          <p>Please browse the catalog to view available items.</p>
          <Link className="btn primary" to="/#products">
            Back to catalog
          </Link>
        </div>
      </main>
    )
  }

  const image = product.image || '/images/placeholder.svg'

  return (
    <main className="section">
      <div className="container">
        <div className="product-detail">
          <div className="product-media">
            <img src={image} alt={product.name} />
          </div>
          <div>
            <p className="eyebrow">
              {product.subcategory || product.category || 'Export item'}
            </p>
            <h1>{product.name}</h1>
            <p>{product.description || product.summary}</p>
            <div className="detail-callout">
              Contact us for the latest pricing and MOQ based on grade and
              shipment size.
            </div>
            <div className="detail-meta">
              {product.category ? (
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
              ) : null}
              {product.subcategory ? (
                <p>
                  <strong>Subcategory:</strong> {product.subcategory}
                </p>
              ) : null}
              {product.origin ? (
                <p>
                  <strong>Origin:</strong> {product.origin}
                </p>
              ) : null}
              {product.packaging ? (
                <p>
                  <strong>Packaging:</strong> {product.packaging}
                </p>
              ) : null}
              {product.moq ? (
                <p>
                  <strong>MOQ:</strong> {product.moq}
                </p>
              ) : null}
              {product.tags?.length ? (
                <p>
                  <strong>Tags:</strong> {product.tags.join(', ')}
                </p>
              ) : null}
            </div>
            <div className="detail-actions">
              <a
                className="btn primary"
                href="mailto:info@samarthoverseasindia.com"
              >
                Contact for pricing
              </a>
              <Link className="btn ghost" to="/contact">
                Request quote
              </Link>
              <a className="btn ghost" href="tel:+919826015502">
                Call now
              </a>
            </div>
            <div className="detail-contact">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:info@samarthoverseasindia.com">
                  info@samarthoverseasindia.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:+919826015502">+91 98260 15502</a>
              </p>
            </div>
          </div>
        </div>

        <div className="related-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Explore more</p>
              <h2>Other export products</h2>
            </div>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetail
