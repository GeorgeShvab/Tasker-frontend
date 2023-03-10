import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import Skeleton from '@mui/material/Skeleton'
import { Formik } from 'formik'
import { FunctionComponent, useState } from 'react'
import * as types from '../../../types'
import Tag from './Tag'
import * as yup from 'yup'
import { useCreateTagMutation } from '../../api/tagApiSlice'

interface AlertStatus {
  msg: string
  type: 'success' | 'error'
  status: boolean
}

const nameSchema = yup.object().shape({
  name: yup
    .string()
    .required('Введіть назву тега')
    .min(1, 'Назва тега повинна складатись принанні з одного символа')
    .max(15, 'Назва тега не може містити більше 15 символів'),
})

const Tags: FunctionComponent<{
  tags: types.Tag[]
  page?: types.PageState
  isLoading: boolean
}> = ({ tags, page, isLoading }) => {
  const { palette } = useTheme()

  const [open, setOpen] = useState<boolean>(false)

  const [alertStatus, setAlertStatus] = useState<null | AlertStatus>(null)

  const [createTag] = useCreateTagMutation()

  const handleSubmit = async (values: { name: string }) => {
    try {
      const data = await createTag({
        name: values.name,
      }).unwrap()

      setAlertStatus({
        msg: 'Тег створено',
        type: 'success',
        status: true,
      })
    } catch (e) {
      setAlertStatus({
        msg: 'Помилка при створенні тега',
        type: 'error',
        status: true,
      })
    }

    setOpen(false)
  }

  return (
    <>
      <Box
        display="inline-flex"
        gap="5px"
        flexWrap="wrap"
        width="100%"
        overflow="hidden"
      >
        {!isLoading ? (
          <>
            {tags?.map((item) => (
              <Tag
                key={item._id}
                selected={page?.page === 'tag' && page?.id === item._id}
                {...item}
              />
            ))}
            <Box
              sx={{
                backgroundColor: palette.grey.A100,
                cursor: 'pointer',
                '&:hover': { backgroundColor: palette.grey.A200 },
                transition: 'background 0.15s',
              }}
              borderRadius="5px"
              padding="4px 10px"
              width="fit-content"
              onClick={() => setOpen(true)}
            >
              <Typography color={palette.grey[700]}>+ Додати тег</Typography>
            </Box>
          </>
        ) : (
          [80, 50, 90, 70].map((item, index) => (
            <Skeleton
              variant="rectangular"
              width={item + 'px'}
              height={'28.56px'}
              sx={{
                aspectRatio: '1 / 1',
                borderRadius: 1,
              }}
              key={index}
            />
          ))
        )}
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <Formik
          initialValues={{ name: 'Новий тег' }}
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
              <DialogTitle>Введіть назву нового тега</DialogTitle>
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

export default Tags
