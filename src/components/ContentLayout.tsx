import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'
import Skeleton from '@mui/material/Skeleton'
import { FunctionComponent, ReactElement, UIEvent, useState } from 'react'
import usePage from '../hooks/usePage'
import throttle from '../utils/throttle'
import MenuBtn from './MenuBtn'
import Title from './Title'

const ContentLayout: FunctionComponent<{
  children: ReactElement
  title: string | ReactElement
  count?: number
  isLoading?: boolean
}> = ({ children, title, count, isLoading }) => {
  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const [scrolled, setScrolled] = useState(false)

  const { palette } = useTheme()

  let handleScroll = (e: UIEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).scrollTop < 50) {
      setScrolled(false)
    } else if (!scrolled) {
      setScrolled(true)
    }
  }

  handleScroll = throttle(handleScroll, 25)

  const page = usePage()

  return (
    <Box
      height="var(--full-height)"
      overflow="auto"
      position="relative"
      onScroll={handleScroll}
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
          : {}
      }
    >
      <Box
        component="header"
        padding={isNotMobile ? '22px 30px' : '15px 10px'}
        position="sticky"
        width="100%"
        zIndex="2"
        top="0"
        sx={{
          backgroundColor: palette.background.main,
        }}
        borderBottom={
          scrolled
            ? '1px solid ' + palette.grey.A200
            : '1px solid ' + palette.grey.A200 + '00'
        }
        display="flex" //{isNotMobile ? 'flex' : 'flex'}
        gap={isNotMobile ? '20px' : '10px'}
        alignItems="center"
      >
        {!isNotMobile && <MenuBtn />}
        {!isLoading ? (
          typeof title === 'string' ? (
            <Title count={count}>{title}</Title>
          ) : (
            title
          )
        ) : (
          <Skeleton
            variant="rectangular"
            width="200px"
            height="35px"
            sx={{ borderRadius: 1 }}
          />
        )}
      </Box>
      <Box
        component="main"
        padding={isNotMobile ? '20px' : '10px'}
        paddingTop={isNotMobile ? '50px' : '20px'}
      >
        {children}
      </Box>
    </Box>
  )
}

export default ContentLayout
