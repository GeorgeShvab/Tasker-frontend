import { FunctionComponent, useRef, useState } from 'react'
import { AlertStatus, Tag } from '../../../types'
import * as yup from 'yup'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material'
import { Formik } from 'formik'
import {
  useDeleteTagMutation,
  useUpdateTagMutation,
} from '../../api/tagApiSlice'

type TagAction = 'delete' | 'rename' | 'change_color' | null

const nameSchema = yup.object().shape({
  name: yup
    .string()
    .required('Введіть назву тега')
    .min(1, 'Назва тега повинна складатись принанні з одного символа')
    .max(15, 'Назва тега не може містити більше 15 символів'),
})

const TagActions: FunctionComponent<
  Tag & { setTagAction: (data: TagAction) => void; tagAction: TagAction }
> = ({ _id, color, name, setTagAction, tagAction }) => {
  const colorInputRef = useRef<HTMLInputElement>(null)

  const [alertStatus, setAlertStatus] = useState<null | AlertStatus>(null)

  const [deleteTag] = useDeleteTagMutation()
  const [updateTag] = useUpdateTagMutation()

  const handleDeleteTag = async () => {
    try {
      await deleteTag(_id).unwrap()
    } catch (e) {
      setAlertStatus({
        msg: 'Помилка при видаленні',
        type: 'error',
        status: true,
      })
    }

    setTagAction(null)
  }

  const handleRenameTagSubmit = async (values: { name: string }) => {
    try {
      await updateTag({
        id: _id,
        name: values.name,
        color,
      }).unwrap()

      setAlertStatus({
        msg: 'Назва тега змінена',
        type: 'success',
        status: true,
      })
    } catch (e) {
      setAlertStatus({
        msg: 'Помилка при зміні назви тега',
        type: 'error',
        status: true,
      })
    }

    setTagAction(null)
  }

  const handleChangeTagColor = async () => {
    try {
      const newColor = colorInputRef.current?.value
      if (newColor) {
        await updateTag({
          id: _id,
          name,
          color: newColor,
        }).unwrap()

        setAlertStatus({
          msg: 'Колір тега змінено',
          type: 'success',
          status: true,
        })
      } else {
        throw new Error()
      }
    } catch (e) {
      setAlertStatus({
        msg: 'Помилка при зміні кольору тега',
        type: 'error',
        status: true,
      })
    }

    setTagAction(null)
  }

  return (
    <>
      <Dialog
        open={tagAction === 'delete'}
        onClose={() => setTagAction(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Ви впевнені що хочете видалити тег?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            При видаленні тегу пов'язані з ним завдання видалені не будуть
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTagAction(null)}>Відмінити</Button>
          <Button onClick={handleDeleteTag} color="warning" autoFocus>
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={tagAction === 'change_color'}
        onClose={() => setTagAction(null)}
        fullWidth
      >
        <DialogTitle>Оберіть новий колір тега</DialogTitle>
        <DialogContent>
          <TextField
            type="color"
            variant="outlined"
            defaultValue={color}
            inputRef={colorInputRef}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTagAction(null)}>Відмінити</Button>
          <Button onClick={handleChangeTagColor}>Підтвердити</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={tagAction === 'rename'}
        onClose={() => setTagAction(null)}
        fullWidth
      >
        <Formik
          initialValues={{ name }}
          validationSchema={nameSchema}
          onSubmit={handleRenameTagSubmit}
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
              <DialogTitle>Введіть нову назву тега</DialogTitle>
              <DialogContent>
                <TextField
                  type="text"
                  variant="standard"
                  name="name"
                  label="Нова назва"
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
                <Button onClick={() => setTagAction(null)}>Відмінити</Button>
                <Button type="submit">Підтвердити</Button>
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

export default TagActions
