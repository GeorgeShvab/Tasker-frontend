import { FunctionComponent, ReactElement, useState, useEffect } from 'react'
import AsideButton from './Aside/AsideButton'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import { setUser, unauthorize } from '../redux/slices/auth'
import { useAppDispatch } from '../redux/store'

const Logout: FunctionComponent<{ children: ReactElement }> = ({
  children,
}) => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState<boolean>(false)

  const handleLogoutClick = () => {
    setOpen(true)
  }

  const logout = () => {
    dispatch(unauthorize())

    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
  }

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Ви впевнені, що хочете вийти з аккаунту?</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Відмінити</Button>
          <Button onClick={logout}>Підтвердити</Button>
        </DialogActions>
      </Dialog>
      <Box onClick={handleLogoutClick}>{children}</Box>
    </>
  )
}

export default Logout
