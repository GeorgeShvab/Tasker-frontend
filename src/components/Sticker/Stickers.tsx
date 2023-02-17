import { Box, Paper, useTheme } from '@mui/material'
import { FunctionComponent } from 'react'
import * as types from '../../../types'
import Sticker from './Sticker'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AddIcon from '@mui/icons-material/Add'
import { useCreateStickerMutation } from '../../api/stickerApiSlice'

const Stickers: FunctionComponent<{ stickers: types.Sticker[] }> = ({
  stickers,
}) => {
  const { palette } = useTheme()

  const stickersNames = stickers.map((item) => item.name)

  const [createSticker] = useCreateStickerMutation()

  const handleCreateSticker = async () => {
    try {
      await createSticker({ name: 'Хаха' }).unwrap()
    } catch (e) {
      console.log('error')
    }
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 0.3333fr))"
      gap="15px"
    >
      <Paper
        sx={{
          padding: '20px',
          backgroundColor: palette.grey[100],
          '&:hover': { backgroundColor: palette.grey[200] },
          transition: 'background 0.15s',
          maxHeight: '400px',
          aspectRatio: '1 / 1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& > *': {
            fontSize: '60px',
          },
        }}
        onClick={handleCreateSticker}
      >
        <AddIcon fontSize="large" />
      </Paper>
      {stickers?.map((item) => (
        <Sticker key={item._id} {...item} />
      ))}
    </Box>
  )
}

export default Stickers
