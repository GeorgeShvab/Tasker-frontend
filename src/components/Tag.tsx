import { Button, Typography, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import * as tags from '../../types'

const Tag: FunctionComponent<tags.Tag & { selected: boolean }> = ({
  _id,
  name,
  color,
  selected,
}) => {
  const { palette } = useTheme()
  return (
    <Link to={'/tag/' + _id}>
      <Box
        sx={{
          backgroundColor: selected ? color + 'd9' : color + '80',
          '&:hover': { backgroundColor: color + 'bf' },
          transition: 'background 0.15s',
        }}
        borderRadius="5px"
        padding="4px 10px"
        width="fit-content"
      >
        <Typography color={palette.grey[700]}>{name}</Typography>
      </Box>
    </Link>
  )
}

export default Tag
