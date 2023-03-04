import { FormikHelpers } from 'formik'
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../../api/taskApiSlice'
import { useCallback, useState } from 'react'
import { AlertStatus, Tag } from '../../../types'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { selectTask, setTask } from '../../redux/slices/task'
import useMediaQuery from '@mui/material/useMediaQuery'
import { formatDate } from '../../utils/date'

interface FormValues {
  name: string
  description: string
  date: string
  list: string
}

//I am not sure about this emplementation but decided to put most of logic in hook

const useTaskActions = () => {
  const dispatch = useAppDispatch()

  const [createTask] = useCreateTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const [tags, setTags] = useState<Tag[]>([])

  const [alert, setAlert] = useState<AlertStatus | null>(null)

  const selectedTask = useAppSelector(selectTask)

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const handleDeleteTask = useCallback(async () => {
    if (selectedTask.data) {
      try {
        await deleteTask({
          ...selectedTask.data,
          list: selectedTask.data?.list,
        }).unwrap()

        setAlert(null)

        dispatch(
          setTask({ task: null, isSideBarOpened: isNotMobile ? true : false })
        )
      } catch (e) {
        setAlert({
          status: true,
          msg: 'Не вдалось видалити завдання',
          type: 'error',
        })
      }
    }
  }, [selectedTask, isNotMobile])

  const handleCreateTask = useCallback(
    async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
      try {
        let taskDate = formatDate(values.date)

        await createTask({
          ...values,
          date: taskDate,
          tags: tags.map((item) => item._id),
          list: values.list || null,
        }).unwrap()

        if (!isNotMobile) {
          dispatch(setTask({ isSideBarOpened: false }))
        }

        setAlert(null)

        resetForm()
        setTags([])
      } catch (e) {
        setAlert({
          status: true,
          msg: 'Не вдалось створити завдання',
          type: 'error',
        })
      }
    },
    [tags, selectTask, isNotMobile]
  )

  const handleUpdateTask = useCallback(
    async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      try {
        let taskDate = formatDate(values.date)

        await updateTask({
          ...values,
          _id: selectedTask.data?._id || '',
          tags: tags.map((item) => item._id),
          date: taskDate,
          prevList: selectedTask.data?.list?._id,
        }).unwrap()

        if (!isNotMobile) {
          dispatch(setTask({ isSideBarOpened: false }))
        }

        setAlert(null)
      } catch (e) {
        setAlert({
          status: true,
          msg: 'Не вдалось оновити завдання',
          type: 'error',
        })
      }
    },
    [tags, selectedTask, isNotMobile]
  )

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (!values.name) {
      actions.setErrors({ name: 'Введіть назву' })
      return
    }

    if (selectedTask.data) {
      handleUpdateTask(values, actions)
    } else {
      handleCreateTask(values, actions)
    }
  }

  return { handleDeleteTask, handleSubmit, alert, setAlert, tags, setTags }
}

export default useTaskActions
