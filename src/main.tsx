import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Blog,
  loader as postsLoader,
  action as postsAction,
} from './routes/Blog'
import { ErrorPage } from './routes/ErrorPage'
import { Home } from './routes/Home'
import { Root } from './routes/Root'
import './scss/style.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/blog',
        element: <Blog />,
        loader: postsLoader,
        action: postsAction,
        errorElement: <ErrorPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
