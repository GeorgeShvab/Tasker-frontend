import Box from '@mui/material/Box'
import { FunctionComponent, useEffect } from 'react'
import { useGetTasksQuery } from '../../api/taskApiSlice'
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
import { useGetTasksCountQuery } from '../../api/taskApiSlice'

const Today: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const tasks = useGetTasksQuery('?period=today')

  const { data: count } = useGetTasksCountQuery()

  useEffect(() => {
    if (!tasks.isLoading) {
      tasks.refetch()
    }
  }, [])

  const handleAddTaskClick = () => {
    dispatch(setTask({ isSideBarOpened: true, task: null }))
  }

  const uncompletedTasks = tasks.data?.uncompletedTasks || []
  const completedTasks = tasks.data?.completedTasks || []

  const title =
    'Сьогоднішні завдання' +
    (uncompletedTasks.length ? ` (${uncompletedTasks.length})` : '')

  useTitle(title)

  return (
    <ContentLayout title={'Сьогоднішні завдання'} count={count?.today}>
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

export default Today
