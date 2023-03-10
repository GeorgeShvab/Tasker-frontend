import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import { FunctionComponent, ReactElement, TouchEvent, useEffect } from 'react'
import { TouchData } from '../../types'
import { selectMenu, toggleMenu } from '../redux/slices/menu'
import { selectTask, setTask } from '../redux/slices/task'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Aside from './Aside/Aside'
import ProtectRoute from './ProtectRoute'
import TaskSidebar from './TaskSidebar/TaskSidebar'
import usePage from '../hooks/usePage'

const Layout: FunctionComponent<{ children: ReactElement }> = ({
  children,
}) => {
  const dispatch = useAppDispatch()

  const { palette } = useTheme()

  const isMenuOpened = useAppSelector(selectMenu)

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const page = usePage()

  useEffect(() => {
    if (
      !['list', 'upcoming', 'tag', 'today', 'search', 'all'].includes(
        page.page || ''
      )
    ) {
      dispatch(setTask({ isSideBarOpened: false }))
    }
  }, [page])

  const touchData: TouchData = {
    xStart: null,
    xEnd: null,
    yStart: null,
    yEnd: null,
  }

  const handleAsideTouchEnd = (e: TouchEvent) => {
    touchData.xEnd = e.changedTouches[0].clientX

    if (touchData.xStart && touchData.xStart > touchData.xEnd + 50) {
      dispatch(toggleMenu())
    }
  }

  const selectedTask = useAppSelector(selectTask)

  const handleContentTouchEnd = (e: TouchEvent) => {
    touchData.xEnd = e.changedTouches[0].clientX
    touchData.yEnd = e.changedTouches[0].clientY

    if (
      touchData.yStart &&
      Math.abs(touchData.yStart - touchData.yEnd) < 125 // check if it is not just vertical touch with some angle
    ) {
      if (touchData.xStart && touchData.xStart + 50 < touchData.xEnd) {
        dispatch(toggleMenu())
      } else if (
        !isMenuOpened &&
        touchData.xStart &&
        touchData.xEnd + 50 < touchData.xStart
      ) {
        dispatch(setTask({ isSideBarOpened: true }))
      } else if (isMenuOpened) {
        dispatch(toggleMenu())
      }
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    touchData.xEnd = null
    touchData.yEnd = null

    touchData.xStart = e.changedTouches[0].clientX
    touchData.yStart = e.changedTouches[0].clientY
  }

  const handleTaskBarTouchEnd = (e: TouchEvent) => {
    touchData.xEnd = e.changedTouches[0].clientX
    touchData.yEnd = e.changedTouches[0].clientY

    if (touchData.yStart && Math.abs(touchData.yStart - touchData.yEnd) < 125) {
      if (touchData.xStart && touchData.xStart + 50 < touchData.xEnd) {
        dispatch(setTask({ isSideBarOpened: false }))
      }
    }
  }

  return (
    <ProtectRoute>
      <Box
        display="flex"
        width="100vw"
        height="var(--full-height)"
        overflow={'hidden'}
      >
        <Box
          flex={isNotMobile ? '0 0 280px' : isMenuOpened ? '0 0 75vw' : '0 0 0'}
          height="100%"
          overflow="auto"
          sx={
            isNotMobile
              ? {
                  '&::-webkit-scrollbar': {
                    width: '5px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: palette.grey.A100,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: palette.grey[200],
                  },
                  overflowX: 'hidden',
                  transition: 'flex 0.5s ease-in-out',
                }
              : {
                  transition: 'flex 0.5s ease-in-out',
                  overflowX: 'hidden',
                }
          }
        >
          <Box
            minWidth={isNotMobile ? undefined : '75vw'}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleAsideTouchEnd}
            height="100%"
          >
            <Aside />
          </Box>
        </Box>
        <Box
          flex={
            isNotMobile
              ? '3 3 auto'
              : selectedTask.isSideBarOpened
              ? '0 3 0'
              : '2 3 100vw'
          }
          onTouchStart={handleTouchStart}
          onTouchEnd={handleContentTouchEnd}
          sx={{ overflow: 'hidden', transition: 'flex 0.5s ease-in-out' }}
        >
          <Box width={isNotMobile ? 'auto' : '100vw'}>{children}</Box>
        </Box>
        <Box
          flex={
            selectedTask.isSideBarOpened
              ? isNotMobile
                ? '0 0 350px'
                : '3 0 100vw'
              : '0 0 0'
          }
          height="var(--full-height)"
          sx={
            isNotMobile
              ? {
                  '&::-webkit-scrollbar': {
                    width: '5px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: palette.grey.A100,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: palette.grey[200],
                  },
                  transition: 'flex 0.5s ease-in-out',
                  overflowX: 'hidden',
                }
              : { transition: 'flex 0.5s ease-in-out', overflowX: 'hidden' }
          }
        >
          <Box
            width={isNotMobile ? '350px' : '100vw'}
            height="var(--full-height)"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTaskBarTouchEnd}
          >
            <TaskSidebar />
          </Box>
        </Box>
      </Box>
    </ProtectRoute>
  )
}

export default Layout
