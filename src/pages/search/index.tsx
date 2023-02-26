import { FunctionComponent, useEffect, useState } from 'react'
import ContentLayout from '../../components/ContentLayout'
import useQuery from '../../hooks/useQuery'
import SearchComponent from '../../components/Search'
import { useLazySearchQuery } from '../../api/searchApiSlice'
import ContentOutlinedWrapper from '../../components/ContentOutlinedWrapper'
import Tasks from '../../components/Task/Tasks'
import Box from '@mui/material/Box'
import Stickers from '../../components/Sticker/Stickers'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import CenterContainer from '../../components/CenterContainer'
import useTitle from '../../hooks/useTitle'

const Search: FunctionComponent = () => {
  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const query = useQuery()

  useTitle(query.query ? `Пошук за запитом ${query.query}` : 'Пошук')

  const [trigger, data] = useLazySearchQuery()

  const [helperText, setHelperText] = useState<{
    msg: string
    emoji?: string
  } | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await trigger(query.query || '').unwrap()

        if (!data?.tasks.length && !data?.stickers.length && query.query) {
          setHelperText({ msg: 'За запитом нічого не знайдено', emoji: '😢' })
        } else if (!query.query) {
          setHelperText({ msg: 'Введіть запит' })
        }
      } catch (e) {
        setHelperText({
          msg: "Не вдалось з'єднатись з сервером, будь ласка, перевірте інтернет-з'єднання",
          emoji: '😢',
        })
      }
    })()
  }, [query.query])

  const tasks = data.data?.tasks || []

  const stickers = data.data?.stickers || []

  return (
    <ContentLayout title={<SearchComponent />}>
      <Box minHeight="calc(var(--full-height) - 151.51px)">
        {Boolean(tasks.length) && (
          <Box mb="30px">
            <ContentOutlinedWrapper title={'Завдання за запитом'}>
              <Box paddingTop={isNotMobile ? undefined : '10px'}>
                <Tasks tasks={tasks} />
              </Box>
            </ContentOutlinedWrapper>
          </Box>
        )}
        {Boolean(stickers.length) && (
          <Box>
            <ContentOutlinedWrapper title={'Нотатки за запитом'}>
              {stickers.length ? (
                <Box paddingTop={isNotMobile ? undefined : '10px'}>
                  <Stickers
                    stickers={stickers}
                    isLoading={data.isLoading}
                    addButton={false}
                  />
                </Box>
              ) : (
                <Typography>Нотаток по запиту не знайдено </Typography>
              )}
            </ContentOutlinedWrapper>
          </Box>
        )}
        {!stickers.length && !tasks.length && (
          <CenterContainer minHeight="calc(var(--full-height) - 151.51px)">
            <Box textAlign="center">
              {helperText?.emoji && (
                <Typography fontSize="80px">{helperText.emoji}</Typography>
              )}
              <Typography>{helperText?.msg}</Typography>
            </Box>
          </CenterContainer>
        )}
      </Box>
    </ContentLayout>
  )
}

export default Search
