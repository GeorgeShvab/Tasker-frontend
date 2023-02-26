import Box from '@mui/material/Box'
import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { useGetListQuery } from '../../api/listApiSlice'
import { useGetTasksByListQuery } from '../../api/taskApiSlice'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../../components/Accordion'
import ContentLayout from '../../components/ContentLayout'
import AddTask from '../../components/Task/AddTask'
import Tasks from '../../components/Task/Tasks'
import useTitle from '../../hooks/useTitle'
import { setTask } from '../../redux/slices/task'
import { useAppDispatch } from '../../redux/store'

const List: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()

  const list = useGetListQuery(id || '')

  const tasks = useGetTasksByListQuery(id || '')

  const title = list.data
    ? `${list.data.name}${
        list.data.uncompletedTasks ? ` (${list.data.uncompletedTasks})` : ''
      }`
    : 'Tasker'

  useTitle(title)

  const handleAddTaskClick = () => {
    dispatch(
      setTask({
        isSideBarOpened: true,
        task: null,
        defaultValues: { list: id },
      })
    )
  }

  const uncompletedTasks = tasks.data?.filter((item) => !item.completed) || []
  const completedTasks = tasks.data?.filter((item) => item.completed) || []

  return (
    <ContentLayout
      title={list?.data?.name || ''}
      isLoading={list.isLoading}
      count={list.data?.uncompletedTasks}
    >
      <>
        <AddTask onClick={handleAddTaskClick} />
        <Box>
          <Accordion defaultExpanded={true}>
            <AccordionSummary sx={{ paddingLeft: '10px' }}>
              Дійсні завдання
            </AccordionSummary>
            <AccordionDetails>
              <Tasks tasks={uncompletedTasks} />
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box>
          <Accordion>
            <AccordionSummary sx={{ paddingLeft: '10px' }}>
              Виконані завдання
            </AccordionSummary>
            <AccordionDetails>
              <Tasks tasks={completedTasks} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </>
    </ContentLayout>
  )
}

export default List
