import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Layout from './components/Layout'
import Registration from './pages/registration'
import useAuthorize from './hooks/useAuthorize'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, useMemo } from 'react'
import { themeSettings } from './theme'
import ProtectRoute from './components/ProtectRoute'
import Notes from './pages/notes'
import List from './pages/list'
import usePage from './hooks/usePage'
import Today from './pages/today'
import Upcoming from './pages/upcoming'
import Tag from './pages/tag'
import Settings from './pages/settings'
import Main from './pages/main'
import InitialLoadingOverlay from './components/InitialLoadingOverlay'
import About from './pages/about'
import Search from './pages/search'
import NotFound from './pages/404'
import AllTasks from './pages/all'

function App() {
  useAuthorize()
  usePage()

  const theme = useMemo(() => themeSettings(), [])

  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ background: theme.palette.background.main }}>
          <Routes>
            <Route path="/" element={<Main />} />
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
            <Route path="/about" element={<About />} />
            <Route
              path="/*"
              element={
                <>
                  <Layout>
                    <Routes>
                      <Route path="/search" element={<Search />} />
                      <Route path="/notes" element={<Notes />} />
                      <Route path="/upcoming" element={<Upcoming />} />
                      <Route path="/today" element={<Today />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/all" element={<AllTasks />} />
                      <Route path="list">
                        <Route path=":id" element={<List />} />
                      </Route>
                      <Route path="tag">
                        <Route path=":id" element={<Tag />} />
                      </Route>
                      <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                  </Layout>
                  <InitialLoadingOverlay />
                </>
              }
            ></Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default App
