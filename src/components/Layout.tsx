import { Box, useMediaQuery, useTheme } from '@mui/material'
import { FunctionComponent, ReactElement } from 'react'
import Aside from './Aside/Aside'

const Layout: FunctionComponent<{ children: ReactElement }> = ({
  children,
}) => {
  const { palette } = useTheme()

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  return (
    <Box display="flex">
      <Box
        flex="0 0 280px"
        height="100vh"
        overflow="auto"
        sx={
          isNotMobile
            ? {
                '&::-webkit-scrollbar': {
                  width: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: palette.grey.A100,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: palette.grey[200],
                },
              }
            : {}
        }
      >
        <Aside />
      </Box>
      <Box component="main" flex="3 0 auto">
        {children}
      </Box>
    </Box>
  )
}

export default Layout
