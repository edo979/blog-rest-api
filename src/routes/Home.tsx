import { Link, useLoaderData } from 'react-router-dom'
import { getLatestPosts, Post } from '../model/posts'
import { limitTextTo } from '../utilities/utility'

export async function loader() {
  const posts = await getLatestPosts('?_limit=3&_sort=createdAt&_order=desc')
  return { posts }
}

export function Home() {
  const { posts } = useLoaderData() as { posts: Post[] }

  return (
    <>
      <div className="p-4 p-md-5 mb-4 rounded text-bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 fst-italic">{posts[0].title}</h1>
          <p className="lead my-3">{limitTextTo(posts[0].body, 150)}</p>
          <p className="lead mb-0">
            <a href="#" className="text-white fw-bold">
              Continue reading...
            </a>
          </p>
        </div>
      </div>

      <div className="row mb-2">
        {posts.slice(1).map(({ id, title, body, createdAt }) => (
          <div className="col-md-6" key={id}>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">
                  {title}
                </strong>
                <h3 className="mb-0">Featured post</h3>
                <div className="mb-1 text-muted">
                  {new Date(createdAt).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
                <p className="card-text mb-auto">{limitTextTo(body, 100)}</p>
                <Link className="stretched-link" to={`blog/${id}`}>
                  Continue reading
                </Link>
              </div>
              <div className="col-auto d-none d-lg-block">
                <svg
                  className="bd-placeholder-img"
                  width="200"
                  height="250"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: Thumbnail"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                    Thumbnail
                  </text>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
