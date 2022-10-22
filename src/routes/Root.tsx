import { Outlet } from 'react-router-dom'
import { Footer } from '../components/footer'
import { MainNav } from '../components/MainNav'

export function Root() {
  return (
    <div className="container">
      <MainNav />

      <Outlet />

      <Footer />
    </div>
  )
}
