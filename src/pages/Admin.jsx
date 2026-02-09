import { useMemo, useState } from 'react'

const emptyForm = {
  id: '',
  name: '',
  category: '',
  subcategory: '',
  origin: 'India',
  packaging: '',
  moq: '',
  summary: '',
  description: '',
  image: '',
  tags: '',
}

const isValidProductList = (data) =>
  Array.isArray(data) && data.every((item) => item && item.name)

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const Admin = ({ products, setProducts, onReset, loading }) => {
  const [formState, setFormState] = useState(emptyForm)
  const [editIndex, setEditIndex] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormState(emptyForm)
    setEditIndex(null)
  }

  const normalizeProduct = (raw) => {
    const name = raw.name.trim()
    const id = raw.id.trim() || slugify(name)
    const tags = raw.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    return {
      id,
      name,
      category: raw.category.trim(),
      subcategory: raw.subcategory.trim(),
      origin: raw.origin.trim(),
      packaging: raw.packaging.trim(),
      moq: raw.moq.trim(),
      summary: raw.summary.trim(),
      description: raw.description.trim(),
      image: raw.image.trim() || '/images/placeholder.svg',
      tags,
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formState.name.trim()) {
      window.alert('Please enter a product name.')
      return
    }

    const product = normalizeProduct(formState)
    const duplicateIndex = products.findIndex(
      (item, index) => item.id === product.id && index !== editIndex,
    )

    if (duplicateIndex >= 0) {
      window.alert('Product ID already exists. Please use a unique ID.')
      return
    }

    if (editIndex !== null) {
      const nextProducts = [...products]
      nextProducts[editIndex] = product
      setProducts(nextProducts)
    } else {
      setProducts([...products, product])
    }

    resetForm()
  }

  const handleEdit = (index) => {
    const product = products[index]
    setEditIndex(index)
    setFormState({
      id: product.id || '',
      name: product.name || '',
      category: product.category || '',
      subcategory: product.subcategory || '',
      origin: product.origin || '',
      packaging: product.packaging || '',
      moq: product.moq || '',
      summary: product.summary || '',
      description: product.description || '',
      image: product.image || '',
      tags: product.tags ? product.tags.join(', ') : '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (index) => {
    const confirmed = window.confirm('Remove this product? This cannot be undone.')
    if (!confirmed) {
      return
    }
    const nextProducts = [...products]
    nextProducts.splice(index, 1)
    setProducts(nextProducts)
  }

  const handleExport = () => {
    const content = JSON.stringify(products, null, 2)
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'products.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(products, null, 2))
      window.alert('JSON copied to clipboard.')
    } catch (error) {
      window.alert('Unable to copy. Please use the download button instead.')
    }
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        if (!isValidProductList(parsed)) {
          throw new Error('Invalid JSON format.')
        }
        setProducts(parsed)
      } catch (error) {
        window.alert('Invalid JSON file. Please check the format.')
      }
    }
    reader.readAsText(file)
  }

  const handleReset = async () => {
    const confirmed = window.confirm(
      'Reset to default products? This will replace your saved changes.',
    )
    if (!confirmed) {
      return
    }
    await onReset()
    resetForm()
  }

  const listContent = useMemo(() => {
    if (loading) {
      return <p>Loading products...</p>
    }

    if (!products.length) {
      return <p>No products saved yet. Add your first product above.</p>
    }

    return products.map((product, index) => (
      <div className="admin-item" key={product.id}>
        <div>
          <h3>{product.name}</h3>
          <p>
            <strong>ID:</strong> {product.id}
          </p>
          <p>
            <strong>Category:</strong> {product.category || 'Not set'}
          </p>
          <p>
            <strong>Subcategory:</strong> {product.subcategory || 'Not set'}
          </p>
          <p>{product.summary || ''}</p>
        </div>
        <div className="admin-item-actions">
          <button
            className="btn ghost"
            type="button"
            onClick={() => handleEdit(index)}
          >
            Edit
          </button>
          <button
            className="btn danger"
            type="button"
            onClick={() => handleDelete(index)}
          >
            Delete
          </button>
        </div>
      </div>
    ))
  }, [products, loading])

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Admin tools</p>
              <h1>Manage product catalog</h1>
            </div>
          </div>

          <div className="admin-note">
            <p>
              This admin page is for static hosting. It saves products in your
              browser and lets you export products.json for updates. Replace
              <strong> assets/products.json</strong> in your repository or
              hosting panel to publish changes.
            </p>
            <div className="admin-actions">
              <button className="btn primary" type="button" onClick={handleExport}>
                Download products.json
              </button>
              <button className="btn ghost" type="button" onClick={handleCopy}>
                Copy JSON
              </button>
              <label className="btn ghost file-input">
                Import JSON
                <input type="file" accept="application/json" onChange={handleImport} />
              </label>
              <button className="btn danger" type="button" onClick={handleReset}>
                Reset to default
              </button>
            </div>
            <p className="admin-helper">
              Tip: After downloading, update assets/products.json to publish the
              new catalog for all visitors.
            </p>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Add or edit</p>
              <h2>Product information</h2>
            </div>
          </div>

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Product name
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Product ID (optional)
                <input
                  id="id"
                  name="id"
                  type="text"
                  placeholder="auto-generate"
                  value={formState.id}
                  onChange={handleChange}
                />
              </label>
              <label>
                Category
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={formState.category}
                  onChange={handleChange}
                />
              </label>
              <label>
                Subcategory
                <input
                  id="subcategory"
                  name="subcategory"
                  type="text"
                  value={formState.subcategory}
                  onChange={handleChange}
                />
              </label>
              <label>
                Origin
                <input
                  id="origin"
                  name="origin"
                  type="text"
                  value={formState.origin}
                  onChange={handleChange}
                />
              </label>
              <label>
                Packaging
                <input
                  id="packaging"
                  name="packaging"
                  type="text"
                  value={formState.packaging}
                  onChange={handleChange}
                />
              </label>
              <label>
                MOQ
                <input
                  id="moq"
                  name="moq"
                  type="text"
                  value={formState.moq}
                  onChange={handleChange}
                />
              </label>
              <label className="full">
                Short description
                <input
                  id="summary"
                  name="summary"
                  type="text"
                  value={formState.summary}
                  onChange={handleChange}
                />
              </label>
              <label className="full">
                Detailed description
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formState.description}
                  onChange={handleChange}
                />
              </label>
              <label className="full">
                Image URL
                <input
                  id="image"
                  name="image"
                  type="text"
                  placeholder="/images/garlic.png"
                  value={formState.image}
                  onChange={handleChange}
                />
              </label>
              <label className="full">
                Tags (comma separated)
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formState.tags}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-actions">
              <button className="btn primary" type="submit">
                {editIndex !== null ? 'Update product' : 'Save product'}
              </button>
              <button className="btn ghost" type="button" onClick={resetForm}>
                Cancel edit
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Current catalog</p>
              <h2>Saved products</h2>
            </div>
          </div>
          <div className="admin-list">{listContent}</div>
        </div>
      </section>
    </main>
  )
}

export default Admin
