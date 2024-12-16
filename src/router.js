import {createBrowserRouter} from 'react-router-dom'
import Login, {loginAction} from './features/identity/components/login'
import Register, {registerAction} from './features/identity/components/register'
import IdentityLayout from './layouts/identity-layout'
import {dashboard} from './features/identity/components/App'

const router = createBrowserRouter([
  {
    Component: IdentityLayout,
    children: [
      {path: 'register', Component: Register, action: registerAction, ErrorBoundary: Register},
      {path: 'login', Component: Login, action: loginAction, ErrorBoundary: Login},
    ],
  },
  {path: '/', Component: dashboard},
])

export default router
