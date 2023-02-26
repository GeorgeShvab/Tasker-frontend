import { FunctionComponent } from 'react'
import { useGetStickersQuery } from '../../api/stickerApiSlice'
import ContentLayout from '../../components/ContentLayout'
import Layout from '../../components/Layout'
import MainContentWrapper from '../../components/MainContentWrapper'
import Stickers from '../../components/Sticker/Stickers'
import useTitle from '../../hooks/useTitle'

const Notes: FunctionComponent = () => {
  const { data: stickers, isLoading } = useGetStickersQuery()

  useTitle('Нотатки')

  return (
    <ContentLayout title="Нотатки">
      <MainContentWrapper>
        <Stickers stickers={stickers || []} isLoading={isLoading} />
      </MainContentWrapper>
    </ContentLayout>
  )
}

export default Notes
