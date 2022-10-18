import { Outlet } from 'react-router-dom'
import { MainNav } from '../components/MainNav'

export function Root() {
  return (
    <div className="container">
      <MainNav />

      <Outlet />
    </div>
  )
}
