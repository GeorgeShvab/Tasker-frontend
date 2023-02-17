import { useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { FunctionComponent, useState, UIEvent, useEffect } from 'react'
import { useGetStickersQuery } from '../../api/stickerApiSlice'
import MainContentWrapper from '../../components/MainContentWrapper'
import Sticker from '../../components/Sticker/Sticker'
import Stickers from '../../components/Sticker/Stickers'
import Title from '../../components/Title'
import throttle from '../../utils/throttle'

const Notes: FunctionComponent = () => {
  const { data: stickers } = useGetStickersQuery()

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

  handleScroll = throttle(handleScroll, 50)

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
        padding="15px 30px"
        position="sticky"
        width="100%"
        zIndex="2"
        top="0"
        sx={{
          backgroundColor: palette.background.main,
          /*'&::after': {
            dispaly: 'block',
            height: '1px',
            width: '100%',
            content: `""`,
            background: scrolled ? palette.grey.A200 : palette.grey.A200 + '00',
          },*/
        }}
        borderBottom={
          scrolled
            ? '1px solid ' + palette.grey.A200
            : '1px solid ' + palette.grey.A200 + '00'
        }
      >
        <Title>Нотатки</Title>
      </Box>
      <Box component="main" padding="20px" paddingTop="50px">
        <MainContentWrapper>
          <Stickers stickers={stickers || []} />
        </MainContentWrapper>
      </Box>
    </Box>
  )
}

export default Notes
