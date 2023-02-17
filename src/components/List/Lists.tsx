import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import { FunctionComponent, useState } from 'react'
import * as types from '../../../types'
import { AlertStatus } from '../../../types'
import { useCreateListMutation } from '../../api/listApiSlice'
import * as yup from 'yup'
import AsideButton from '../Aside/AsideButton'
import AddIcon from '@mui/icons-material/Add'
import List from './List'
import { FocusTrap } from '@mui/base'

const nameSchema = yup.object().shape({
  name: yup
    .string()
    .required('Введіть назву списку')
    .min(1, 'Назва списку повинна складатись принанні з одного символа')
    .max(50, 'Назва списку не може містити більше 50 символів'),
})

const Lists: FunctionComponent<{
  lists: types.List[]
  callback?: (id: string) => void
  page?: {
    id: string | undefined
    page: string
  }
}> = ({ lists, callback, page }) => {
  const [open, setOpen] = useState<boolean>(false)

  const [alertStatus, setAlertStatus] = useState<null | AlertStatus>(null)

  const [createList] = useCreateListMutation()

  const handleSubmit = async (values: { name: string }) => {
    try {
      const data = await createList({
        name: values.name,
      }).unwrap()

      setAlertStatus({
        msg: 'Список створено',
        type: 'success',
        status: true,
      })

      if (callback) callback(data._id)
    } catch (e) {
      setAlertStatus({
        msg: 'Помилка при створенні списку',
        type: 'error',
        status: true,
      })
    }

    setOpen(false)
  }

  return (
    <>
      <Box>
        {lists?.map((item) => (
          <List
            key={item._id}
            selected={page?.page === 'list' && page?.id === item._id}
            {...item}
          />
        ))}
        <AsideButton
          variant="text"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          onPointerDown={(e: any) => e.preventDefault()}
          fullWidth
        >
          <span>Додати список</span>
        </AsideButton>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <Formik
          initialValues={{ name: 'Новий список' }}
          validationSchema={nameSchema}
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
              <DialogTitle>Введіть назву нового списку</DialogTitle>
              <DialogContent>
                <TextField
                  type="text"
                  variant="standard"
                  name="name"
                  label="Назва"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={(touched.name && errors.name) || ' '}
                  autoComplete="false"
                  fullWidth
                  autoFocus
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Відмінити</Button>
                <Button type="submit">Створити</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
      <Snackbar
        open={alertStatus?.status}
        autoHideDuration={10000}
        onClose={() =>
          setAlertStatus((prev) =>
            prev !== null ? { ...prev, status: false } : null
          )
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alertStatus?.type} sx={{ width: '100%' }}>
          {alertStatus?.msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Lists
