import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import { FunctionComponent } from 'react'
import ContentLayout from '../../components/ContentLayout'
import ContentOutlinedWrapper from '../../components/ContentOutlinedWrapper'
import MainContentWrapper from '../../components/MainContentWrapper'
import NameForm from './NameForm'
import PasswordForm from './PasswordForm'

const Settings: FunctionComponent = () => {
  const isNotMobile = useMediaQuery('(min-width: 769px)')
  return (
    <ContentLayout title="Налаштування">
      <ContentOutlinedWrapper>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(250px, 375px))"
          padding={isNotMobile ? '5px 10px' : '5px'}
          gap="50px"
        >
          <Box maxWidth="450px">
            <PasswordForm />
          </Box>
          <Box maxWidth="450px">
            <NameForm />
          </Box>
        </Box>
      </ContentOutlinedWrapper>
    </ContentLayout>
  )
}

export default Settings
