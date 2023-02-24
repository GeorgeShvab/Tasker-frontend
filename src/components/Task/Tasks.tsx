import Box from '@mui/material/Box'
import { FunctionComponent, useCallback } from 'react'
import * as types from '../../../types'
import { selectTask, setTask } from '../../redux/slices/task'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import Task from './Task'

const Tasks: FunctionComponent<{
  tasks: types.Task[]
  onStatusToggle?: (task: types.Task) => void
}> = ({ tasks, onStatusToggle }) => {
  const dispatch = useAppDispatch()
  const selectedTask = useAppSelector(selectTask)

  const handleTaskClick = useCallback((task: types.Task) => {
    dispatch(setTask({ isSideBarOpened: true, task }))
  }, [])

  return (
    <Box>
      {tasks.map((item) => (
        <Task
          key={item._id}
          selected={selectedTask?.data?._id === item._id}
          onClick={handleTaskClick}
          onStatusToggle={onStatusToggle}
          {...item}
        />
      ))}
    </Box>
  )
}

export default Tasks
