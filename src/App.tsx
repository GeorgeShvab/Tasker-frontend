import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import Main from './pages/main'
import Login from './pages/login'
import store from './redux/store'
import Layout from './components/Layout'
import Registration from './pages/registration'

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </Provider>
    </div>
  )
}

export default App
