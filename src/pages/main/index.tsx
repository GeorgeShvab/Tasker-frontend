import Box from '@mui/material/Box'
import { FunctionComponent, useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import image from '../../assets/images/survey.png'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/system'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'
import { isAuthorized } from '../../redux/slices/auth'

const MainPage: FunctionComponent = () => {
  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const [open, setOpen] = useState<boolean>(false)

  const { palette } = useTheme()

  const isUserAuthorized = useAppSelector(isAuthorized)

  useEffect(() => {
    if (isUserAuthorized) {
      setOpen(true)
    }
  }, [isUserAuthorized])

  return (
    <>
      <Box overflow="hidden">
        <Box
          component="header"
          padding="20px 0"
          display="flex"
          justifyContent="center"
        >
          <Logo />
        </Box>
        <Box
          component="main"
          display="flex"
          padding="0 30px"
          height="calc(100vh - 68px)"
          flexDirection={isNotMobile ? undefined : 'column-reverse'}
        >
          <Box
            flex="3 0 50%"
            padding={isNotMobile ? '100px 50px 50px 5%' : '20px 0'}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Box>
              <Typography
                variant="h1"
                fontWeight="800"
                mb="30px"
                fontSize={isNotMobile ? undefined : '26px'}
              >
                Зручний та швидкий застосунок для підвищення вашої
                продуктивності
              </Typography>
              <Typography
                variant={isNotMobile ? 'h5' : 'h6'}
                maxWidth={isNotMobile ? '75%' : '100%'}
                mb="20px"
              >
                <span
                  style={{ fontWeight: '800', color: palette.primary.main }}
                >
                  Tasker
                </span>{' '}
                повністю бесплатний та дозволяє створювати TO-DO списки та
                планувати роботу над персональними, робочими чи шкільними
                проєктами
              </Typography>
              <Box
                display="flex"
                gap="15px"
                justifyContent={isNotMobile ? 'flex-start' : 'center'}
                mb="20px"
              >
                <Link to="/registration">
                  <Button size="large" variant="contained">
                    Реєстрація
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="large" variant="outlined">
                    Про нас
                  </Button>
                </Link>
              </Box>
            </Box>

            <Typography textAlign={isNotMobile ? undefined : 'center'}>
              &copy;2023 Георгій Шваб. Всі права захищено.
              <br />
              Код проєкту можна знайти на моєму{' '}
              <a href="https://github.com/GeorgeShvab">GitHub</a>.
            </Typography>
          </Box>
          <Box flex={isNotMobile ? '0 0 50%' : '0 0 40%'} position="relative">
            <Box
              position="absolute"
              width={isNotMobile ? '160%' : 'auto'}
              height="150%"
              top={isNotMobile ? '-120px' : '-100px'}
              right={isNotMobile ? '-35%' : '-275px'}
            >
              <img src={image} height="100%" style={{ objectFit: 'contain' }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Ви вже авторизовані, перейти до завдань?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Відмінити</Button>
          <Link to="/upcoming">
            <Button>Перейти</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MainPage
