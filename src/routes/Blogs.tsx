import {
  Form,
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { getPosts, Post } from '../model/posts'

export async function loader() {
  const posts = await getPosts()
  return { posts }
}

export function Blogs() {
  const { posts } = useLoaderData() as { posts: Post[] }
  const navigate = useNavigate()
  const navigation = useNavigation()

  if (!posts) return null

  return (
    <>
      <div className="row">
        <h1>Blog</h1>
      </div>

      <div className="row">
        <div className="col">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => navigate('/blog/new')}
          >
            New
          </button>
        </div>
      </div>

      <section
        className={`row row-cols-1 row-cols-md-3 g-4 mt-4 ${
          navigation.state === 'loading' && 'opacity-50'
        }`}
      >
        {posts.map(({ id, title, body, author }) => (
          <div key={id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="card-text">
                  {body.length > 60 ? body.substring(0, 60) + '...' : body}
                </p>
              </div>

              <div className="card-footer">
                <p>
                  <span className="fw-bold">Author: </span>{' '}
                  <span>{author}</span>
                </p>
                <div className="hstack justify-content-end border-top pt-2">
                  <Link to={`${id}/edit`} className="btn btn-primary">
                    Edit
                  </Link>

                  <Form
                    method="delete"
                    action={`/blog/${id}/destroy`}
                    onSubmit={(e) => {
                      if (
                        !confirm('Please confirm you want to delete this post?')
                      ) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <button className="btn btn-danger ms-2" type="submit">
                      Delete
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
