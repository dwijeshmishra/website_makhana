import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/NotFound.jsx'
import Products from './pages/Products.jsx'
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'

const STORAGE_KEY = 'samarth-overseas-products'
const DATA_URL = '/products.json'

const isValidProductList = (data) =>
  Array.isArray(data) && data.every((item) => item && item.name)

const mergeProducts = (stored, defaults) => {
  if (!Array.isArray(stored) || !stored.length) {
    return defaults
  }

  const defaultsById = new Map(
    defaults.map((item) => [item?.id, item]).filter(([id]) => id),
  )

  const mergedStored = stored.map((item) => {
    if (!item?.id || !defaultsById.has(item.id)) {
      return item
    }
    const fallback = defaultsById.get(item.id)
    const resolvedImage =
      !item.image ||
      item.image === '/images/placeholder.svg' ||
      (item.image.endsWith('.png') &&
        fallback.image &&
        fallback.image !== item.image)
        ? fallback.image
        : item.image

    return { ...fallback, ...item, image: resolvedImage }
  })

  const storedIds = new Set(mergedStored.map((item) => item?.id).filter(Boolean))
  const merged = [...mergedStored]

  defaults.forEach((item) => {
    if (item?.id && !storedIds.has(item.id)) {
      merged.push(item)
    }
  })

  return merged
}

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const loadDefaultProducts = useCallback(async () => {
    try {
      const response = await fetch(DATA_URL)
      if (!response.ok) {
        throw new Error('Failed to load products.')
      }
      const data = await response.json()
      return isValidProductList(data) ? data : []
    } catch (error) {
      console.error('Unable to load products.json', error)
      return []
    }
  }, [])

  useEffect(() => {
    let storedProducts = null
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (isValidProductList(parsed)) {
          storedProducts = parsed
          setProducts(parsed)
          setLoading(false)
        }
      } catch (error) {
        console.warn('Stored products could not be parsed.')
      }
    }

    loadDefaultProducts().then((data) => {
      const nextProducts = storedProducts ? mergeProducts(storedProducts, data) : data
      setProducts(nextProducts)
      setLoading(false)
    })
  }, [loadDefaultProducts])

  useEffect(() => {
    if (loading) {
      return
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products, null, 2))
  }, [products, loading])

  const handleReset = async () => {
    const defaults = await loadDefaultProducts()
    setProducts(defaults)
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="products"
          element={<Products products={products} loading={loading} />}
        />
        <Route
          path="gallery"
          element={<Gallery products={products} loading={loading} />}
        />
        <Route path="contact" element={<Contact />} />
        <Route
          path="product/:id"
          element={<ProductDetail products={products} loading={loading} />}
        />
        <Route
          path="admin"
          element={
            <Admin
              products={products}
              setProducts={setProducts}
              onReset={handleReset}
              loading={loading}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
