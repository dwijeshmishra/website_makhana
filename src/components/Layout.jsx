import { Link, Outlet } from 'react-router-dom'

const Layout = () => (
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
  </>
)

export default Layout
