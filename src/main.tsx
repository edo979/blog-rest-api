import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Blog, loader as postsLoader } from './routes/Blog'
import { BlogNew, action as newBlogAction } from './routes/BlogNew'
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
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Blog />, loader: postsLoader },
          { path: 'new', element: <BlogNew />, action: newBlogAction },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
