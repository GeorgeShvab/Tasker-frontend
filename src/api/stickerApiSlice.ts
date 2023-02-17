import { Sticker } from '../../types'
import apiSlice from './apiSlice'

interface UpdateStickerRequestBody {
  name: string
  description?: string
  color: string
  id: string
}

const StickerApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getStickers: builder.query<Sticker[], void>({
      query: () => ({
        url: 'stickers',
      }),
      providesTags: ['Stickers'],
    }),
    createSticker: builder.mutation<Sticker, { name: string }>({
      query: (body) => ({
        url: 'sticker',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Stickers'],
    }),
    deleteSticker: builder.mutation<void, string>({
      query: (id) => ({
        url: 'sticker/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Stickers'],
    }),
    updateSticker: builder.mutation<Sticker, UpdateStickerRequestBody>({
      query: (body) => ({
        url: 'sticker/' + body.id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Stickers'],
    }),
  }),
})

export const {
  useGetStickersQuery,
  useCreateStickerMutation,
  useDeleteStickerMutation,
  useUpdateStickerMutation,
} = StickerApiSlice
