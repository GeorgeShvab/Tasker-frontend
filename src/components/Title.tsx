import { useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { FunctionComponent } from 'react'

const Title: FunctionComponent<{
  children: string
  count?: number
  sx?: SxProps
}> = ({ children, count, sx }) => {
  const { palette } = useTheme()

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  return (
    <Box display={count ? 'flex' : 'block'} sx={sx} alignItems="center">
      <Typography
        variant="h1"
        fontWeight="800"
        fontSize={isNotMobile ? '30px' : '20px'}
        marginRight={(count && '20px') || undefined}
      >
        {children}
      </Typography>
      {Boolean(count) && isNotMobile && (
        <Typography
          variant="h4"
          fontWeight="800"
          lineHeight="33px"
          minWidth="35px"
          textAlign="center"
          border={'1px solid ' + palette.grey[100]}
          borderRadius="5px"
        >
          {count}
        </Typography>
      )}
    </Box>
  )
}

export default Title
