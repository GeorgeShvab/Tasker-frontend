import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { Provider } from 'react-redux'
import MainPage from './pages/main'
import Login from './pages/login'
import store, { useAppSelector } from './redux/store'
import Layout from './components/Layout'
import Registration from './pages/registration'
import useAuthorize from './hooks/useAuthorize'
import { CssBaseline, Box, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useEffect, useMemo } from 'react'
import { selectMode } from './redux/slices/mode'
import { themeSettings } from './theme'
import ProtectRoute from './components/ProtectRoute'

function App() {
  useAuthorize()

  const mode = useAppSelector(selectMode)
  const theme = useMemo(() => themeSettings(mode), [mode])

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ background: theme.palette.background.main }}>
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectRoute protectFromAuthorized>
                  <Login />
                </ProtectRoute>
              }
            />
            <Route
              path="/registration"
              element={
                <ProtectRoute protectFromAuthorized>
                  <Registration />
                </ProtectRoute>
              }
            />

            <Route
              path="/*"
              element={
                <Layout>
                  <ProtectRoute>
                    <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/notes" element={<></>} />
                      <Route path="/upcoming" element={<></>} />
                      <Route path="/today" element={<></>} />
                      <Route path="list">
                        <Route path=":id" element={<></>} />
                      </Route>
                      <Route path="tag">
                        <Route path=":id" element={<></>} />
                      </Route>
                    </Routes>
                  </ProtectRoute>
                </Layout>
              }
            ></Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default App
