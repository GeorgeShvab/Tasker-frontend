import { useMediaQuery, Box, useTheme, Skeleton } from '@mui/material'
import { FunctionComponent, ReactElement, UIEvent, useState } from 'react'
import throttle from '../utils/throttle'
import MenuBtn from './MenuBtn'
import Title from './Title'

const ContentLayout: FunctionComponent<{
  children: ReactElement
  title: string
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
        padding={isNotMobile ? '15px 30px' : '15px 10px'}
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
        display={isNotMobile ? 'block' : 'flex'}
        gap="20px"
        alignItems="center"
      >
        {!isNotMobile && <MenuBtn />}
        {!isLoading ? (
          <Title count={count}>{title}</Title>
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
