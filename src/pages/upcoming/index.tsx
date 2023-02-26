import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FunctionComponent } from 'react'
import { useGetTasksQuery } from '../../api/taskApiSlice'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../../components/Accordion'
import ContentLayout from '../../components/ContentLayout'
import ContentOutlinedWrapper from '../../components/ContentOutlinedWrapper'
import AddTask from '../../components/Task/AddTask'
import Tasks from '../../components/Task/Tasks'
import useTitle from '../../hooks/useTitle'
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

  const uncompletedTodayTasks =
    todayTasks.data?.filter((item) => !item.completed) || []
  const completedTodayTasks =
    todayTasks.data?.filter((item) => item.completed) || []

  const uncompletedTomorrowTasks =
    tomorrowTasks.data?.filter((item) => !item.completed) || []
  const completedTomorrowTasks =
    tomorrowTasks.data?.filter((item) => item.completed) || []

  const uncompletedWeekTasks =
    weekTasks.data?.filter((item) => !item.completed) || []
  const completedWeekTasks =
    weekTasks.data?.filter((item) => item.completed) || []

  const uncompletedNextWeekTasks =
    nextWeekTasks.data?.filter((item) => !item.completed) || []
  const completedNextWeekTasks =
    nextWeekTasks.data?.filter((item) => item.completed) || []

  const title =
    'Найближчі завдання' +
    (uncompletedTodayTasks.length +
    uncompletedTomorrowTasks.length +
    uncompletedWeekTasks.length +
    uncompletedNextWeekTasks.length
      ? ` (${
          uncompletedTodayTasks.length +
          uncompletedTomorrowTasks.length +
          uncompletedWeekTasks.length +
          uncompletedNextWeekTasks.length
        })`
      : '')

  useTitle(title)

  return (
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
                  <Tasks tasks={uncompletedTodayTasks} />
                </AccordionDetails>
              </Accordion>
            </Box>

            <Box>
              <Accordion>
                <AccordionSummary sx={{ paddingLeft: '10px' }}>
                  Виконані завдання
                </AccordionSummary>
                <AccordionDetails>
                  <Tasks tasks={completedTodayTasks} />
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
                  <Tasks tasks={uncompletedTomorrowTasks} />
                </AccordionDetails>
              </Accordion>
            </Box>

            <Box>
              <Accordion>
                <AccordionSummary sx={{ paddingLeft: '10px' }}>
                  Виконані завдання
                </AccordionSummary>
                <AccordionDetails>
                  <Tasks tasks={completedTomorrowTasks} />
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
                  <Tasks tasks={uncompletedWeekTasks} />
                </AccordionDetails>
              </Accordion>
            </Box>

            <Box>
              <Accordion>
                <AccordionSummary sx={{ paddingLeft: '10px' }}>
                  Виконані завдання
                </AccordionSummary>
                <AccordionDetails>
                  <Tasks tasks={completedWeekTasks} />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </ContentOutlinedWrapper>
        <ContentOutlinedWrapper title={'На наступному тижні'}>
          <Box>
            <AddTask
              onClick={() => handleAddTaskClick(getBeginningOfTheNextWeek())}
            />
            <Box>
              <Accordion defaultExpanded={true}>
                <AccordionSummary sx={{ paddingLeft: '10px' }}>
                  Дійсні завдання
                </AccordionSummary>
                <AccordionDetails>
                  <Tasks tasks={uncompletedNextWeekTasks} />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box>
              <Accordion>
                <AccordionSummary sx={{ paddingLeft: '10px' }}>
                  Виконані завдання
                </AccordionSummary>
                <AccordionDetails>
                  <Tasks tasks={completedNextWeekTasks} />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </ContentOutlinedWrapper>
      </Box>
    </ContentLayout>
  )
}

export default Upcoming
