import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import LoadingButton from '@mui/lab/LoadingButton'
import { Formik, FormikHelpers } from 'formik'
import { FunctionComponent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { RegistrationBody } from '../../../types'
import { useRegistrationMutation } from '../../api/authApiSlice'
import { useAppDispatch } from '../../redux/store'
import { authorizeUser } from '../../redux/slices/auth'

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Вкажіть ваше ім'я")
    .min(2, 'Введіть принанні 2 символи')
    .max(30, 'Введіть не більше 30 символів'),
  lastName: yup
    .string()
    .required('Вкажіть ваше прізвище')
    .min(2, 'Введіть принанні 2 символи')
    .max(30, 'Введіть не більше 30 символів'),
  email: yup
    .string()
    .required('Вкажіть ваш емейл')
    .email('Вкажіть коректний емейл'),
  password: yup
    .string()
    .required('Вкажіть пароль')
    .min(6, 'Пароль повинен містити принанні 6 символів')
    .max(80, 'Пароль повинен містити не більше 80 символів'),
  passwordConfirmation: yup
    .string()
    .required('Паролі не співпадають')
    .oneOf([yup.ref('password')], 'Паролі не співпадають'),
})

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

const RegistrationForm: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const isMobile = useMediaQuery('(max-width: 768px)')

  const [connectionError, setConnectionError] = useState<boolean>(false)

  const [registration, options] = useRegistrationMutation()

  const handleSubmit = async (
    values: RegistrationBody,
    { setErrors }: FormikHelpers<RegistrationBody>
  ) => {
    try {
      const data = await registration(values).unwrap()

      dispatch(authorizeUser(data))

      navigate('/')
    } catch (e: any) {
      if (e.data) {
        setErrors(e.data.errors)
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
              Створити аккаунт
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box
                mb="35px"
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                sx={{
                  '& > div': { gridColumn: 'span 4' },
                  gridGap: '3px 10px',
                }}
              >
                <TextField
                  variant="standard"
                  label="Ім'я"
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  sx={{
                    gridColumn: !isMobile ? 'span 2 !important' : undefined,
                  }}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={(touched.firstName && errors.firstName) || ' '}
                />
                <TextField
                  variant="standard"
                  label="Прізвище"
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  sx={{
                    gridColumn: !isMobile ? 'span 2 !important' : undefined,
                  }}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={(touched.lastName && errors.lastName) || ' '}
                />
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
                  autoComplete="new-password"
                  sx={{}}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={(touched.password && errors.password) || ' '}
                />
                <TextField
                  variant="standard"
                  label="Повторіть пароль"
                  type="password"
                  name="passwordConfirmation"
                  autoComplete="new-password"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.passwordConfirmation}
                  error={
                    Boolean(touched.passwordConfirmation) &&
                    Boolean(errors.passwordConfirmation)
                  }
                  helperText={
                    (touched.passwordConfirmation &&
                      errors.passwordConfirmation) ||
                    ' '
                  }
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
                Вже маєте аккаунт? <Link to="/login">Увійти</Link>
              </Typography>
            </form>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default RegistrationForm
