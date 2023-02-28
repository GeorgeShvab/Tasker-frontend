import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FunctionComponent, useState, useRef, memo, useEffect } from 'react'
import * as types from '../../../types'
import ContextMenu from '../ContextMenu'
import StickerActions from './StickerActions'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import StikcerPopup from './StickerPopup'
import Modal from '@mui/material/Modal'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

type StickerAction = 'delete' | 'change_color' | null

const Sticker: FunctionComponent<types.Sticker> = (props) => {
  const { name, description, color } = props

  const [overflow, setOverflow] = useState<boolean>(false)

  const [stickerAction, setStickerAction] = useState<StickerAction>(null)

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const [open, setOpen] = useState<boolean>(false)

  const anchorRef = useRef<HTMLDivElement>(null)

  const toggleOpen = () => {
    setOpen((prev) => !prev)
  }

  const descriptionText = useRef<HTMLDivElement>(null)
  const descriptionContainer = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (
      !overflow &&
      descriptionText.current &&
      descriptionContainer.current &&
      descriptionText.current?.scrollHeight >
        descriptionContainer.current?.clientHeight
    ) {
      setOverflow(true)
    }
  }, [])

  return (
    <>
      <Paper
        sx={{
          aspectRatio: '1 / 1',
          backgroundColor: open ? color + '80' : color + '40',
          '&:hover': { backgroundColor: color + '80' },
          transition: 'background 0.15s',
          padding: isNotMobile ? '17.5px 20px 20px' : '15px 17.5px 17.5px',
          position: 'relative',
        }}
        ref={anchorRef}
        elevation={2}
        onClick={toggleOpen}
      >
        <Box
          sx={{
            display: overflow ? 'block' : 'none',
            position: 'absolute',
            left: '50%',
            bottom: isNotMobile ? '-6px' : '-8px',
            transform: 'translateX(-50%)',
          }}
        >
          <MoreHorizIcon />
        </Box>
        <Box overflow="hidden" maxHeight="100%" ref={descriptionContainer}>
          <Typography
            variant="h4"
            fontSize="18px"
            fontWeight="800"
            mb={isNotMobile ? '14px' : '8px'}
            sx={{ wordBreak: 'break-word' }}
          >
            {name}
          </Typography>

          <Typography
            fontSize="15px"
            sx={{ wordBreak: 'break-word' }}
            ref={descriptionText}
            dangerouslySetInnerHTML={{
              __html: description?.replace(/\n/gi, '<br/>') || '',
            }}
          ></Typography>
        </Box>
      </Paper>
      <Modal open={open} onClose={toggleOpen}>
        <Fade in={open}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{
              transform: 'translate(-50%, -50%)',
              aspectRatio: '1 / 1',
              outline: 'none',
            }}
            height={isNotMobile ? '90%' : '80%'}
            width={isNotMobile ? undefined : '90%'}
          >
            <StikcerPopup onBack={() => setOpen(false)} {...props} />
          </Box>
        </Fade>
      </Modal>
      <ContextMenu anchor={anchorRef} placement="auto">
        {(closeMenu) => (
          <MenuList id="composition-menu" aria-labelledby="composition-button">
            <MenuItem
              onClick={() => {
                setStickerAction('change_color')
                closeMenu()
              }}
            >
              Змінити колір
            </MenuItem>
            <MenuItem
              onClick={() => {
                setStickerAction('delete')
                closeMenu()
              }}
            >
              Видалити
            </MenuItem>
          </MenuList>
        )}
      </ContextMenu>
      <StickerActions
        stickerAction={stickerAction}
        setStickerAction={setStickerAction}
        {...props}
      />
    </>
  )
}

export default memo(Sticker)
