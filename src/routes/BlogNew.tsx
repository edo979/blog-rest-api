import { Form, redirect, useNavigate, useNavigation } from 'react-router-dom'
import { ShowServerState } from '../components/ShowServerState'
import { createPosts } from '../model/posts'

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const post = Object.fromEntries(formData) as {
    title: string
    body: string
    author: string
  }

  await createPosts(post)
  return redirect('/blog')
}

export function BlogNew() {
  const navigation = useNavigation()
  const navigate = useNavigate()

  return (
    <section>
      <div className="row">
        <h1>Create new Post:</h1>
      </div>

      <Form method="post">
        <fieldset disabled={navigation.state !== 'idle'}>
          <div className="row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-10">
              <input className="form-control" type="text" name="title" />
            </div>
          </div>

          <div className="row mt-2">
            <label htmlFor="body" className="col-sm-2 col-form-label">
              Post
            </label>
            <div className="col-sm-10">
              <textarea className="form-control" rows={5} name="body" />
            </div>
          </div>

          <div className="row mt-2">
            <label htmlFor="author" className="col-sm-2 col-form-label">
              Author
            </label>
            <div className="col-sm-10">
              <input className="form-control" type="text" name="author" />
            </div>
          </div>

          <ShowServerState />

          <div className="row">
            <div className="col">
              <button className="btn btn-primary me-2" type="submit">
                Create
              </button>

              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  navigate(-1)
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </fieldset>
      </Form>
    </section>
  )
}
