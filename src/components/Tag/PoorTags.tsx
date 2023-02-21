import Box from '@mui/material/Box'
import { FunctionComponent } from 'react'
import { Tag } from '../../../types'
import PoorTag from './PoorTag'

const PoorTags: FunctionComponent<{
  tags: Tag[]
  onDelete?: (tag: Tag) => void
  drag?: boolean
  onClick?: (tag: Tag) => void
}> = ({ tags, onDelete, drag, onClick }) => {
  return (
    <Box
      display="inline-flex"
      gap="5px"
      flexWrap="wrap"
      width="100%"
      overflow="hidden"
    >
      {tags.map((item) => (
        <PoorTag
          key={item._id}
          onDelete={onDelete}
          drag={drag}
          {...item}
          onClick={onClick}
        />
      ))}
    </Box>
  )
}

export default PoorTags
