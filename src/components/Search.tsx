import {
  TextField,
  Box,
  InputAdornment,
  useMediaQuery,
  IconButton,
} from '@mui/material'
import { FunctionComponent, useState, FormEvent } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import useQuery from '../hooks/useQuery'

interface CustomFormEvent extends FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    query: HTMLInputElement
  }
}

const Search: FunctionComponent = () => {
  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const query = useQuery()

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(query.query ? true : false)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSubmit = (e: CustomFormEvent) => {
    e.preventDefault()

    const value = e.target.query.value

    navigate('/search?query=' + value)
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
      {isNotMobile ? (
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap="60px"
          width="100%"
        >
          <Title>Пошук</Title>
          <Box flex="0 3 400px">
            <TextField
              defaultValue={query.query || ''}
              size="small"
              type="text"
              name="query"
              spellCheck="false"
              autoComplete="off"
              fullWidth
            />
          </Box>
        </Box>
      ) : (
        <Box
          width="100%"
          paddingRight="10px"
          justifyContent={isOpen ? 'flex-start' : 'space-between'}
          alignItems="center"
        >
          {isOpen ? (
            <Box flex="0 3 400px">
              <TextField
                defaultValue={query.query || ''}
                size="small"
                type="text"
                name="query"
                spellCheck="false"
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" onClick={toggleOpen}>
                      <CloseIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent={isNotMobile ? 'flex-start' : 'space-between'}
              gap="20px"
              alignItems="center"
            >
              <Title>Пошук</Title>
              <IconButton onClick={toggleOpen}>
                <SearchIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      )}
    </form>
  )
}

export default Search
