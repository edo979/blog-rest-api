import { Form, redirect } from 'react-router-dom'
import { createPosts } from '../model/posts'

export async function action() {
  await createPosts({ title: 'New post' })
  return redirect('/blog')
}

export function BlogNew() {
  return (
    <div className="row">
      <h1>Create new Post</h1>
      <Form method="post">
        <label htmlFor="title">Title</label>
        <button className="btn btn-primary" type="submit">
          Create
        </button>
      </Form>
    </div>
  )
}
