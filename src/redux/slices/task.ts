import { Action, createSlice } from '@reduxjs/toolkit'
import { Tag, Task } from '../../../types'

interface DefaultValues {
  name?: string
  description?: string
  date?: string
  list?: string
  tags?: Tag[]
}

interface TaskState {
  data: Task | null
  isSideBarOpened: boolean
  defaultValues: DefaultValues
}

interface SetTaskAction extends Action {
  payload: {
    task?: Task | null
    isSideBarOpened?: boolean
    defaultValues?: DefaultValues
  }
}

const initialState: TaskState = {
  data: null,
  isSideBarOpened: false,
  defaultValues: {},
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
      state.defaultValues = action.payload?.defaultValues
        ? action.payload.defaultValues
        : {}
    },
  },
})

export default taskSlice.reducer

export const { setTask } = taskSlice.actions

export const selectTask = ({ task }: { task: TaskState }) => task
