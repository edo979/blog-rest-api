import { Form, Params } from 'react-router-dom'

export function BlogEdit() {
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

        <div className="row mt-3">
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </div>
      </Form>
    </>
  )
}
