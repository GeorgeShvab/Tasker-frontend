import Portal from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'
import Box from '@mui/material/Box'
import { FunctionComponent, useState, useEffect } from 'react'
import { useAppSelector } from '../redux/store'
import CenterContainer from './CenterContainer'
import DelayWrapper from './DelayWrapper'
import Logo from './Logo'

const InitialLoadingOverlay: FunctionComponent = () => {
  const { palette } = useTheme()

  const api = useAppSelector((store) => store.api)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (api.queries && Object.keys(api.queries).length) {
      const statuses = Object.values(api.queries).map((item) => item?.status)

      if (
        statuses.every((item) => item === 'fulfilled' || item === 'rejected')
      ) {
        setTimeout(() => {
          setIsLoading(false)
        }, 500) // because internet and loading now fast and overlay begins to disappear after about 0.1s. I like this loader, so I decided to wait additional 0.5s 😄
      }
    }
  }, [api])

  return (
    <Portal>
      <DelayWrapper open={isLoading} delay={500}>
        <Box
          position="fixed"
          top="0"
          bottom="0"
          left="0"
          right="0"
          zIndex="5"
          sx={{ backgroundColor: palette.background.default }}
        >
          <CenterContainer sx={{ height: 'var(--full-height)' }}>
            <Box>
              <Logo sx={{ fontSize: '40px' }} />
              <CenterContainer>
                <div className="loadingio-spinner-ellipsis-ihzi83yyesn">
                  <div className="ldio-3fj8ubdinwc">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </CenterContainer>
            </Box>
          </CenterContainer>
        </Box>
      </DelayWrapper>
    </Portal>
  )
}

export default InitialLoadingOverlay
