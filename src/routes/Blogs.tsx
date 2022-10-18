import { Form, useLoaderData, useNavigate } from 'react-router-dom'
import { getPosts, Post } from '../model/posts'

export async function loader() {
  const posts = await getPosts()
  return { posts }
}

export function Blogs() {
  const { posts } = useLoaderData() as { posts: Post[] }
  const navigate = useNavigate()

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

      <section className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        {posts.map(({ id, title }) => (
          <div key={id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="card-text">Con</p>
              </div>

              <div className="card-footer d-flex justify-content-end">
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
                  <button className="btn btn-danger" type="submit">
                    Delete
                  </button>
                </Form>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
