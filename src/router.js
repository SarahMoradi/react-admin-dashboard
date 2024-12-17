import {createBrowserRouter} from 'react-router-dom'
import Login, {loginAction} from './features/identity/components/login'
import Register, {registerAction} from './features/identity/components/register'
import IdentityLayout from './layouts/identity-layout'
import MainLayout from './layouts/main-layout'
import Courses from './pages/courses'

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        Component: Courses,
        index: true,
        // index: default component
      },
    ],
  },
  {
    Component: IdentityLayout,
    children: [
      {path: 'register', Component: Register, action: registerAction, ErrorBoundary: Register},
      {path: 'login', Component: Login, action: loginAction, ErrorBoundary: Login},
    ],
  },
])

export default router
