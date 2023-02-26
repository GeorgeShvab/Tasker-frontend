import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Snackbar from '@mui/material/Snackbar'
import useTheme from '@mui/material/styles/useTheme'
import { FunctionComponent, useState } from 'react'
import * as types from '../../../types'
import Sticker from './Sticker'
import AddIcon from '@mui/icons-material/Add'
import { useCreateStickerMutation } from '../../api/stickerApiSlice'
import useMediaQuery from '@mui/material/useMediaQuery'

const Stickers: FunctionComponent<{
  stickers: types.Sticker[]
  isLoading: boolean
  addButton?: boolean
}> = ({ stickers, isLoading, addButton = true }) => {
  const { palette } = useTheme()

  const [alertStatus, setAlertStatus] = useState<types.AlertStatus | null>(null)

  const [createSticker] = useCreateStickerMutation()

  const handleCreateSticker = async () => {
    try {
      await createSticker({ name: 'Нова нотатка' }).unwrap()
    } catch (e) {
      setAlertStatus({
        status: true,
        msg: "Не вдалось створити нотатку, будь ласка, перевірте інтернет-з'єднання",
        type: 'error',
      })
    }
  }

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  return (
    <Box
      display="grid"
      gridTemplateColumns={isNotMobile ? '1fr 1fr' : '1fr'}
      gap={isNotMobile ? '15px' : '10px'}
    >
      {!isLoading ? (
        <>
          {addButton && (
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
              elevation={2}
              onClick={handleCreateSticker}
            >
              <AddIcon fontSize="large" />
            </Paper>
          )}
          {stickers?.map((item) => (
            <Sticker key={item._id} {...item} />
          ))}
        </>
      ) : (
        new Array(10)
          .fill(null)
          .map((item, index) => (
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={'100%'}
              sx={{ aspectRatio: '1 / 1', borderRadius: 1 }}
              key={index}
            />
          ))
      )}

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
