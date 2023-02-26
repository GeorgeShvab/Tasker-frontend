import Typography from '@mui/material/Typography'
import { SxProps, useTheme } from '@mui/material/styles'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const Logo: FC<{ sx?: SxProps }> = ({ sx }) => {
  const theme = useTheme()

  return (
    <Typography
      variant="h3"
      fontWeight="800"
      sx={{ width: 'fit-content', ...sx }}
      color={theme.palette.primary.main}
    >
      Tasker
    </Typography>
  )
}

export default Logo
