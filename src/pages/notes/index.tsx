import { FunctionComponent } from 'react'
import { useGetStickersQuery } from '../../api/stickerApiSlice'
import ContentLayout from '../../components/ContentLayout'
import MainContentWrapper from '../../components/MainContentWrapper'
import Stickers from '../../components/Sticker/Stickers'

const Notes: FunctionComponent = () => {
  const { data: stickers, isLoading } = useGetStickersQuery()

  return (
    <ContentLayout title="Нотатки">
      <MainContentWrapper>
        <Stickers stickers={stickers || []} isLoading={isLoading} />
      </MainContentWrapper>
    </ContentLayout>
  )
}

export default Notes
