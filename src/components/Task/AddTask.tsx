import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import { FunctionComponent } from 'react'
import AddIcon from '@mui/icons-material/Add'

const AddTask: FunctionComponent<{ onClick?: () => void }> = ({ onClick }) => {
  const { palette } = useTheme()

  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <Box
      padding="5px 30px 5px 5px"
      sx={{
        '&:hover': {
          backgroundColor: palette.background.dark,
        },
        border: '1px solid ' + palette.grey.A200,
        cursor: 'pointer',
      }}
      borderRadius={1}
      onClick={handleClick}
      position="relative"
      mb="15px"
    >
      <Box display="flex" alignItems="center" gap="10px">
        <IconButton>
          <AddIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="500">
          Додати завдання
        </Typography>
      </Box>
    </Box>
  )
}

export default AddTask
