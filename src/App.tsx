import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import MainPage from './pages/main'
import Login from './pages/login'
import store from './redux/store'
import Layout from './components/Layout'
import Registration from './pages/registration'
import useAuthorize from './hooks/useAuthorize'

function App() {
  useAuthorize()

  return (
    <div className="app">
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  )
}

export default App
