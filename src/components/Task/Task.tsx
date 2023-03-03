import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { FunctionComponent, memo, MouseEvent, useState } from 'react'
import * as types from '../../../types'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import { useToggleCompletionMutation } from '../../api/taskApiSlice'
import EventIcon from '@mui/icons-material/Event'
import { unformatDate } from '../../utils/date'

const Task: FunctionComponent<
  types.Task & {
    selected?: boolean
    onClick?: (task: types.Task) => void
    onStatusToggle?: (task: types.Task) => void
  }
> = (props) => {
  const { selected, onClick, onStatusToggle, ...task } = props

  const { palette } = useTheme()

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const [toggle] = useToggleCompletionMutation()

  const [completed, setCompleted] = useState<boolean>(props.completed)

  const [alert, setAlert] = useState<types.AlertStatus | null>(null)

  const toggleCompletion = async (e: MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation()

    try {
      setCompleted((prev) => !prev)

      await toggle(task).unwrap()

      onStatusToggle && onStatusToggle(task)
    } catch (e) {
      setAlert({
        msg: "Не вдалось змінити завдання, перевірте інтернет-з'єднання",
        status: true,
        type: 'error',
      })
    }
  }

  const handleTaskClick = () => {
    if (props.onClick) props.onClick(task)
  }

  return (
    <>
      <Box
        padding={isNotMobile ? '5px 30px 5px 15px' : '5px 10px 5px 0'}
        className={props.selected ? 'selected' : ''}
        sx={{
          '&:hover': {
            backgroundColor: palette.background.dark,
          },
          '&.selected': {
            backgroundColor: palette.background.dark,
          },
          borderBottom: '1px solid ' + palette.grey.A200,
          '&:last-child': {
            borderBottom: 'none',
          },

          cursor: 'pointer',
        }}
        borderRadius={1}
        onClick={handleTaskClick}
      >
        <Box sx={{ opacity: completed ? '0.25' : '1' }}>
          <Box
            display="flex"
            alignItems="start"
            gap={isNotMobile ? '10px' : '5px'}
            flex="0 3 auto"
          >
            <IconButton onClick={toggleCompletion} sx={{ flex: '0 0 auto' }}>
              {completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </IconButton>
            <Box flex="3 3 auto" paddingTop="7px">
              <Typography
                variant="h5"
                fontWeight="500"
                sx={{
                  textDecoration: completed ? 'line-through' : 'none',
                  wordBreak: 'break-word',
                  '&:last-child': {
                    mb: '0',
                  },
                }}
                mb="6px"
              >
                {props.name}
              </Typography>
              {props.description && (
                <Typography
                  fontWeight="500"
                  sx={{
                    textDecoration: completed ? 'line-through' : 'none',
                    wordBreak: 'break-word',
                  }}
                  color={palette.grey[300]}
                  mb="6px"
                >
                  {props.description}
                </Typography>
              )}
              {(props.date || props.list) && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={isNotMobile ? '25px' : '10px'}
                  flex="0 0 auto"
                  sx={{
                    '&:last-child': {
                      paddingBottom: isNotMobile ? '8px' : '7px',
                    },
                  }}
                >
                  {props.date && (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      minWidth="95px"
                    >
                      <EventIcon fontSize="small" />
                      <Typography fontSize="small" sx={{ fontSize: '12px' }}>
                        {unformatDate(props.date)}
                      </Typography>
                    </Box>
                  )}
                  {props.list && (
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={isNotMobile ? '10px' : '5px'}
                    >
                      <svg
                        width="15px"
                        height="15px"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                      >
                        <path
                          fill={props.list.color}
                          d="M3.25 1A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5z"
                        />
                      </svg>
                      <Typography fontSize="small" sx={{ fontSize: '12px' }}>
                        {props.list.name}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={alert?.status}
        autoHideDuration={10000}
        onClose={() =>
          setAlert((prev) =>
            prev !== null ? { ...prev, status: false } : null
          )
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alert?.type} sx={{ width: '100%' }}>
          {alert?.msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default memo(Task)
