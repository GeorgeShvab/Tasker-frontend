import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { FunctionComponent, ReactElement } from 'react'

const MainContentWrapper: FunctionComponent<{
  children: ReactElement
}> = ({ children }) => {
  const { palette } = useTheme()

  return (
    <Box
      padding="15px"
      border={'1px solid ' + palette.grey[100]}
      borderRadius="5px"
    >
      {children}
    </Box>
  )
}

export default MainContentWrapper
