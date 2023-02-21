import { Box, useMediaQuery, useTheme, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TouchData } from '../../../types'
import { useGetListQuery } from '../../api/listApiSlice'
import { useGetTasksByListQuery } from '../../api/taskApiSlice'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../../components/Accordion'
import ContentLayout from '../../components/ContentLayout'
import MainContentWrapper from '../../components/MainContentWrapper'
import AddTask from '../../components/Task/AddTask'
import Tasks from '../../components/Task/Tasks'
import TaskOptions from '../../components/TaskOptions'
import { toggleMenu } from '../../redux/slices/menu'
import { selectTask, setTask } from '../../redux/slices/task'
import { useAppDispatch, useAppSelector } from '../../redux/store'

const List: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const selectedTask = useAppSelector(selectTask)

  const { palette } = useTheme()

  const { id } = useParams()

  const list = useGetListQuery(id || '')

  const tasks = useGetTasksByListQuery(id || '')

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const handleAddTaskClick = () => {
    dispatch(setTask({ isSideBarOpened: true, task: null }))
  }

  const touchData: TouchData = {
    xStart: null,
    xEnd: null,
    yStart: null,
    yEnd: null,
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
