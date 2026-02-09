import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const image = product.image || '/images/placeholder.svg'

  const eyebrow = product.subcategory || product.category || 'Export item'

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={image} alt={product.name} />
      </div>
      <div className="product-body">
        <p className="eyebrow">{eyebrow}</p>
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
        <p className="price-note">Contact us for pricing and MOQ</p>
        <Link className="btn primary" to={`/product/${product.id}`}>
          View details
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
