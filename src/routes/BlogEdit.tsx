import { Form, Params, useLoaderData } from 'react-router-dom'
import { getPost, Post } from '../model/posts'

export async function loader({ params }: { params: Params }) {
  const postId = params.postId
  if (postId == undefined) throw new Error('Not valid post parametar')

  const post = await getPost(postId)
  return { post }
}

export function BlogEdit() {
  const post = useLoaderData() as Post

  return (
    <>
      <div className="row">
        <h1>Edit blog</h1>
      </div>

      <Form method="patch" className="row mt-4">
        <div className="row">
          <label htmlFor="title" className="col-sm-2 col-form-label">
            Title
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="title"
              defaultValue={post.title}
            />
          </div>
        </div>

        <div className="row mt-2">
          <label htmlFor="body" className="col-sm-2 col-form-label">
            Post
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              rows={5}
              name="body"
              defaultValue={post.body}
            />
          </div>
        </div>

        <div className="row mt-2">
          <label htmlFor="author" className="col-sm-2 col-form-label">
            Author
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="author"
              defaultValue={post.author}
            />
          </div>
        </div>

        <div className="row mt-3">
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </Form>
    </>
  )
}
