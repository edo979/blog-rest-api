import { Link, useLoaderData } from 'react-router-dom'
import { getPosts, Post } from '../model/posts'
import { limitTextTo } from '../utilities/utility'

export async function loader() {
  const posts = await getPosts('?_limit=3&_sort=createdAt&_order=desc')
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
        {posts.slice(1).map(({ id, title, body, createdAt, image }) => (
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
          {posts.slice(2).map((post) => (
            <>
              <h3>{post.title}</h3>
              <p>{limitTextTo(post.body, 150)}</p>
            </>
          ))}
        </div>
        <div className="col-md-4">about</div>
      </section>
    </>
  )
}
