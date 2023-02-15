import { SxProps, Typography, useTheme } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const Logo: FC<{ sx?: SxProps }> = ({ sx }) => {
  const theme = useTheme()

  return (
    <Link to="/">
      <Typography
        variant="h3"
        fontWeight="800"
        sx={{ width: 'fit-content', ...sx }}
        color={theme.palette.primary.main}
      >
        Tasker
      </Typography>
    </Link>
  )
}

export default Logo
