import { Action, createSlice } from '@reduxjs/toolkit'
import { AuthResponse, User } from '../../../types'

interface AuthState {
  data: User | null
}

interface AuthorizeUserAction extends Action {
  payload: AuthResponse
}

interface SetUserAction extends Action {
  payload: User
}

const initialState: AuthState = {
  data: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorizeUser: (state, action: AuthorizeUserAction) => {
      state.data = action.payload.user

      window.localStorage.setItem('accessToken', action.payload.accessToken)
      window.localStorage.setItem('refreshToken', action.payload.refreshToken)
    },
    setUser: (state, action: SetUserAction) => {
      state.data = action.payload
    },
    unauthorize: (state) => {
      state.data = null

      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('refreshToken')
    },
  },
})

export default authSlice.reducer

export const { authorizeUser, setUser, unauthorize } = authSlice.actions

export const selectUser = ({ auth }: { auth: AuthState }) => auth.data
export const isAuthorized = ({ auth }: { auth: AuthState }) =>
  Boolean(auth.data)
