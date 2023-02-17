import { Alert, Box, Paper, Snackbar, useTheme } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import * as types from '../../../types'
import Sticker from './Sticker'
import AddIcon from '@mui/icons-material/Add'
import { useCreateStickerMutation } from '../../api/stickerApiSlice'
import useMediaQuery from '@mui/material/useMediaQuery'

const Stickers: FunctionComponent<{ stickers: types.Sticker[] }> = ({
  stickers,
}) => {
  const { palette } = useTheme()

  const [alertStatus, setAlertStatus] = useState<types.AlertStatus | null>(null)

  const [createSticker] = useCreateStickerMutation()

  const handleCreateSticker = async () => {
    try {
      await createSticker({ name: 'Новий список' }).unwrap()
    } catch (e) {
      setAlertStatus({
        status: true,
        msg: "Не вдалось створити нотатку, будь ласка, перевірте інтернет-з'єднання",
        type: 'error',
      })
    }
  }

  let gridTemplateColumns: string = 'repeat(auto-fit, minmax(300px, 0.3333fr))'

  //const isGreaterThan800 = useMediaQuery('(min-width: 800px)')
  //const isGreaterThan872 = useMediaQuery('(min-width: 872px)')
  const isGreaterThan1290 = useMediaQuery('(min-width: 1290px)')
  const isGreaterThan924 = useMediaQuery('(min-width: 924px)')

  if (isGreaterThan1290) {
    gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 0.3333fr))'
  } else if (isGreaterThan924) {
    gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 0.5fr))'
  } else {
    gridTemplateColumns = '1fr'
  }

  return (
    <Box display="grid" gridTemplateColumns={gridTemplateColumns} gap="15px">
      <Paper
        sx={{
          padding: '20px',
          backgroundColor: palette.grey[100],
          '&:hover': { backgroundColor: palette.grey[200] },
          transition: 'background 0.15s',
          aspectRatio: '1 / 1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& > *': {
            fontSize: '55px !important',
          },
        }}
        onClick={handleCreateSticker}
      >
        <AddIcon fontSize="large" />
      </Paper>
      {stickers?.map((item) => (
        <Sticker key={item._id} {...item} />
      ))}
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
    </Box>
  )
}

export default Stickers
