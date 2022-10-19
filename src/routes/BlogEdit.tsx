import {
  Form,
  Params,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { ShowServerState } from '../components/ShowServerState'
import { getPost, Post, updatePost } from '../model/posts'

export async function loader({ params }: { params: Params }) {
  const postId = params.postId
  if (postId == undefined) throw new Error('Not valid post parametar')

  const post = await getPost(postId)
  return { post }
}

export async function action({
  params,
  request,
}: {
  params: Params
  request: Request
}) {
  const postId = params.postId
  if (postId == undefined) throw new Error('Cant update that post')

  const formData = await request.formData()
  const update = Object.fromEntries(formData) as {
    title: string
    body: string
    author: string
  }

  await updatePost(postId, update)
  return redirect('/blog')
}

export function BlogEdit() {
  const { post } = useLoaderData() as { post: Post }
  const navigate = useNavigate()
  const navigation = useNavigation()

  return (
    <>
      <div className="row">
        <h1>Edit blog</h1>
      </div>

      <Form method="patch" className="row mt-4">
        <fieldset disabled={navigation.state === 'loading'}>
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

          <ShowServerState />

          <div className="row mt-3">
            <div className="col">
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  navigate(-1)
                }}
              >
                Cancle
              </button>

              <button className="btn btn-primary ms-2" type="submit">
                Save
              </button>
            </div>
          </div>
        </fieldset>
      </Form>
    </>
  )
}
