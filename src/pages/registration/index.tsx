import { Paper, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { FunctionComponent } from 'react'
import CenterContainer from '../../components/CenterContainer'
import { useAppSelector } from '../../redux/store'
import RegistrationForm from './Form'
import image from '../../assets/images/survey.png'
import Logo from '../../components/Logo'
import { Navigate } from 'react-router-dom'
import { isAuthorized } from '../../redux/slices/auth'

const Registration: FunctionComponent = () => {
  const theme = useTheme()

  const isMobile = useMediaQuery('(max-width: 768px)')

  const isUserAuthorized = useAppSelector(isAuthorized)

  if (isUserAuthorized) {
    return <Navigate to="/" />
  }

  return (
    <CenterContainer position="relative" minHeight="100vh" overflow="hidden">
      <Box
        padding={isMobile ? '0' : '20px'}
        display="flex"
        justifyContent="center"
        position="absolute"
        top="20px"
      >
        <Logo sx={{ textAlign: 'center' }} />
      </Box>

      <Paper
        sx={{
          display: 'flex',
          maxWidth: '875px',
          overflow: isMobile ? 'unset' : 'hidden',
          width: '100%',
          borderRadius: isMobile ? '0' : undefined,
          background: isMobile
            ? theme.palette.background.main
            : theme.palette.background.light,
          flexDirection: isMobile ? 'column-reverse' : undefined,
        }}
        elevation={isMobile ? 0 : 2}
      >
        <Box
          padding={isMobile ? '45px 30px' : '45px 50px 45px 70px'}
          flex="0 0 52.5%"
        >
          <RegistrationForm />
        </Box>
        <Box flex="0 0 47.5%" position="relative" minHeight="200px">
          <img
            src={image}
            alt="Вітаємо"
            height={isMobile ? '180%' : '120%'}
            width={isMobile ? '95%' : 'auto'}
            style={{
              objectFit: 'contain',
              position: 'absolute',
              top: isMobile ? '-70px' : '-50px',
              right: isMobile ? '-30%' : undefined,
            }}
          />
        </Box>
      </Paper>
    </CenterContainer>
  )
}

export default Registration