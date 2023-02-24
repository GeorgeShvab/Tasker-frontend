import { Portal, useTheme } from '@mui/material'
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{
                  margin: 'auto',
                  background: 'transparent',
                  display: 'block',
                  shapeRendering: 'auto',
                }}
                width="85px"
                height="85px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle cx="84" cy="50" r="10" fill="#507963">
                  <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="0.5s"
                    calcMode="spline"
                    keyTimes="0;1"
                    values="10;0"
                    keySplines="0 0.5 0.5 1"
                    begin="0s"
                  ></animate>
                  <animate
                    attributeName="fill"
                    repeatCount="indefinite"
                    dur="2s"
                    calcMode="discrete"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="#507963;#507963;#507963;#507963;#507963"
                    begin="0s"
                  ></animate>
                </circle>
                <circle cx="16" cy="50" r="10" fill="#507963">
                  <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="2s"
                    calcMode="spline"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="0;0;10;10;10"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="0s"
                  ></animate>
                  <animate
                    attributeName="cx"
                    repeatCount="indefinite"
                    dur="2s"
                    calcMode="spline"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="16;16;16;50;84"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="0s"
                  ></animate>
                </circle>
                <circle cx="50" cy="50" r="10" fill="#507963">
                  <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="2s"
                    calcMode="spline"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="0;0;10;10;10"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="-0.5s"
                  ></animate>
                  <animate
                    attributeName="cx"
                    repeatCount="indefinite"
                    dur="2s"
                    calcMode="spline"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="16;16;16;50;84"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="-0.5s"
                  ></animate>
                </circle>
                <circle cx="84" cy="50" r="10" fill="#507963">
                  <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="2s"
                    calcMode="spline"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="0;0;10;10;10"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="-1s"
                  ></animate>
                  <animate
                    attributeName="cx"
                    repeatCount="indefinite"
                    dur="2s"
                    calcMode="spline"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="16;16;16;50;84"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="-1s"
                  ></animate>
                </circle>
                <circle cx="16" cy="50" r="10" fill="#507963">
                  <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="2s"
                    calcMode="spline"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="0;0;10;10;10"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="-1.5s"
                  ></animate>
                  <animate
                    attributeName="cx"
                    repeatCount="indefinite"
                    dur="2s"
                    calcMode="spline"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="16;16;16;50;84"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="-1.5s"
                  ></animate>
                </circle>
              </svg>
            </Box>
          </CenterContainer>
        </Box>
      </DelayWrapper>
    </Portal>
  )
}

export default InitialLoadingOverlay
