import { Action, createSlice } from '@reduxjs/toolkit'
import { AuthResponse, User } from '../../../types'

interface AuthState {
  data: User | null
  isLoading: boolean
}

interface AuthorizeUserAction extends Action {
  payload: AuthResponse
}

interface SetUserAction extends Action {
  payload: User
}

const initialState: AuthState = {
  data: null,
  isLoading: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorizeUser: (state, action: AuthorizeUserAction) => {
      state.data = action.payload.user
      state.isLoading = false

      window.localStorage.setItem('accessToken', action.payload.accessToken)
      window.localStorage.setItem('refreshToken', action.payload.refreshToken)
    },
    setUser: (state, action: SetUserAction) => {
      state.data = action.payload
      state.isLoading = false
    },
    unauthorize: (state) => {
      state.data = null

      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('refreshToken')
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload
    },
  },
})

export default authSlice.reducer

export const { authorizeUser, setUser, unauthorize, setLoading } =
  authSlice.actions

export const selectUser = ({ auth }: { auth: AuthState }) => auth
export const isAuthorized = ({ auth }: { auth: AuthState }) =>
  Boolean(auth.data)
