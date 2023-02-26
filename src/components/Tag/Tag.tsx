import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import Box from '@mui/material/Box'
import { FunctionComponent, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as tags from '../../../types'
import ContextMenu from '../ContextMenu'
import { useDrag } from 'react-dnd'
import TagActions from './TagActions'

type TagAction = 'delete' | 'rename' | 'change_color' | null

const Tag: FunctionComponent<tags.Tag & { selected: boolean }> = (props) => {
  const { selected, ...tag } = props

  const { palette } = useTheme()

  const [tagAction, setTagAction] = useState<TagAction>(null)

  const anchorRef = useRef<HTMLButtonElement>(null)

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'Tag',
    item: tag,
  }))

  return (
    <>
      <Link to={'/tag/' + tag._id} style={{ maxWidth: '100%' }} ref={drag}>
        <Box
          sx={{
            backgroundColor: selected ? tag.color + 'd9' : tag.color + '80',
            '&:hover': { backgroundColor: tag.color + 'bf' },
            transition: 'background 0.15s',
          }}
          borderRadius="5px"
          padding="4px 10px"
          width="fit-content"
          maxWidth="100%"
          ref={anchorRef}
        >
          <Typography
            color={palette.grey[700]}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxWidth="100%"
          >
            {tag.name}
          </Typography>
        </Box>
      </Link>
      <ContextMenu anchor={anchorRef}>
        {(closeMenu) => (
          <MenuList id="composition-menu" aria-labelledby="composition-button">
            <MenuItem
              onClick={() => {
                setTagAction('rename')
                closeMenu()
              }}
            >
              Змінити назву
            </MenuItem>
            <MenuItem
              onClick={() => {
                setTagAction('change_color')
                closeMenu()
              }}
            >
              Змінити колір
            </MenuItem>
            <MenuItem
              onClick={() => {
                setTagAction('delete')
                closeMenu()
              }}
            >
              Видалити
            </MenuItem>
          </MenuList>
        )}
      </ContextMenu>
      <TagActions setTagAction={setTagAction} tagAction={tagAction} {...tag} />
    </>
  )
}

export default Tag
