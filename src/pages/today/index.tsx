import { Box, useMediaQuery } from '@mui/material'
import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { useGetListQuery } from '../../api/listApiSlice'
import {
  useGetTasksByListQuery,
  useGetTasksQuery,
} from '../../api/taskApiSlice'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../../components/Accordion'
import ContentLayout from '../../components/ContentLayout'
import AddTask from '../../components/Task/AddTask'
import Tasks from '../../components/Task/Tasks'
import { setTask } from '../../redux/slices/task'
import { useAppDispatch } from '../../redux/store'

const Today: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const tasks = useGetTasksQuery('?period=today')

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const handleAddTaskClick = () => {
    dispatch(setTask({ isSideBarOpened: true, task: null }))
  }

  const uncompletedTasks = tasks.data?.filter((item) => !item.completed) || []
  const completedTasks = tasks.data?.filter((item) => item.completed) || []

  return (
    <Box
      display="flex"
      maxWidth={isNotMobile ? 'calc(100vw - 280px)' : '100vw'}
      overflow="hidden"
    >
      <Box
        flex={isNotMobile ? '1 3 auto' : '1 3 auto'}
        maxWidth={isNotMobile ? 'calc(100vw - 280px)' : '100vw'}
        overflow="hidden"
      >
        <Box width={isNotMobile ? undefined : '100vw'}>
          <ContentLayout
            title={'Сьогоднішні завдання'}
            count={tasks.data?.length}
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
        </Box>
      </Box>
    </Box>
  )
}

export default Today
