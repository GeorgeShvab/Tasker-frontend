import { Typography, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { FunctionComponent, ReactElement } from 'react'
import { SxProps } from '@mui/material'

const AsideItem: FunctionComponent<{
  children: ReactElement
  text: string
  sx?: SxProps
}> = ({ children, text, sx }) => {
  const { palette } = useTheme()

  return (
    <Box sx={sx}>
      <Typography
        variant="h6"
        mb="6px"
        fontWeight="600"
        color={palette.grey[800]}
      >
        {text}
      </Typography>
      {children}
    </Box>
  )
}

export default AsideItem
