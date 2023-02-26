import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import { FunctionComponent } from 'react'
import ContentLayout from '../../components/ContentLayout'
import ContentOutlinedWrapper from '../../components/ContentOutlinedWrapper'
import NameForm from './NameForm'
import PasswordForm from './PasswordForm'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'

const Settings: FunctionComponent = () => {
  const isNotMobile = useMediaQuery('(min-width: 769px)')

  useTitle('Налаштування')

  return (
    <ContentLayout title="Налаштування">
      <Box
        display="grid"
        gridTemplateColumns={isNotMobile ? '1fr 1fr' : '1fr'}
        gap={isNotMobile ? '20px' : '10px'}
      >
        <ContentOutlinedWrapper
          sx={{
            background: '#ffffff',
          }}
        >
          <NameForm />
        </ContentOutlinedWrapper>

        <ContentOutlinedWrapper
          sx={{
            background: '#ffffff',
            borderRadius: 1,
            gridColumn: isNotMobile ? '2 / 3' : undefined,
            gridRow: isNotMobile ? '1 / 3' : '3 / 4',
            maxWidth: '550px',
            width: '100%',
          }}
        >
          <Typography>
            Більше інформації про проєкт можна знайти{' '}
            <Link to="/about">тут</Link>.
          </Typography>
        </ContentOutlinedWrapper>

        <ContentOutlinedWrapper
          sx={{
            background: '#ffffff',
          }}
        >
          <PasswordForm />
        </ContentOutlinedWrapper>
      </Box>
    </ContentLayout>
  )
}

export default Settings
