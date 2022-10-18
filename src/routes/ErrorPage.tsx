import { useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError() as Error

  return (
    <div className="row">
      <div className="col">
        <p className="display-6 alert alert-danger text-center" role={'alert'}>
          An error is occurred!
        </p>
        <p>
          <i>
            <>
              {error.message} {error.cause}
            </>
          </i>
        </p>
      </div>
    </div>
  )
}
