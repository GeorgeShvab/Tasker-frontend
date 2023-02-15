import { Box, Typography, useTheme } from '@mui/material'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { List } from '../../../types'
import AsideButton from './AsideButton'

const ListAsideButton: FunctionComponent<List & { selected?: boolean }> = ({
  _id,
  tasks,
  color,
  name,
  selected,
}) => {
  const { palette } = useTheme()

  return (
    <Link to={'/list/' + _id}>
      <AsideButton
        variant="text"
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
              fill={color}
              d="M3.25 1A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5z"
            />
          </svg>
        }
        endIcon={
          <Box
            sx={{ backgroundColor: palette.grey.A100 }}
            minWidth="25px"
            borderRadius="2.5px"
            height="15px"
            padding="0 5px"
          >
            <Typography fontSize="10px">{tasks}</Typography>
          </Box>
        }
        className={selected ? 'selected' : ''}
        fullWidth
      >
        <span>{name}</span>
      </AsideButton>
    </Link>
  )
}

export default ListAsideButton
