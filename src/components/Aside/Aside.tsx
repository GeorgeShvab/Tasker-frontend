import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { FunctionComponent, useState, useEffect } from 'react'
import Logo from '../Logo'
import SearchIcon from '@mui/icons-material/Search'
import AsideItem from './AsideItem'
import TodayIcon from '@mui/icons-material/Today'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import SettingsIcon from '@mui/icons-material/Settings'
import AddIcon from '@mui/icons-material/Add'
import AsideButton from './AsideButton'
import AsideListButton from './AsideListButton'
import { useGetListsQuery } from '../../api/listApiSlice'
import { useGetTagsQuery } from '../../api/tagApiSlice'
import Tag from '../Tag'
import { useGetTasksQuery } from '../../api/taskApiSlice'
import { Link, matchPath, useLocation, useParams } from 'react-router-dom'
import { Page } from '../../../types'
import AsideHeader from './AsideHeader'

const Aside: FunctionComponent = () => {
  const { palette } = useTheme()

  const { data: lists } = useGetListsQuery()
  const { data: tags } = useGetTagsQuery()
  const { data: todaysTasks } = useGetTasksQuery('?period=today')
  const { data: upcomingTasks } = useGetTasksQuery('?period=upcoming')

  const { pathname } = useLocation()

  const currentPage = pathname.split('/')[1]

  const param = matchPath(`/${currentPage}/:id`, pathname)?.params?.id

  const [page, setPage] = useState<{ page: string; id: undefined | string }>({
    page: currentPage,
    id: param,
  })

  useEffect(() => {
    setPage({
      page: currentPage,
      id: param,
    })
  }, [pathname])

  return (
    <Box
      component="aside"
      padding="20px 0"
      display="flex"
      minHeight="100vh"
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
                  }
                  className={page.page === 'upcoming' ? 'selected' : ''}
                  fullWidth
                >
                  Найближчі
                </AsideButton>
              </Link>
              <Link to="/today">
                <AsideButton
                  variant="text"
                  size="large"
                  startIcon={<TodayIcon />}
                  endIcon={
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
                  }
                  className={page.page === 'today' ? 'selected' : ''}
                  fullWidth
                >
                  Сьогодні
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
                  Нотатки
                </AsideButton>
              </Link>
            </Box>
          </AsideItem>
          <Divider sx={{ paddingTop: '15px', marginBottom: '15px' }} light />
          <AsideItem text="Списки">
            <Box>
              {lists?.map((item) => (
                <AsideListButton
                  key={item._id}
                  selected={page.page === 'list' && page.id === item._id}
                  {...item}
                />
              ))}
              <AsideButton
                variant="text"
                size="large"
                startIcon={<AddIcon />}
                fullWidth
              >
                Додати список
              </AsideButton>
            </Box>
          </AsideItem>
          <Divider sx={{ paddingTop: '15px', marginBottom: '15px' }} light />
          <AsideItem text="Теги">
            <Box display="inline-flex" gap="5px" flexWrap="wrap">
              {tags?.map((item) => (
                <Tag
                  key={item._id}
                  selected={page.page === 'tag' && page.id === item._id}
                  {...item}
                />
              ))}
              <Box
                sx={{
                  backgroundColor: palette.grey.A100,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: palette.grey.A200 },
                  transition: 'background 0.15s',
                }}
                borderRadius="5px"
                padding="4px 10px"
                width="fit-content"
              >
                <Typography color={palette.grey[700]}>+ Додати тег</Typography>
              </Box>
            </Box>
          </AsideItem>
        </Box>
        <Box padding="40px 20px 0">
          <AsideButton
            variant="text"
            size="large"
            startIcon={<SettingsIcon />}
            fullWidth
          >
            Налаштування
          </AsideButton>
          <AsideButton
            variant="text"
            size="large"
            startIcon={<ExitToAppIcon />}
            fullWidth
          >
            Вийти з аккаунту
          </AsideButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Aside
