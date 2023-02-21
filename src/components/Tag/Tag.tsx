import {
  Alert,
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
import Box from '@mui/material/Box'
import { Formik } from 'formik'
import { FunctionComponent, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as tags from '../../../types'
import {
  useDeleteTagMutation,
  useUpdateTagMutation,
} from '../../api/tagApiSlice'
import ContextMenu from '../ContextMenu'
import * as yup from 'yup'
import { useDrag } from 'react-dnd'

type TagAction = 'delete' | 'rename' | 'change_color' | null

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

const Tag: FunctionComponent<tags.Tag & { selected: boolean }> = ({
  _id,
  name,
  color,
  createdAt,
  updatedAt,
  selected,
}) => {
  const { palette } = useTheme()

  const [tagAction, setTagAction] = useState<TagAction>(null)

  const [alertStatus, setAlertStatus] = useState<null | AlertStatus>(null)

  const anchorRef = useRef<HTMLButtonElement>(null)

  const colorInputRef = useRef<HTMLInputElement>(null)

  const [deleteTag] = useDeleteTagMutation()
  const [updateTag] = useUpdateTagMutation()

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'Tag',
    item: { _id, name, color, createdAt, updatedAt },
  }))

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
      <Link to={'/tag/' + _id} style={{ maxWidth: '100%' }} ref={drag}>
        <Box
          sx={{
            backgroundColor: selected ? color + 'd9' : color + '80',
            '&:hover': { backgroundColor: color + 'bf' },
            transition: 'background 0.15s',
          }}
          borderRadius="5px"
          padding="4px 10px"
          width="fit-content"
          maxWidth="100%"
          ref={anchorRef}
        >
          <Typography
            color={palette.grey[700]}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxWidth="100%"
          >
            {name}
          </Typography>
        </Box>
      </Link>
      <ContextMenu anchor={anchorRef}>
        {(closeMenu) => (
          <MenuList id="composition-menu" aria-labelledby="composition-button">
            <MenuItem
              onClick={() => {
                setTagAction('rename')
                closeMenu()
              }}
            >
              Змінити назву
            </MenuItem>
            <MenuItem
              onClick={() => {
                setTagAction('change_color')
                closeMenu()
              }}
            >
              Змінити колір
            </MenuItem>
            <MenuItem
              onClick={() => {
                setTagAction('delete')
                closeMenu()
              }}
            >
              Видалити
            </MenuItem>
          </MenuList>
        )}
      </ContextMenu>
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

export default Tag
