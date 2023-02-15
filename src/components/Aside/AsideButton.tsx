import styled from '@emotion/styled'
import { Button } from '@mui/material'

const AsideButton = styled(Button)({
  dispay: 'flex',
  justifyContent: 'flex-start',
  textTransform: 'none',
  color: '#525252',
  '& > span': {
    '&:nth-of-type(2)': { marginLeft: 'auto !important' },
  },
  '&:hover': {
    color: '#507963',
    '& > span': {
      color: '#507963',
      '& > div': {
        backgroundColor: '#fafafa',
      },
    },
  },
  '&.selected': {
    backgroundColor: 'rgba(80, 121, 99, 0.04)',
    color: '#507963',
  },
})

export default AsideButton
