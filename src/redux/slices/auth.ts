import { Action, createSlice } from '@reduxjs/toolkit'
import { AuthResponse, User } from '../../../types'

interface AuthState {
  data: User | null
}

interface SetUserAction extends Action {
  payload: AuthResponse
}

const initialState: AuthState = {
  data: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: SetUserAction) => {
      state.data = action.payload.user

      window.localStorage.setItem('accessToken', action.payload.accessToken)
      window.localStorage.setItem('refreshToken', action.payload.refreshToken)
    },
  },
})

export default authSlice.reducer

export const { setUser } = authSlice.actions

export const selectUser = ({ auth }: { auth: AuthState }) => auth.data
export const isAuthorized = ({ auth }: { auth: AuthState }) =>
  Boolean(auth.data)
