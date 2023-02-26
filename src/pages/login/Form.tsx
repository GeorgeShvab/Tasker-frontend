import { LoadingButton } from '@mui/lab'
import useMediaQuery from '@mui/material/useMediaQuery'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FormikHelpers, Formik } from 'formik'
import { FunctionComponent, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LoginBody } from '../../../types'
import { useLoginMutation } from '../../api/authApiSlice'
import { authorizeUser } from '../../redux/slices/auth'
import { useAppDispatch } from '../../redux/store'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup.string().required('Вкажіть емейл'),
  password: yup.string().required('Вкажіть пароль'),
})

const initialValues = {
  email: '',
  password: '',
}

const LoginForm: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const isMobile = useMediaQuery('(max-width: 768px)')

  const [connectionError, setConnectionError] = useState<boolean>(false)

  const [login, options] = useLoginMutation()

  const handleSubmit = async (
    values: LoginBody,
    { setErrors }: FormikHelpers<LoginBody>
  ) => {
    try {
      const data = await login(values).unwrap()

      dispatch(authorizeUser(data))

      navigate('/')
    } catch (e: any) {
      if (e.data) {
        setErrors({
          email: 'Невірний емейл або пароль',
          password: 'Невірний емейл або пароль',
        })
      } else {
        setConnectionError(true)
      }
    }
  }

  return (
    <>
      <Snackbar
        open={connectionError}
        autoHideDuration={20000}
        onClose={() => setConnectionError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Помилка з'єднання, будь ласка, спробуйте ще раз пізніше
        </Alert>
      </Snackbar>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={schema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Box>
            <Typography
              variant="h3"
              mb="40px"
              textAlign={isMobile ? 'center' : undefined}
            >
              Увійти в аккаунт
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box
                mb="35px"
                display="grid"
                gridTemplateColumns="1fr"
                sx={{
                  gridGap: '3px 10px',
                }}
              >
                <TextField
                  variant="standard"
                  label="Емейл"
                  type="text"
                  name="email"
                  autoComplete="email"
                  sx={{}}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={(touched.email && errors.email) || ' '}
                />
                <TextField
                  variant="standard"
                  label="Пароль"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  sx={{}}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={(touched.password && errors.password) || ' '}
                />
              </Box>
              <LoadingButton
                variant="contained"
                type="submit"
                sx={{ mb: '15px' }}
                loading={options.isLoading}
                fullWidth
              >
                Вперед
              </LoadingButton>
              <Typography textAlign="center">
                Ще не маєте аккаунта?{' '}
                <Link to="/registration">Зареєструватись</Link>
              </Typography>
            </form>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default LoginForm
