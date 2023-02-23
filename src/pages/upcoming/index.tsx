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
import ContentOutlinedWrapper from '../../components/ContentOutlinedWrapper'
import AddTask from '../../components/Task/AddTask'
import Tasks from '../../components/Task/Tasks'
import { setTask } from '../../redux/slices/task'
import { useAppDispatch } from '../../redux/store'
import {
  getBeginningOfTheNextWeek,
  getNextDay,
  unformatDate,
} from '../../utils/date'

const Upcoming: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const todayTasks = useGetTasksQuery('?period=today')

  const tomorrowTasks = useGetTasksQuery('?period=tomorrow')

  const weekTasks = useGetTasksQuery('?period=week')

  const nextWeekTasks = useGetTasksQuery('?period=next_week')

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const handleAddTaskClick = (date?: Date) => {
    dispatch(
      setTask({
        isSideBarOpened: true,
        task: null,
        defaultValues: date
          ? { date: unformatDate(new Date(date).toISOString()) }
          : {},
      })
    )
  }

  return (
    <Box maxWidth={isNotMobile ? 'calc(100vw - 280px)' : '100vw'}>
      <Box maxWidth={isNotMobile ? 'calc(100vw - 280px)' : '100vw'}>
        <Box width={isNotMobile ? undefined : '100vw'}>
          <ContentLayout title={'Найближчі завдання'} count={0}>
            <Box
              display="grid"
              gridTemplateColumns="1fr"
              gap={isNotMobile ? '30px' : '20px'}
            >
              <ContentOutlinedWrapper title={'Сьогодні'}>
                <Box>
                  <AddTask onClick={() => handleAddTaskClick(new Date())} />
                  <Box>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary sx={{ paddingLeft: '10px' }}>
                        Дійсні завдання
                      </AccordionSummary>
                      <AccordionDetails>
                        <Tasks
                          tasks={
                            todayTasks.data?.filter(
                              (item) => !item.completed
                            ) || []
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
                          tasks={
                            todayTasks.data?.filter((item) => item.completed) ||
                            []
                          }
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Box>
              </ContentOutlinedWrapper>
              <ContentOutlinedWrapper title={'Завтра'}>
                <Box>
                  <AddTask onClick={() => handleAddTaskClick(getNextDay())} />
                  <Box>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary sx={{ paddingLeft: '10px' }}>
                        Дійсні завдання
                      </AccordionSummary>
                      <AccordionDetails>
                        <Tasks
                          tasks={
                            tomorrowTasks.data?.filter(
                              (item) => !item.completed
                            ) || []
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
                          tasks={
                            tomorrowTasks.data?.filter(
                              (item) => item.completed
                            ) || []
                          }
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Box>
              </ContentOutlinedWrapper>
              <ContentOutlinedWrapper title={'На цьому тижні'}>
                <Box>
                  <AddTask onClick={() => handleAddTaskClick(getNextDay())} />
                  <Box>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary sx={{ paddingLeft: '10px' }}>
                        Дійсні завдання
                      </AccordionSummary>
                      <AccordionDetails>
                        <Tasks
                          tasks={
                            weekTasks.data?.filter((item) => !item.completed) ||
                            []
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
                          tasks={
                            weekTasks.data?.filter((item) => item.completed) ||
                            []
                          }
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Box>
              </ContentOutlinedWrapper>
              <ContentOutlinedWrapper title={'На наступному тижні'}>
                <Box>
                  <AddTask
                    onClick={() =>
                      handleAddTaskClick(getBeginningOfTheNextWeek())
                    }
                  />
                  <Box>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary sx={{ paddingLeft: '10px' }}>
                        Дійсні завдання
                      </AccordionSummary>
                      <AccordionDetails>
                        <Tasks
                          tasks={
                            nextWeekTasks.data?.filter(
                              (item) => !item.completed
                            ) || []
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
                          tasks={
                            nextWeekTasks.data?.filter(
                              (item) => item.completed
                            ) || []
                          }
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Box>
              </ContentOutlinedWrapper>
            </Box>
          </ContentLayout>
        </Box>
      </Box>
    </Box>
  )
}

export default Upcoming
