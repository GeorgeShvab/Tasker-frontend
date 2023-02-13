import { createSlice } from '@reduxjs/toolkit'
import { Mode } from '../../../types.js'

interface ModeState {
  mode: Mode
}

const initialState: ModeState = {
  mode: 'light',
}

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
})

export default modeSlice.reducer

export const { toggleMode } = modeSlice.actions

export const selectMode = ({ mode }: { mode: ModeState }) => mode.mode
