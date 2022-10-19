import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './routes/ErrorPage'
import { Blog } from './routes/Blog'
import { action as destroyAction } from './routes/BlogDestroyPost'
import { BlogNew, action as newBlogAction } from './routes/BlogNew'
import { Blogs, loader as postsLoader } from './routes/Blogs'
import { Home } from './routes/Home'
import { Root } from './routes/Root'
import './scss/style.scss'
import { BlogEdit } from './routes/BlogEdit'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/blog',
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              { index: true, element: <Blogs />, loader: postsLoader },
              { path: 'new', element: <BlogNew />, action: newBlogAction },
              { path: ':postId', element: <Blog /> },
              { path: ':postId/edit', element: <BlogEdit /> },
              {
                path: ':postId/destroy',
                action: destroyAction,
              },
            ],
          },
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
