import {createBrowserRouter} from 'react-router-dom'
import Login from './features/identity/components/login'
import Register, {registerAction} from './features/identity/components/register'
import IdentityLayout from './layouts/identity-layout'
import ErrorBoundary from './features/identity/error'

const router = createBrowserRouter([
  {
    Component: IdentityLayout,
    errorElement: ErrorBoundary,
    children: [
      {path: '/register', Component: Register, action: registerAction},
      {path: '/login', Component: Login},
    ],
  },
])

export default router
