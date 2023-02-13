import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { FunctionComponent, ReactElement, useEffect, useMemo } from 'react'
import { selectMode } from '../redux/slices/mode'
import { useAppSelector } from '../redux/store'
import { themeSettings } from '../theme'

const Layout: FunctionComponent<{ children: ReactElement }> = ({
  children,
}) => {
  const mode = useAppSelector(selectMode)
  const theme = useMemo(() => themeSettings(mode), [mode])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ background: theme.palette.background.main }}>{children}</Box>
      </ThemeProvider>
    </>
  )
}

export default Layout
