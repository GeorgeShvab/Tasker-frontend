import { FunctionComponent } from 'react'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { selectMenu, toggleMenu } from '../redux/slices/menu'

const MenuBtn: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const isMenuOpened = useAppSelector(selectMenu)

  const handleClick = () => {
    dispatch(toggleMenu())
  }

  return (
    <IconButton
      onClick={handleClick}
      className={isMenuOpened ? 'selected' : ''}
      sx={{
        '&.selected': {
          backgroundColor: 'rgba(80, 121, 99, 0.04)',
          color: '#507963',
        },
      }}
    >
      <MenuIcon fontSize="large" />
    </IconButton>
  )
}

export default MenuBtn
