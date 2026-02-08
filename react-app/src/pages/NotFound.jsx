import { Link } from 'react-router-dom'

const NotFound = () => (
  <main className="section">
    <div className="container">
      <p className="eyebrow">Page not found</p>
      <h1>We could not find that page.</h1>
      <p>Please return to the homepage.</p>
      <Link className="btn primary" to="/">
        Go to homepage
      </Link>
    </div>
  </main>
)

export default NotFound
