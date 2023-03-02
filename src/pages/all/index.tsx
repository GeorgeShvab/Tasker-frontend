import { FunctionComponent } from 'react'
import { useGetTasksQuery } from '../../api/taskApiSlice'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../../components/Accordion'
import Tasks from '../../components/Task/Tasks'
import { setTask } from '../../redux/slices/task'
import Box from '@mui/material/Box'
import ContentLayout from '../../components/ContentLayout'
import AddTask from '../../components/Task/AddTask'
import { useAppDispatch } from '../../redux/store'

const AllTasks: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const tasks = useGetTasksQuery()

  const completedTasks = tasks.data?.filter((item) => item.completed) || []
  const uncompletedTasks = tasks.data?.filter((item) => !item.completed) || []

  const handleAddTaskClick = () => {
    dispatch(
      setTask({
        isSideBarOpened: true,
      })
    )
  }

  return (
    <ContentLayout title={'Всі завдання'} count={uncompletedTasks?.length}>
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

export default AllTasks
