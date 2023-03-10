import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Collapse from '@mui/material/Collapse'
import InputAdornment from '@mui/material/InputAdornment'
import { FunctionComponent, useState, FormEvent } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Logo from '../Logo'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PageState } from '../../../types'

interface FormSubmissionEvent extends FormEvent<HTMLFormElement> {
  target: EventTarget & {
    query: HTMLInputElement
  }
}

const AsideHeader: FunctionComponent<{
  page: PageState
}> = ({ page }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    page.page === 'search'
  )

  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const collapseClick = () => {
    setIsCollapsed((prev) => !prev)
  }

  const handleSubmit = (e: FormSubmissionEvent) => {
    e.preventDefault()

    navigate('/search?q=' + e.target.query.value)
  }

  return (
    <Box component="header" padding="0 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Logo />
        {/*<IconButton
          onClick={collapseClick}
          className={isCollapsed ? 'selected' : ''}
          sx={{
            '&.selected': {
              backgroundColor: 'rgba(80, 121, 99, 0.04)',
              color: '#507963',
            },
          }}
        >
          <SearchIcon />
        </IconButton>*/}
      </Box>
      <Collapse in={isCollapsed}>
        <Box paddingTop="15px">
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              sx={{ display: 'block' }}
              size="small"
              name="query"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              defaultValue={searchParams.get('q')}
              fullWidth
            />
          </form>
        </Box>
      </Collapse>
    </Box>
  )
}

export default AsideHeader
