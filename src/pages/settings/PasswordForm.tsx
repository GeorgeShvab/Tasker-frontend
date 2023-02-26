import { Formik, FormikHelpers } from 'formik'
import { FunctionComponent, useState } from 'react'
import { AlertStatus } from '../../../types'
import * as yup from 'yup'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useUpdatePasswordMutation } from '../../api/authApiSlice'

const validationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Введіть нинішній пароль')
    .min(6, 'Невірний старий пароль')
    .max(80, 'Невірний старий пароль'),
  password: yup
    .string()
    .required('Введіть новий пароль')
    .min(6, 'Пароль повинен містити принанні 6 символів')
    .max(80, 'Пароль повинен містити не більше 80 символів'),
  passwordConfirmation: yup
    .string()
    .required('Паролі не співпадають')
    .oneOf([yup.ref('password')], 'Паролі не співпадають'),
})

interface ReqBody {
  oldPassword: string
  password: string
  passwordConfirmation: string
}

interface FailedResponseErrors {
  oldPassword?: string
  password?: string
  passwordConfirmation?: string
}

const PasswordForm: FunctionComponent = () => {
  const [alert, setAlert] = useState<AlertStatus | null>(null)

  const [updatePassword] = useUpdatePasswordMutation()

  const handleSubmit = async (
    values: ReqBody,
    actions: FormikHelpers<ReqBody>
  ) => {
    try {
      await updatePassword(values).unwrap()

      setAlert({
        msg: 'Зміни збережено',
        status: true,
        type: 'success',
      })
    } catch (e: any) {
      if (e.data) {
        const errors: FailedResponseErrors = e.data.errors

        actions.setErrors(errors)
      } else {
        setAlert({
          msg: "Не вдалось оновити пароль, перевірте інтернет-з'єднання",
          status: true,
          type: 'error',
        })
      }
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          oldPassword: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" mb="20px">
              Зміна паролю
            </Typography>
            <TextField
              variant="standard"
              label="Нинішній пароль"
              type="password"
              name="oldPassword"
              autoComplete="current-password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.oldPassword}
              error={
                Boolean(touched.oldPassword) && Boolean(errors.oldPassword)
              }
              helperText={(touched.oldPassword && errors.oldPassword) || ' '}
              fullWidth
            />
            <TextField
              variant="standard"
              label="Новий пароль"
              type="password"
              name="password"
              autoComplete="new-password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={(touched.password && errors.password) || ' '}
              fullWidth
            />
            <TextField
              variant="standard"
              label="Повторіть новий пароль"
              type="password"
              name="passwordConfirmation"
              autoComplete="new-password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.passwordConfirmation}
              error={
                Boolean(touched.passwordConfirmation) &&
                Boolean(errors.passwordConfirmation)
              }
              helperText={
                (touched.passwordConfirmation && errors.passwordConfirmation) ||
                ' '
              }
              sx={{ mb: '15px' }}
              fullWidth
            />
            <Button variant="outlined" type="submit" size="large" fullWidth>
              Змінити пароль
            </Button>
          </form>
        )}
      </Formik>
      <Snackbar
        open={alert?.status}
        autoHideDuration={5000}
        onClose={() =>
          setAlert((prev) =>
            prev !== null ? { ...prev, status: false } : null
          )
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alert?.type} sx={{ width: '100%' }}>
          {alert?.msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default PasswordForm
