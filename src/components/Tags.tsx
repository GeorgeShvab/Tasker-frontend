import Box from '@mui/material/Box'
import { FunctionComponent } from 'react'
import * as tags from '../../types'
import Tag from './Tag'

const Tags: FunctionComponent<{ tags: tags.Tag[] }> = ({ tags }) => {
  return (
    <Box display="inline-flex" gap="5px" flexWrap="wrap">
      {tags.map((item) => (
        <Tag key={item._id} {...item} />
      ))}
    </Box>
  )
}

export default Tags
