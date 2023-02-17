import {
  MenuList,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Alert,
  Snackbar,
  TextareaAutosize,
} from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import {
  FunctionComponent,
  useState,
  useRef,
  ClipboardEvent,
  KeyboardEvent,
  ChangeEvent,
  memo,
} from 'react'
import * as types from '../../../types'
import {
  useDeleteStickerMutation,
  useUpdateStickerMutation,
} from '../../api/stickerApiSlice'
import useOutsideClick from '../../hooks/useOutsideClick'
import debounce from '../../utils/debounce'
import throttle from '../../utils/throttle'
import ContextMenu from '../ContextMenu'

type StickerAction = 'delete' | 'change_color'

const Sticker: FunctionComponent<types.Sticker> = ({
  _id,
  name,
  description,
  color,
}) => {
  const [deleteSticker] = useDeleteStickerMutation()
  const [updateSticker] = useUpdateStickerMutation()

  const [focus, setFocus] = useState<boolean>(false)

  const [alertStatus, setAlertStatus] = useState<null | types.AlertStatus>(null)

  const anchorRef = useRef<HTMLDivElement>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const colorInputRef = useRef<HTMLInputElement>(null)

  const descriptionInputEl = useRef<HTMLTextAreaElement>(null)

  const [stickerAction, setStickerAction] = useState<StickerAction | null>(null)

  const handleDeleteSticker = async () => {
    try {
      await deleteSticker(_id).unwrap()
    } catch (e) {
      setAlertStatus({
        status: true,
        msg: 'Помилка при видаленні нотатки',
        type: 'error',
      })
    }

    setStickerAction(null)
  }

  const handleChangeStickerColor = async () => {
    const newColor = colorInputRef.current?.value
    try {
      if (newColor) {
        await updateSticker({
          color: newColor,
          id: _id,
          name,
        }).unwrap()

        setAlertStatus({
          status: true,
          msg: 'Колір нотатки змінено',
          type: 'success',
        })
      } else {
        throw new Error()
      }
    } catch (e) {
      setAlertStatus({
        status: true,
        msg: 'Помилка при зміні кольору нотатки',
        type: 'error',
      })
    }

    setStickerAction(null)
  }

  const handleFocus = () => {
    setFocus(true)
  }

  const handleBlur = () => {
    setFocus(false)
  }

  let handleDescriptionInput: any = async (
    e: ChangeEvent<HTMLTextAreaElement>
  ): Promise<void> => {
    try {
      await updateSticker({
        description: e.target.value,
        id: _id,
        name,
        color,
      }).unwrap()
    } catch (e) {
      setAlertStatus({
        status: true,
        msg: "Не вдалось оновити нотатку, будь ласка, пеервірте з'єднання з інтернетом",
        type: 'error',
      })
    }
  }

  handleDescriptionInput = debounce(handleDescriptionInput, 1500)

  let handleNameInput: any = async (
    e: ChangeEvent<HTMLTextAreaElement>
  ): Promise<void> => {
    try {
      await updateSticker({
        name: e.target.value,
        id: _id,
        description,
        color,
      }).unwrap()
    } catch (e) {
      setAlertStatus({
        status: true,
        msg: "Не вдалось оновити нотатку, будь ласка, перевірте інтернет-з'єднання",
        type: 'error',
      })
    }
  }

  handleNameInput = debounce(handleNameInput, 1500)

  const handleDescriptionWrapperClick = () => {
    if (descriptionInputEl.current === document.activeElement) return
    descriptionInputEl.current?.focus()

    descriptionInputEl.current?.setSelectionRange(
      descriptionInputEl.current?.value.length,
      descriptionInputEl.current?.value.length
    )
  }

  useOutsideClick(containerRef, handleBlur)

  return (
    <>
      <Paper
        sx={{
          aspectRatio: '1 / 1',
          position: 'relative',
          overflow: focus ? 'unset' : 'hidden',
          boxShadow: focus ? 'unset' : undefined,
          paddingBottom: '20px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            position: 'absolute',
            zIndex: focus ? 1 : 0,
            top: '0',
            left: '0',
            height: focus ? 'fit-content' : '100%',
            backgroundColor: '#ffffff',
          }}
          onClick={handleFocus}
          onFocus={handleFocus}
          ref={containerRef}
        >
          <Paper
            ref={anchorRef}
            sx={{
              padding: '20px',
              backgroundColor: focus ? color + '80' : color + '40',
              '&:hover': { backgroundColor: color + '80' },
              transition: 'background 0.15s',
              aspectRatio: '1 / 1',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              height: focus ? 'fit-content' : '100%',
            }}
            elevation={2}
          >
            <Box
              sx={{
                '& *': {
                  padding: '0 !important',
                  border: 'none',
                  outline: 'none',
                },
              }}
              flex="0 3 auto"
            >
              <TextField
                defaultValue={name}
                spellCheck={false}
                inputProps={{
                  style: {
                    fontSize: '18px',
                    lineHeight: '20px',
                    fontWeight: '800',
                  },
                  maxLength: 100,
                }}
                onInput={handleNameInput}
                multiline
                fullWidth
              />
            </Box>
            <Box
              paddingTop="10px"
              overflow="hidden"
              flex="3 1 auto"
              height={focus ? 'fit-content' : '100%'}
              sx={{
                '& *': {
                  padding: '0 !important',
                  border: 'none',
                  outline: 'none',
                  minHeight: '100%',
                },
              }}
              onClick={handleDescriptionWrapperClick}
            >
              <TextField
                defaultValue={description}
                inputRef={descriptionInputEl}
                onInput={handleDescriptionInput}
                inputProps={{ maxLength: 2000 }}
                multiline
                fullWidth
              />
            </Box>
          </Paper>
        </Box>
      </Paper>

      <ContextMenu anchor={anchorRef} placement="auto">
        {(closeMenu) => (
          <MenuList id="composition-menu" aria-labelledby="composition-button">
            <MenuItem
              onClick={() => {
                setStickerAction('change_color')
                closeMenu()
              }}
            >
              Змінити колір
            </MenuItem>
            <MenuItem
              onClick={() => {
                setStickerAction('delete')
                closeMenu()
              }}
            >
              Видалити
            </MenuItem>
          </MenuList>
        )}
      </ContextMenu>
      <Dialog
        open={stickerAction === 'delete'}
        onClose={() => setStickerAction(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Ви впевнені що хочете видалити нотатку?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setStickerAction(null)}>Відмінити</Button>
          <Button onClick={handleDeleteSticker} color="warning" autoFocus>
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={stickerAction === 'change_color'}
        onClose={() => setStickerAction(null)}
        fullWidth
      >
        <DialogTitle>Оберіть новий колір нотатки</DialogTitle>
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
          <Button onClick={() => setStickerAction(null)}>Відмінити</Button>
          <Button onClick={handleChangeStickerColor}>Підтвердити</Button>
        </DialogActions>
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

export default memo(Sticker)
