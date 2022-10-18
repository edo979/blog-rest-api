import { useLoaderData } from 'react-router-dom'
import { getPosts, Post } from '../model/posts'

export async function loader() {
  const posts = await getPosts()
  console.log(posts)
  return { posts }
}

export function Blog() {
  const { posts } = useLoaderData() as { posts: Post[] }

  if (!posts) return null

  return (
    <div className="container">
      <div className="row mb-4">
        <h1>Blog</h1>
      </div>

      <section className="row row-cols-1 row-cols-md-3 g-4">
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
