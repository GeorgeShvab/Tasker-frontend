import { Box, useMediaQuery, useTheme } from '@mui/material'
import { FunctionComponent, ReactElement, TouchEvent } from 'react'
import { selectMenu, toggleMenu } from '../redux/slices/menu'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Aside from './Aside/Aside'

interface TouchData {
  start: number | null
  end: number | null
}

const Layout: FunctionComponent<{ children: ReactElement }> = ({
  children,
}) => {
  const dispatch = useAppDispatch()

  const { palette } = useTheme()

  const isMenuOpened = useAppSelector(selectMenu)

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const touchData: TouchData = {
    start: null,
    end: null,
  }

  const handleAsideTouchStart = (e: TouchEvent) => {
    touchData.end = null

    touchData.start = e.changedTouches[0].clientX
  }

  const handleAsideTouchEnd = (e: TouchEvent) => {
    touchData.end = e.changedTouches[0].clientX

    if (touchData.start && touchData.start > touchData.end + 50) {
      dispatch(toggleMenu())
    }
  }

  const handleContentTouchStart = (e: TouchEvent) => {
    touchData.end = null

    touchData.start = e.changedTouches[0].clientX
  }

  const handleContentTouchEnd = (e: TouchEvent) => {
    touchData.end = e.changedTouches[0].clientX

    if (touchData.start && touchData.start + 75 < touchData.end) {
      dispatch(toggleMenu())
    } else if (isMenuOpened) {
      dispatch(toggleMenu())
    }
  }

  return (
    <Box display="flex" width="100vw" overflow={'hidden'}>
      <Box
        flex={isNotMobile ? '0 0 280px' : isMenuOpened ? '0 0 75vw' : '0 0 0'}
        height="100vh"
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
              }
            : {
                transition: 'flex ease-in-out 0.35s',
              }
        }
      >
        <Box
          minWidth="75vw"
          onTouchStart={handleAsideTouchStart}
          onTouchEnd={handleAsideTouchEnd}
        >
          <Aside />
        </Box>
      </Box>
      <Box
        flex={isNotMobile ? '3 0 auto' : '3 0 100vw'}
        onTouchStart={handleContentTouchStart}
        onTouchEnd={handleContentTouchEnd}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout
