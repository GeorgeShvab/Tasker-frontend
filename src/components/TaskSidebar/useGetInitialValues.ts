import { useEffect, useState } from 'react'
import usePage from '../../hooks/usePage'
import { selectTask } from '../../redux/slices/task'
import { useAppSelector } from '../../redux/store'
import { unformatDate } from '../../utils/date'

interface Values {
  name: string
  list: string
  description: string
  date: string
}

const useGetInitialValues = (): Values => {
  const page = usePage()

  const selectedTask = useAppSelector(selectTask)

  const [initialValues, setInitialValues] = useState<Values>({
    name: '',
    description: '',
    list: '',
    date: '',
  })

  useEffect(() => {
    const initialDate =
      (selectedTask.data && unformatDate(selectedTask.data?.date)) ||
      page.page === 'today'
        ? unformatDate(new Date().toISOString())
        : ''

    const initialValues = {
      name: selectedTask.data?.name || selectedTask.defaultValues.name || '',
      description:
        selectedTask.data?.description ||
        selectedTask.defaultValues.description ||
        '',
      list:
        selectedTask.data?.list?._id || selectedTask.defaultValues.list || '',
      date:
        (selectedTask.data && unformatDate(selectedTask.data?.date)) ||
        selectedTask.defaultValues.date ||
        initialDate,
    }

    setInitialValues(initialValues)
  }, [selectedTask])

  return initialValues
}

export default useGetInitialValues
