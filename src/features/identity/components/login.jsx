import logo from '@assets/images/logo.svg'
import {useForm} from 'react-hook-form'
import {Link, redirect, useRouteError, useSubmit} from 'react-router-dom'
import {httpsService} from '../../../core/http-service'
const Login = () => {
  // register for validation
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const submitForm = useSubmit()

  const onSubmit = (data) => {
    submitForm(data, {method: 'post'})
  }

  const routeError = useRouteError()

  return (
    <>
      <div className='text-center mt-4'>
        <img src={logo} style={{height: '100px'}} alt='logo' />
        <h1 className='h2'>پلتفرم آموزش آنلاین</h1>
        <p className='lead'>جهت ورود لازم است از طریق موبایل و رمز عبور خود اقدام کنید</p>
        <p className='lead'>
          قبلا ثبت نام نکرده اید؟
          <Link to='/register' className='me-2'>
            ثبت نام کنید{' '}
          </Link>
        </p>
      </div>

      <div className='card'>
        <div className='card-body'>
          <div className='m-sm-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-3'>
                <label className='form-label'>موبایل</label>
                {/* validation by register */}
                <input
                  {...register('mobile', {
                    required: 'موبایل الزامی است',
                    minLength: 11,
                    maxLength: 11,
                  })}
                  className={`form-control form-control-lg ${errors.mobile && 'is-invalid'}`}
                />
                {errors.mobile && errors.mobile.type === 'required' && (
                  <p className='text-danger small fw-bolder mt-1'>{errors.mobile?.message}</p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === 'minLength' || errors.mobile.type === 'maxLength') && (
                    <p className='text-danger small fw-bolder mt-1'>موبایل باید 11 رقم باشد</p>
                  )}
              </div>
              <div className='mb-3'>
                <label className='form-label'>رمز عبور</label>
                <input
                  {...register('password', {required: 'رمز عبور الزامی است'})}
                  className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                  type='password'
                />
                {errors.password && (
                  <p className='text-danger small fw-bolder mt-1'>{errors.password?.message}</p>
                )}
              </div>
              <div className='text-center mt-3'>
                <button type='submit' className='btn btn-lg btn-primary'>
                  وارد شوید
                </button>
              </div>
              {routeError && (
                <div className='alert alert-danger p-2 mt-3'>
                  {routeError?.response.data.map((error) => (
                    <p>{error.description}</p>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

export async function loginAction({request}) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const response = await httpsService.post('/Users/login', data)
  if (response.status === 200) {
    localStorage.setItem('token', response?.data.token)
    return redirect('/')
  }

  console.log(formData, 'formData')
}
