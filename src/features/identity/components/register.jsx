import logo from '@assets/images/logo.svg'
import {useForm} from 'react-hook-form'
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteError,
  useSubmit,
} from 'react-router-dom'
import {httpsService} from '../../../core/http-service'
import {useEffect} from 'react'
import { useTranslation } from 'react-i18next'
const Register = () => {
  // register for validation
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm()

  const submitForm = useSubmit()

  const onSubmit = (data) => {
    const {confirmPassword, ...userData} = data
    submitForm(userData, {method: 'post'})
  }

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  // const isSubmitting = navigation.state !== idle"

  //the value i return from registerAction
  const isSuccessOperation = useActionData()

  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccessOperation) {
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
  }, [isSuccessOperation])

  const routeError = useRouteError()

  console.log(routeError, 'uuu')

  const {t} = useTranslation();

  return (
    <>
      <div className='text-center mt-4'>
        <img src={logo} style={{height: '100px'}} alt='logo' />
        <h1 className='h2'>پلتفرم آموزش آنلاین</h1>
        <p className='lead'>جهت استفاده از ویژگی های پلتفرم آموزش آنلاین کلاسبن ثبت نام کنید</p>
        <p className='lead'>
          قبلا ثبت نام کرده اید؟
          <Link to='/login' className='me-2'>
            وارد شوید{' '}
          </Link>
        </p>
      </div>

      <div className='card'>
        <div className='card-body'>
          <div className='m-sm-4'>
            {/* import Form from react-router-dom */}
            <Form onSubmit={handleSubmit(onSubmit)}>
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
              <div className='mb-3'>
                <label className='form-label'>تکرار رمز عبور</label>
                <input
                  {...register('confirmPassword', {
                    required: 'تکرار رمز عبور الزامی است',
                    validate: (value) => {
                      if (watch('password') !== value) {
                        return 'عدم تطابق با رمز عبور وارد شده'
                      }
                    },
                  })}
                  className={`form-control form-control-lg ${
                    errors.confirmPassword && 'is-invalid'
                  }`}
                  type='password'
                />
                {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
                  <p className='text-danger small fw-bolder mt-1'>
                    {errors.confirmPassword?.message}
                  </p>
                )}
                {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
                  <p className='text-danger small fw-bolder mt-1'>
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <div className='text-center mt-3'>
                <button disabled={isSubmitting} type='submit' className='btn btn-lg btn-primary'>
                  {t('register.register')}
                  {/* {isSubmitting ? 'در حال ارسال' : 'ثبت نام کنید'} */}
                </button>
              </div>
              {isSuccessOperation && (
                <div className='alert alert-success text-success p-2 mt-3'>
                  عملیات با موفقیت انجام شد. به صفحه ورود منتقل میشوید.
                </div>
              )}
              {/* {routeError && (
                <div className='alert alert-danger p-2 mt-3'>
                  {routeError?.response.data.map((error) => (
                    <p>{error.description}</p>
                  ))}
                </div>
              )} */}
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register

export async function registerAction({request}) {
  try {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const response = await httpsService.post('/Users', data)
    if (response.status !== 200) {
      throw new Error('Registration failed')
    }
    return true
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    throw {message: error.message, status: error.response?.status || 500}
  }
}

