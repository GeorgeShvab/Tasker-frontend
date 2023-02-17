import { createSlice } from '@reduxjs/toolkit'

interface MenuState {
  state: boolean
}

const initialState: MenuState = {
  state: false,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.state = !state.state
    },
  },
})

export default menuSlice.reducer

export const { toggleMenu } = menuSlice.actions

export const selectMenu = ({ menu }: { menu: MenuState }) => menu.state
