import { NavLink } from 'react-router-dom'

export function MainNav() {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <span className="fs-4">Simple header</span>
      </a>

      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink to={'/blog'} className="nav-link">
            Blog
          </NavLink>
        </li>
      </ul>
    </header>
  )
}
