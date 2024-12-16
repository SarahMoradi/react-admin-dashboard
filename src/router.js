import {createBrowserRouter} from 'react-router-dom'
import Login, {loginAction} from './features/identity/components/login'
import Register, {registerAction} from './features/identity/components/register'
import IdentityLayout from './layouts/identity-layout'



const router = createBrowserRouter([
  {
    Component: IdentityLayout,
    children: [
      {path: '/register', Component: Register, action: registerAction},
      {path: '/login', Component: Login, action: loginAction, errorElement: <Login />},
    ],
  },
])

export default router
