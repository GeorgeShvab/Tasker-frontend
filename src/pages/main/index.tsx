import Box from '@mui/material/Box'
import { FunctionComponent, useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import image from '../../assets/images/survey.png'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
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
      <Box
        height="auto"
        position="relative"
        minHeight="100vh"
        overflow="hidden"
      >
        <Box
          component="header"
          padding="20px 0"
          display="flex"
          justifyContent="center"
          zIndex="1"
        >
          <Logo />
        </Box>
        <Box
          component="main"
          display="flex"
          padding={isNotMobile ? '0 30px' : '0 15px'}
          minHeight="calc(100vh - 68px)"
          height={isNotMobile ? 'calc(100vh - 68px)' : undefined}
          flexDirection={isNotMobile ? undefined : 'column-reverse'}
          width={'100%'}
        >
          <Box
            flex="3 0 50%"
            padding={isNotMobile ? '100px 50px 50px 5%' : '30px 0'}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Box zIndex="1">
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
                mb={isNotMobile ? '20px' : '40px'}
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
                flexWrap="wrap"
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

            <Typography
              textAlign={isNotMobile ? undefined : 'center'}
              paddingBottom="15px"
            >
              <Typography mb="15px">
                Вже авторизовані? <Link to="/upcoming">Перейти до завдань</Link>
              </Typography>
              &copy;2023 Георгій Шваб. Всі права захищено.
              <br />
              Код проєкту можна знайти на моєму{' '}
              <a href="https://github.com/GeorgeShvab">GitHub</a>.
            </Typography>
          </Box>
          <Box flex="0 0 50%" minHeight="200px" position="relative">
            <img
              src={image}
              alt="Вітаємо"
              height={isNotMobile ? '140%' : '180%'}
              width={isNotMobile ? 'auto' : '110%'}
              style={{
                objectFit: 'contain',
                position: 'absolute',
                top: isNotMobile ? '-100px' : '-90px',
                right: isNotMobile ? '-35%' : '-43%',
                left: isNotMobile ? '-30%' : undefined,
              }}
            />
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
