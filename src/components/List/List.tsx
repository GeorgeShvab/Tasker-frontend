import { Box, MenuItem, MenuList, Typography, useTheme } from '@mui/material'
import { FunctionComponent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as types from '../../../types'
import AsideButton from '../Aside/AsideButton'
import ContextMenu from '../ContextMenu'
import ListActions from './ListActions'

type ListAction = 'delete' | 'rename' | 'change_color' | null

const List: FunctionComponent<types.List & { selected?: boolean }> = (
  props
) => {
  const { selected, ...list } = props
  const { palette } = useTheme()

  const [listAction, setListAction] = useState<ListAction>(null)

  const anchorRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Link to={'/list/' + list._id}>
        <AsideButton
          variant="text"
          ref={anchorRef}
          size="large"
          startIcon={
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                fill={list.color}
                d="M3.25 1A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5z"
              />
            </svg>
          }
          endIcon={
            list.uncompletedTasks ? (
              <Box
                sx={{ backgroundColor: palette.grey.A100 }}
                minWidth="25px"
                borderRadius="2.5px"
                height="15px"
                padding="0 5px"
              >
                <Typography fontSize="10px">{list.uncompletedTasks}</Typography>
              </Box>
            ) : null
          }
          className={selected ? 'selected' : ''}
          fullWidth
        >
          <span>{list.name}</span>
        </AsideButton>
      </Link>
      <ContextMenu anchor={anchorRef}>
        {(closeMenu) => (
          <MenuList id="composition-menu" aria-labelledby="composition-button">
            <MenuItem
              onClick={() => {
                setListAction('rename')
                closeMenu()
              }}
            >
              Змінити назву
            </MenuItem>
            <MenuItem
              onClick={() => {
                setListAction('change_color')
                closeMenu()
              }}
            >
              Змінити колір
            </MenuItem>
            <MenuItem
              onClick={() => {
                setListAction('delete')
                closeMenu()
              }}
            >
              Видалити
            </MenuItem>
          </MenuList>
        )}
      </ContextMenu>
      <ListActions
        listAction={listAction}
        setListAction={setListAction}
        {...list}
      />
    </>
  )
}

export default List
