import {useRouteError} from 'react-router-dom'

function ErrorBoundary() {
  const error = useRouteError()
  return <div>Error: {error?.message || 'Something went wrong.'}</div>
}

export default ErrorBoundary
