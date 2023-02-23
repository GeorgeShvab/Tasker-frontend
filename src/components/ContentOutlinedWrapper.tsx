import { useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FunctionComponent, ReactElement } from 'react'

const ContentOutlinedWrapper: FunctionComponent<{
  children: ReactElement
  title?: string
}> = ({ children, title }) => {
  const { palette } = useTheme()

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  return (
    <Box
      padding={isNotMobile ? '20px' : '15px'}
      border={'1px solid ' + palette.grey[100]}
      borderRadius="5px"
      position="relative"
    >
      {title && (
        <Typography
          variant="h5"
          fontWeight="800"
          position="absolute"
          padding="10px"
          top="-21px"
          left={isNotMobile ? '17px' : '12px'}
          sx={{ backgroundColor: palette.background.default }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  )
}

export default ContentOutlinedWrapper
