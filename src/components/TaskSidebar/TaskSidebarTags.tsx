import useMediaQuery from '@mui/material/useMediaQuery'
import { FunctionComponent } from 'react'
import { Tag } from '../../../types'
import { useGetTagsQuery } from '../../api/tagApiSlice'
import useTheme from '@mui/material/styles/useTheme'
import { useDrop } from 'react-dnd/dist/hooks/useDrop'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import PoorTags from '../Tag/PoorTags'
import InfoIcon from '@mui/icons-material/Info'

const TaskSideBarTags: FunctionComponent<{
  tags: Tag[]
  setTags: (arg: Tag[] | ((arg: Tag[]) => Tag[])) => void
}> = ({ tags, setTags }) => {
  const { palette } = useTheme()

  const userTags = useGetTagsQuery()

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const handleDeleteTag = (tag: Tag) => {
    setTags((prev) => prev.filter((item) => item._id !== tag._id))
  }

  const onDrop = (tag: Tag) => {
    if (!tags.find((item) => item._id === tag._id)) {
      setTags((prev) => [...prev, tag])
    }
  }

  const dropDataCallback = () => ({
    accept: 'Tag',
    drop: onDrop,
  })

  const [collectedProps, drop] = useDrop(dropDataCallback, [tags])

  return (
    <Box alignItems="center" gap="20px">
      <Box
        mb="10px"
        display="flex"
        alignItems="center"
        gap="10px"
        justifyContent={isNotMobile ? 'flex-start' : 'space-between'}
      >
        <Typography>Теги</Typography>
        {!isNotMobile && (
          <Typography color={palette.grey[400]} fontSize="12px">
            {userTags.data?.length === 0
              ? 'Створіть тег у відповідній вкладці меню'
              : 'Виберіть теги з ваших тегів внизу'}
          </Typography>
        )}
        {isNotMobile && (
          <Tooltip
            title={'Щоб додати тег до завдання перетягніть його з ваших тегів'}
          >
            <InfoIcon fontSize="small" sx={{ fontSize: '14px' }} />
          </Tooltip>
        )}
      </Box>
      <Box ref={drop} minHeight="200px">
        <PoorTags tags={tags} onDelete={handleDeleteTag} />
      </Box>
      {!isNotMobile && (
        <Box>
          <PoorTags tags={userTags.data || []} onClick={onDrop} />
        </Box>
      )}
    </Box>
  )
}

export default TaskSideBarTags
