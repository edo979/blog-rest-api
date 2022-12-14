import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './routes/Root'
import { Home, loader as homeLoader } from './routes/Home'
import { ErrorPage } from './routes/ErrorPage'
import { Blog, loader as postLoader } from './routes/Blog'
import { Blogs, loader as postsLoader } from './routes/Blogs'
import { BlogNew, action as newBlogAction } from './routes/BlogNew'
import {
  BlogEdit,
  loader as editPostLoader,
  action as editPostAction,
} from './routes/BlogEdit'
import { action as destroyAction } from './routes/BlogDestroyPost'
import './scss/style.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      {
        path: '/blog',
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              { index: true, element: <Blogs />, loader: postsLoader },
              { path: 'new', element: <BlogNew />, action: newBlogAction },
              { path: ':postId', element: <Blog />, loader: postLoader },
              {
                path: ':postId/edit',
                element: <BlogEdit />,
                loader: editPostLoader,
                action: editPostAction,
              },
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
