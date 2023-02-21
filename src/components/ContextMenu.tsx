import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  SxProps,
} from '@mui/material'
import {
  useState,
  useRef,
  useEffect,
  FunctionComponent,
  ReactElement,
  RefObject,
} from 'react'
import { Placement } from '../../types'
import useOutsideClick from '../hooks/useOutsideClick'

const ContextMenu: FunctionComponent<{
  children: ((closeMenu: () => void) => ReactElement) | ReactElement
  anchor: RefObject<HTMLElement>
  placement?: Placement
  sx?: SxProps
}> = ({ children, anchor, placement = 'bottom', sx }) => {
  const [open, setOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const handleToggle = (e: MouseEvent) => {
    e.preventDefault()

    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchor.current &&
      anchor.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchor.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  useOutsideClick([anchor, menuRef], () => setOpen(false))

  useEffect(() => {
    anchor.current?.addEventListener('contextmenu', handleToggle)

    return () => {
      anchor.current?.removeEventListener('contextmenu', handleToggle)
    }
  }, [anchor])

  return (
    <Popper
      open={open}
      anchorEl={anchor.current}
      role={undefined}
      placement={placement}
      sx={{ zIndex: 1, ...sx }}
      ref={menuRef}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom-start' ? 'left top' : 'left bottom',
          }}
        >
          <Paper onKeyDown={handleListKeyDown}>
            <ClickAwayListener onClickAway={handleClose}>
              {typeof children === 'function'
                ? children(() => setOpen(false))
                : children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}

export default ContextMenu
