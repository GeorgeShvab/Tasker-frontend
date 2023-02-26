import { Box, Divider, Typography, useTheme } from '@mui/material'
import { FunctionComponent, memo } from 'react'
import AsideItem from './AsideItem'
import TodayIcon from '@mui/icons-material/Today'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import SettingsIcon from '@mui/icons-material/Settings'
import AsideButton from './AsideButton'
import { useGetListsQuery } from '../../api/listApiSlice'
import { useCreateTagMutation, useGetTagsQuery } from '../../api/tagApiSlice'
import { useGetTasksQuery } from '../../api/taskApiSlice'
import { Link } from 'react-router-dom'
import AsideHeader from './AsideHeader'
import Tags from '../Tag/Tags'
import Lists from '../List/Lists'
import usePage from '../../hooks/usePage'
import Logout from '../Logout'
import SearchIcon from '@mui/icons-material/Search'

const Aside: FunctionComponent = () => {
  const { palette } = useTheme()

  const lists = useGetListsQuery()
  const tags = useGetTagsQuery()
  const { data: todaysTasks } = useGetTasksQuery(
    '?period=today&status=uncompleted'
  )
  const { data: upcomingTasks } = useGetTasksQuery(
    '?period=upcoming&status=uncompleted'
  )

  const page = usePage()

  return (
    <Box
      component="aside"
      padding="20px 0"
      display="flex"
      minHeight="100%"
      sx={{
        background: palette.background.dark,
        flexDirection: 'column',
      }}
    >
      <AsideHeader page={page} />
      <Box
        display="flex"
        flex="3 0 auto"
        justifyContent="space-between"
        sx={{
          flexDirection: 'column',
        }}
      >
        <Box padding="40px 20px 0">
          <AsideItem text="Завдання">
            <Box>
              <Link to="/upcoming">
                <AsideButton
                  variant="text"
                  size="large"
                  startIcon={<KeyboardDoubleArrowRightIcon />}
                  endIcon={
                    upcomingTasks?.length ? (
                      <Box
                        sx={{ backgroundColor: palette.grey.A100 }}
                        minWidth="25px"
                        borderRadius="2.5px"
                        height="15px"
                        padding="0 5px"
                      >
                        <Typography fontSize="10px">
                          {upcomingTasks?.length || 0}
                        </Typography>
                      </Box>
                    ) : null
                  }
                  className={page.page === 'upcoming' ? 'selected' : ''}
                  fullWidth
                >
                  <span>Найближчі</span>
                </AsideButton>
              </Link>
              <Link to="/today">
                <AsideButton
                  variant="text"
                  size="large"
                  startIcon={<TodayIcon />}
                  endIcon={
                    todaysTasks?.length ? (
                      <Box
                        sx={{ backgroundColor: palette.grey.A100 }}
                        minWidth="25px"
                        borderRadius="2.5px"
                        height="15px"
                        padding="0 5px"
                      >
                        <Typography fontSize="10px">
                          {todaysTasks?.length || 0}
                        </Typography>
                      </Box>
                    ) : null
                  }
                  className={page.page === 'today' ? 'selected' : ''}
                  fullWidth
                >
                  <span>Сьогодні</span>
                </AsideButton>
              </Link>
              <Link to="/notes">
                <AsideButton
                  variant="text"
                  size="large"
                  startIcon={<StickyNote2Icon />}
                  className={page.page === 'notes' ? 'selected' : ''}
                  fullWidth
                >
                  <span>Нотатки</span>
                </AsideButton>
              </Link>
              <Link to="/search">
                <AsideButton
                  variant="text"
                  size="large"
                  startIcon={<SearchIcon fontSize="small" />}
                  className={page.page === 'search' ? 'selected' : ''}
                  fullWidth
                >
                  <span>Пошук</span>
                </AsideButton>
              </Link>
            </Box>
          </AsideItem>
          <Divider sx={{ paddingTop: '15px', marginBottom: '15px' }} light />
          <AsideItem text="Списки">
            <Lists
              lists={lists.data || []}
              page={page}
              isLoading={lists.isLoading}
            />
          </AsideItem>
          <Divider sx={{ paddingTop: '15px', marginBottom: '15px' }} light />
          <AsideItem text="Теги">
            <Tags
              tags={tags.data || []}
              page={page}
              isLoading={tags.isLoading}
            />
          </AsideItem>
        </Box>
        <Box padding="30px 20px 0">
          <Link to="/settings">
            <AsideButton
              variant="text"
              size="large"
              startIcon={<SettingsIcon />}
              fullWidth
            >
              Налаштування
            </AsideButton>
          </Link>
          <Logout>
            <AsideButton
              variant="text"
              size="large"
              startIcon={<ExitToAppIcon />}
              fullWidth
            >
              Вийти з аккаунту
            </AsideButton>
          </Logout>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(Aside)
