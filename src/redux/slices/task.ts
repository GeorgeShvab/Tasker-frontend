import { Action, createSlice } from '@reduxjs/toolkit'
import { Task } from '../../../types'

interface TaskState {
  data: Task | null
  isSideBarOpened: boolean
}

interface SetTaskAction extends Action {
  payload: { task?: Task | null; isSideBarOpened?: boolean }
}

const initialState: TaskState = {
  data: null,
  isSideBarOpened: false,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state, action: SetTaskAction) => {
      state.data =
        action.payload.task || action.payload.task === null
          ? action.payload.task
          : state.data
      state.isSideBarOpened =
        action.payload.isSideBarOpened === undefined
          ? state.isSideBarOpened
          : action.payload.isSideBarOpened
    },
  },
})

export default taskSlice.reducer

export const { setTask } = taskSlice.actions

export const selectTask = ({ task }: { task: TaskState }) => task
