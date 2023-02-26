import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { FunctionComponent, useRef, useState } from 'react'
import { AlertStatus, Sticker } from '../../../types'
import {
  useDeleteStickerMutation,
  useUpdateStickerMutation,
} from '../../api/stickerApiSlice'

type StickerAction = 'delete' | 'change_color' | null

const StickerActions: FunctionComponent<
  Sticker & {
    setStickerAction: (data: StickerAction) => void
    stickerAction: StickerAction
  }
> = ({ name, description, _id, color, stickerAction, setStickerAction }) => {
  const colorInputRef = useRef<HTMLInputElement>(null)

  const [alertStatus, setAlertStatus] = useState<null | AlertStatus>(null)

  const [deleteSticker] = useDeleteStickerMutation()
  const [updateSticker] = useUpdateStickerMutation()

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

  return (
    <>
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
    </>
  )
}

export default StickerActions
