import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'

const About: FunctionComponent = () => {
  return (
    <Box>
      <Box
        component="header"
        padding="20px 0"
        display="flex"
        justifyContent="center"
        zIndex="1"
        mb="30px"
        sx={{
          '@media screen and (max-width: 768px)': {
            mb: '0',
          },
        }}
      >
        <Logo />
      </Box>
      <Box
        padding="0 20px 80px"
        sx={{
          '@media screen and (max-width: 768px)': {
            padding: '0 10px 10px',
          },
        }}
      >
        <Paper
          sx={{
            margin: '0 auto',
            maxWidth: '1200px',
            minHeight: 'calc(100vh - 180px)',
            padding: '40px',
            '@media screen and (max-width: 768px)': {
              padding: '20px',
              minHeight: 'calc(100vh - 20px)',
            },
          }}
        >
          <Typography variant="h1" fontSize="30px" fontWeight="800" mb="50px">
            Про нас
          </Typography>
          <Box mb="30px">
            <Typography variant="h4" mb="15px">
              Що таке Tasker?
            </Typography>
            <Typography mb="10px">
              Tasker це менеджер завдань. Tasker допомагає у покарщенні
              продуктивності, та виступає як покращена версія TODO програми.
              Крім звичайних TODO Tasker також дозволяє робити замітки та списки
              завдань на день, тиждень, тощо.
            </Typography>
            <Typography mb="10px"></Typography>
          </Box>
          <Box mb="30px">
            <Typography variant="h4" mb="15px">
              Для чого створений цей вебсайт?
            </Typography>
            <Typography mb="10px">
              Головна мета створення Tasker це самонавчання frontend розробці.
              Другорядною метою є його використання по призначенню - для
              підвищення продуктивності та менеджменту завданнями для навчання,
              проєктів та буденних справ. Хоча на просторах інтернету багато
              схожих застосунків, проте користуватись власним в рази приємніше
              😁.
            </Typography>
          </Box>
          <Box mb="30px">
            <Typography variant="h4" mb="15px">
              Хто створив Tasker?
            </Typography>
            <Typography mb="10px">
              Вебсайт створений мною, Георгієм Швабом, джуніор розробником. Якщо
              вас зацікавив проєкт, ось його репозиторій у Github. А ось моя
              сторінка у Github, де ви можете знайти й інші мої проєкти. Якщо ви
              скористались вебсайтом, я був би радий отримати фідбек.
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" gap="30px">
            <Link to="/">На головну</Link>
            <Link to="/upcoming">До завдань</Link>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default About
