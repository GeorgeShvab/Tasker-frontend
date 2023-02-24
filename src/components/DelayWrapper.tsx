import { Box } from '@mui/material'
import { FunctionComponent, ReactElement, useEffect, useState } from 'react'

const DelayWrapper: FunctionComponent<{
  children: ReactElement
  delay: number
  open: boolean
}> = ({ children, delay, open }) => {
  const [state, setState] = useState<boolean>(open)

  useEffect(() => {
    if (!open && state) {
      setTimeout(() => {
        setState(false)
      }, delay)
    } else {
      setState(true)
    }
  }, [open])

  if (!state) return null

  return (
    <Box
      sx={{
        opacity: open ? '1' : '0',
        transition: `${delay / 1000}s linear opacity`,
      }}
    >
      {children}
    </Box>
  )
}

export default DelayWrapper
