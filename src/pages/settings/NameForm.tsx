import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { Formik, FormikHelpers } from 'formik'
import { FunctionComponent, useEffect, useState } from 'react'
import * as yup from 'yup'
import { AlertStatus } from '../../../types'
import { useUpdateNameMutation } from '../../api/authApiSlice'
import { selectUser, setName } from '../../redux/slices/auth'
import { useAppDispatch, useAppSelector } from '../../redux/store'

interface ReqBody {
  firstName: string
  lastName: string
}

interface FailedResponseErrors {
  firstName?: string
  lastName?: string
}

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Введіть своє ім'я")
    .min(2, "Ім'я повинно містити принанні 2 символи")
    .max(30, "Ім'я повинно містити не більше 30 літер"),
  lastName: yup
    .string()
    .required('Введіть своє прізвище')
    .min(2, 'Прізвище повинно містити принанні 2 символи')
    .max(30, 'Прізвище повинно містити не більше 30 літер'),
})

const NameForm: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const [alert, setAlert] = useState<AlertStatus | null>(null)

  const [updateName] = useUpdateNameMutation()

  const handleSubmit = async (
    values: ReqBody,
    actions: FormikHelpers<ReqBody>
  ) => {
    try {
      await updateName(values).unwrap()

      setAlert({
        msg: 'Зміни збережено',
        status: true,
        type: 'success',
      })

      dispatch(setName(values))
    } catch (e: any) {
      if (e.data) {
        const errors: FailedResponseErrors = e.data.errors

        actions.setErrors(errors)
      } else {
        setAlert({
          msg: 'Помилка при зміні імені',
          status: true,
          type: 'error',
        })
      }
    }
  }

  const initialValues = {
    firstName: user.data?.firstName || '',
    lastName: user.data?.lastName || '',
  }

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        enableReinitialize={true}
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
              Зміна імені
            </Typography>
            <TextField
              variant="standard"
              label="Ім'я"
              type="text"
              name="firstName"
              autoComplete="given-name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={(touched.firstName && errors.firstName) || ' '}
              fullWidth
            />
            <TextField
              variant="standard"
              label="Прізвище"
              type="text"
              name="lastName"
              autoComplete="family-name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={(touched.lastName && errors.lastName) || ' '}
              sx={{ mb: '15px' }}
              fullWidth
            />
            <Button variant="outlined" type="submit" size="large" fullWidth>
              Змінити ім'я
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

export default NameForm
