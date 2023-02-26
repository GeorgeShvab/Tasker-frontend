import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import Box from '@mui/material/Box'
import { FunctionComponent, ReactElement } from 'react'

const MainContentWrapper: FunctionComponent<{
  children: ReactElement
}> = ({ children }) => {
  const { palette } = useTheme()

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  return (
    <Box
      padding={isNotMobile ? '15px' : '10px'}
      border={'1px solid ' + palette.grey[100]}
      borderRadius="5px"
    >
      {children}
    </Box>
  )
}

export default MainContentWrapper
