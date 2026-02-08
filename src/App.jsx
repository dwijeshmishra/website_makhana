import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/NotFound.jsx'

const STORAGE_KEY = 'samarth-overseas-products'
const DATA_URL = '/products.json'

const isValidProductList = (data) =>
  Array.isArray(data) && data.every((item) => item && item.name)

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
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (isValidProductList(parsed)) {
          setProducts(parsed)
          setLoading(false)
          return
        }
      } catch (error) {
        console.warn('Stored products could not be parsed.')
      }
    }

    loadDefaultProducts().then((data) => {
      setProducts(data)
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
        <Route index element={<Home products={products} loading={loading} />} />
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
