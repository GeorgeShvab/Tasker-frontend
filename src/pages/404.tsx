import Box from '@mui/material/Box'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import CenterContainer from '../components/CenterContainer'
import image from '../assets/images/404.png'
import Typography from '@mui/material/Typography'
import useTitle from '../hooks/useTitle'

const NotFoundPage: FunctionComponent = () => {
  useTitle('Сторінку не знайдено')

  return (
    <CenterContainer height="var(--full-height)">
      <Box padding="20px" maxWidth="500px" width="100%" textAlign="center">
        <img src={image} style={{ width: '100%' }} alt="Сторінка не знайдена" />
        <Typography variant="h4" mb="20px">
          Сторінку не знайдено
        </Typography>
        <Typography display="flex" gap="20px" justifyContent="center">
          <Link to="/">На головну</Link> <Link to="/upcoming">До завдань</Link>
        </Typography>
      </Box>
    </CenterContainer>
  )
}

export default NotFoundPage
