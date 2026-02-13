const Gallery = ({ products, loading }) => {
  const galleryItems = products.slice(0, 12)

  return (
    <main>
      <section className="section section-divider">
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
            {loading ? (
              <p>Loading gallery...</p>
            ) : galleryItems.length ? (
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
    </main>
  )
}

export default Gallery
