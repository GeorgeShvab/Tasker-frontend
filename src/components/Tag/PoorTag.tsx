import { useTheme, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { FunctionComponent } from 'react'
import { Tag } from '../../../types'
import CloseIcon from '@mui/icons-material/Close'
import { useDrag } from 'react-dnd'

const PoorTag: FunctionComponent<
  Tag & {
    onDelete?: (tag: Tag) => void
    onClick?: (tag: Tag) => void
    drag?: boolean
  }
> = (props) => {
  const { palette } = useTheme()

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'Tag',
    item: {
      name: props.name,
      color: props.color,
      _id: props._id,
      creator: props.creator,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    },
  }))

  const handleDeleteClick = () => {
    const { onClick, onDelete, drag, ...tag } = props

    props.onDelete && props.onDelete(tag)
  }

  const handleClick = () => {
    const { onClick, onDelete, drag, ...tag } = props

    props.onClick && props.onClick(tag)
  }

  return (
    <Box
      sx={{
        backgroundColor: props.color + '80',
        '&:hover': {
          backgroundColor: props.color + 'bf',
          '& > svg': { color: palette.warning.main },
        },
        transition: 'background 0.15s',
      }}
      borderRadius="5px"
      padding="4px 10px"
      width="fit-content"
      maxWidth="100%"
      display="flex"
      alignItems="center"
      gap="6px"
      ref={props.drag ? drag : null}
      onClick={handleClick}
      role="button"
    >
      <Typography
        color={palette.grey[700]}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        maxWidth="100%"
      >
        {props.name}
      </Typography>
      {props.onDelete && (
        <CloseIcon
          fontSize="small"
          sx={{ fontSize: '14px' }}
          onClick={handleDeleteClick}
        />
      )}
    </Box>
  )
}

export default PoorTag
