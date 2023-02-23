import { Box, useMediaQuery } from '@mui/material'
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
import { setTask } from '../../redux/slices/task'
import { useAppDispatch } from '../../redux/store'

const List: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()

  const list = useGetListQuery(id || '')

  const tasks = useGetTasksByListQuery(id || '')

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const handleAddTaskClick = () => {
    dispatch(
      setTask({
        isSideBarOpened: true,
        task: null,
        defaultValues: { list: id },
      })
    )
  }

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
                    <Tasks
                      tasks={
                        tasks.data?.filter((item) => !item.completed) || []
                      }
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box>
                <Accordion>
                  <AccordionSummary sx={{ paddingLeft: '10px' }}>
                    Виконані завдання
                  </AccordionSummary>
                  <AccordionDetails>
                    <Tasks
                      tasks={tasks.data?.filter((item) => item.completed) || []}
                    />
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

export default List
