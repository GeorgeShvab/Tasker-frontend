import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  MenuList,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { FunctionComponent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as types from '../../../types'
import AsideButton from '../Aside/AsideButton'
import * as yup from 'yup'
import ContextMenu from '../ContextMenu'
import { Formik } from 'formik'
import {
  useDeleteListMutation,
  useUpdateListMutation,
} from '../../api/listApiSlice'

type ListAction = 'delete' | 'rename' | 'change_color' | null

interface AlertStatus {
  msg: string
  type: 'success' | 'error'
  status: boolean
}

const nameSchema = yup.object().shape({
  name: yup
    .string()
    .required('Введіть назву списку')
    .min(1, 'Назва списку повинна складатись принанні з одного символа')
    .max(30, 'Назва списку не може містити більше 30 символів'),
})

const List: FunctionComponent<types.List & { selected?: boolean }> = ({
  _id,
  tasks,
  color,
  name,
  selected,
}) => {
  const { palette } = useTheme()

  const [listAction, setListAction] = useState<ListAction>(null)

  const [alertStatus, setAlertStatus] = useState<null | AlertStatus>(null)

  const anchorRef = useRef<HTMLButtonElement>(null)

  const colorInputRef = useRef<HTMLInputElement>(null)

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
      <Link to={'/list/' + _id}>
        <AsideButton
          variant="text"
          ref={anchorRef}
          size="large"
          startIcon={
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                fill={color}
                d="M3.25 1A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5z"
              />
            </svg>
          }
          endIcon={
            <Box
              sx={{ backgroundColor: palette.grey.A100 }}
              minWidth="25px"
              borderRadius="2.5px"
              height="15px"
              padding="0 5px"
            >
              <Typography fontSize="10px">{tasks}</Typography>
            </Box>
          }
          className={selected ? 'selected' : ''}
          fullWidth
        >
          <span>{name}</span>
        </AsideButton>
      </Link>
      <ContextMenu anchor={anchorRef}>
        {(closeMenu) => (
          <MenuList id="composition-menu" aria-labelledby="composition-button">
            <MenuItem
              onClick={() => {
                setListAction('rename')
                closeMenu()
              }}
            >
              Змінити назву
            </MenuItem>
            <MenuItem
              onClick={() => {
                setListAction('change_color')
                closeMenu()
              }}
            >
              Змінити колір
            </MenuItem>
            <MenuItem
              onClick={() => {
                setListAction('delete')
                closeMenu()
              }}
            >
              Видалити
            </MenuItem>
          </MenuList>
        )}
      </ContextMenu>
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

export default List
