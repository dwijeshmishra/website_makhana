import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <>
    <header className="site-header">
      <div className="container header-content">
        <div className="brand">
          <span className="brand-mark">SO</span>
          <div>
            <p className="brand-name">Samarth Overseas</p>
            <p className="brand-tagline">Export Quality Agro Products</p>
          </div>
        </div>
        <nav className="nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <a className="nav-link" href="/#products">
            Products
          </a>
          <a className="nav-link" href="/#gallery">
            Gallery
          </a>
          <a className="nav-link" href="/#contact">
            Contact
          </a>
        </nav>
      </div>
    </header>

    <Outlet />

    <footer className="site-footer">
      <div className="container footer-content">
        <p>Samarth Overseas. All rights reserved.</p>
      </div>
    </footer>

    <div className="mobile-bar">
      <a className="btn primary" href="tel:+919826015502">
        Call
      </a>
      <a
        className="btn ghost"
        href="https://wa.me/919826015502"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </div>
    </>
  )
}

export default Layout
