import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { Formik } from 'formik'
import { FunctionComponent, useRef, useState } from 'react'
import { AlertStatus, List } from '../../../types'
import {
  useDeleteListMutation,
  useUpdateListMutation,
} from '../../api/listApiSlice'
import * as yup from 'yup'

type ListAction = 'delete' | 'rename' | 'change_color' | null

const nameSchema = yup.object().shape({
  name: yup
    .string()
    .required('Введіть назву списку')
    .min(1, 'Назва списку повинна складатись принанні з одного символа')
    .max(30, 'Назва списку не може містити більше 30 символів'),
})

const ListActions: FunctionComponent<
  List & { setListAction: (data: ListAction) => void; listAction: ListAction }
> = ({ _id, name, color, setListAction, listAction }) => {
  const colorInputRef = useRef<HTMLInputElement>(null)

  const [alertStatus, setAlertStatus] = useState<null | AlertStatus>(null)

  const [deleteList] = useDeleteListMutation()
  const [updateList] = useUpdateListMutation()

  const handleDeleteList = async () => {
    try {
      await deleteList(_id).unwrap()
    } catch (e) {
      setAlertStatus({
        type: 'error',
        status: true,
        msg: 'Помилка при видаленні списку',
      })
    }

    setListAction(null)
  }

  const handleChangeListColor = async () => {
    try {
      const newColor = colorInputRef.current?.value
      if (newColor) {
        await updateList({
          id: _id,
          color: colorInputRef.current?.value,
          name,
        }).unwrap()
      }

      setAlertStatus({
        type: 'success',
        status: true,
        msg: 'Колір списку змінено',
      })
    } catch (e) {
      setAlertStatus({
        type: 'error',
        status: true,
        msg: 'Помилка при зміні кольору списку',
      })
    }

    setListAction(null)
  }

  const handleRenameList = async (values: { name: string }) => {
    try {
      await updateList({
        id: _id,
        name: values.name,
        color,
      }).unwrap()

      setAlertStatus({
        type: 'success',
        status: true,
        msg: 'Назву списку змінено',
      })
    } catch (e) {
      setAlertStatus({
        type: 'error',
        status: true,
        msg: 'Помилка при зміні назви списку',
      })
    }

    setListAction(null)
  }

  return (
    <>
      <Dialog
        open={listAction === 'delete'}
        onClose={() => setListAction(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Ви впевнені що хочете видалити список?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Усі завдання у списку будуть видалені
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setListAction(null)}>Відмінити</Button>
          <Button onClick={handleDeleteList} color="warning" autoFocus>
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={listAction === 'change_color'}
        onClose={() => setListAction(null)}
        fullWidth
      >
        <DialogTitle>Оберіть новий колір списку</DialogTitle>
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
          <Button onClick={() => setListAction(null)}>Відмінити</Button>
          <Button onClick={handleChangeListColor}>Підтвердити</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={listAction === 'rename'}
        onClose={() => setListAction(null)}
        fullWidth
      >
        <Formik
          initialValues={{ name }}
          validationSchema={nameSchema}
          onSubmit={handleRenameList}
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
              <DialogTitle>Введіть нову назву списку</DialogTitle>
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
                <Button onClick={() => setListAction(null)}>Відмінити</Button>
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

export default ListActions
