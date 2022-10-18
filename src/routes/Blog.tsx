import { Form, useLoaderData } from 'react-router-dom'
import { createPosts, getPosts, Post } from '../model/posts'

export async function loader() {
  const posts = await getPosts()
  console.log(posts)
  return { posts }
}

export async function action() {
  await createPosts({ title: 'New post' })
}

export function Blog() {
  const { posts } = useLoaderData() as { posts: Post[] }

  if (!posts) return null

  return (
    <div className="container">
      <div className="row">
        <h1>Blog</h1>
      </div>

      <div className="row">
        <Form className="col" method="post">
          <button className="btn btn-primary" type="submit">
            New
          </button>
        </Form>
      </div>

      <section className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        {posts.map(({ id, title }) => (
          <div key={id} className="col">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="card-text">Con</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
