import { Link, useLoaderData } from 'react-router-dom'
import { getPosts, Post } from '../model/posts'
import { limitTextTo } from '../utilities/utility'

export async function loader() {
  const posts = await getPosts('?_limit=8&_sort=createdAt&_order=desc')
  return { posts }
}

export function Home() {
  const { posts } = useLoaderData() as { posts: Post[] }

  return (
    <>
      <div className="row p-4 mx-0 mb-4 rounded text-bg-dark">
        <div className="col-7">
          <h1 className="display-4 fst-italic">{posts[0].title}</h1>
          <p className="lead my-3">{limitTextTo(posts[0].body, 150)}</p>
          <p className="lead mb-0">
            <Link to={`blog/${posts[0].id}`} className="text-white fw-bold">
              Continue reading...
            </Link>
          </p>
        </div>
        <div className="col">
          <img
            src={posts[0].image}
            alt={posts[0].title}
            className="w-100"
            style={{
              objectPosition: 'center',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      <div className="row mb-2">
        {posts.slice(1, 3).map(({ id, title, body, createdAt, image }) => (
          <div className="col-md-6" key={id}>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">
                  Featured post
                </strong>
                <h3 className="mb-0">{title}</h3>
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

              <div className="col-4">
                <img
                  src={image}
                  alt={title}
                  className="img-thumbnail"
                  style={{
                    objectPosition: 'center',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <section>
        <h2 className="border-bottom my-3">Posts:</h2>
      </section>

      <section className="row">
        <div className="col">
          {posts.slice(3).map((post) => (
            <article key={post.id}>
              <h3>{post.title}</h3>
              <p>{limitTextTo(post.body, 250)}</p>
              <p className="text-end">
                <span className="fw-bold">Author: </span>
                <span>{post.author}</span>
              </p>
            </article>
          ))}
        </div>
        <div className="col-md-4">
          <div className="position-sticky" style={{ top: '2rem' }}>
            <div className="p-4 mb-3 bg-light rounded">
              <h4>About</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                aliquid dignissimos atque maxime, error consequatur harum
                veritatis dolore cumque quisquam ducimus veniam qui alias iste
                ipsam porro delectus.
              </p>
            </div>

            <section>
              Latest:
              <ul className="list-group">
                {posts.slice(0, 5).map((post) => (
                  <li key={post.title} className="list-group-item">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
