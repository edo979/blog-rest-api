import { Params, useLoaderData, useNavigate } from 'react-router-dom'
import { getPost, Post } from '../model/posts'

export async function loader({ params }: { params: Params }) {
  if (!params.postId) throw new Error('Wrong post id')
  const post = await getPost(params.postId)
  return { post }
}

export function Blog() {
  const { post } = useLoaderData() as { post: Post }
  const navigate = useNavigate()
  return (
    <>
      <div className="row">
        <div className="col">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <h1>{post.title}</h1>
      </div>

      <div className="row">
        <div className="col">
          <p>{post.body}</p>
        </div>
        <div className="col">
          <img src={post.image} alt={post.title} />
        </div>
      </div>
    </>
  )
}
