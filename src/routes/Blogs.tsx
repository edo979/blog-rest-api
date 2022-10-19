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
            className="btn btn-primary d-inline-flex align-items-center gap-1"
            type="submit"
            onClick={() => navigate('/blog/new')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height={18}
              fill="currentColor"
            >
              <path d="M200 344V280H136C122.7 280 112 269.3 112 256C112 242.7 122.7 232 136 232H200V168C200 154.7 210.7 144 224 144C237.3 144 248 154.7 248 168V232H312C325.3 232 336 242.7 336 256C336 269.3 325.3 280 312 280H248V344C248 357.3 237.3 368 224 368C210.7 368 200 357.3 200 344zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z" />
            </svg>
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
                  <Link
                    to={`${id}/edit`}
                    className="btn btn-primary d-inline-flex align-items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      height={14}
                      fill="currentColor"
                    >
                      <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                    </svg>
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
                    <button
                      className="btn btn-danger ms-2 d-inline-flex align-items-center gap-1"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        height={14}
                        fill="currentColor"
                      >
                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                      </svg>
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
