import { useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { FunctionComponent, useState, UIEvent, useEffect } from 'react'
import { useGetStickersQuery } from '../../api/stickerApiSlice'
import MainContentWrapper from '../../components/MainContentWrapper'
import MenuBtn from '../../components/MenuBtn'
import Sticker from '../../components/Sticker/Sticker'
import Stickers from '../../components/Sticker/Stickers'
import Title from '../../components/Title'
import throttle from '../../utils/throttle'

const Notes: FunctionComponent = () => {
  const { data: stickers, isLoading } = useGetStickersQuery()

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
      height="100vh"
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
        <Title>Нотатки</Title>
      </Box>
      <Box
        component="main"
        padding={isNotMobile ? '20px' : '10px'}
        paddingTop={isNotMobile ? '50px' : '20px'}
      >
        <MainContentWrapper>
          <Stickers stickers={stickers || []} isLoading={isLoading} />
        </MainContentWrapper>
      </Box>
    </Box>
  )
}

export default Notes
