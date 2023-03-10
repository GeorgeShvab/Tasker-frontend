import { StringSchema } from 'yup'
import { Tag } from '../../types'
import apiSlice from './apiSlice'

interface UpdateTagRequestBody {
  name: string
  color: string
  id: string
}

const tagApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTags: builder.query<Tag[], void>({
      query: () => ({
        url: 'tags',
      }),
      providesTags: ['Tags'],
    }),
    deleteTag: builder.mutation<void, string>({
      query: (id) => ({
        url: 'tag/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tags'],
    }),
    updateTag: builder.mutation<void, UpdateTagRequestBody>({
      query: (body) => ({
        url: 'tag/' + body.id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Tag', id: arg.id },
        'Tags',
      ],
    }),
    createTag: builder.mutation<Tag, { name: string }>({
      query: (body) => ({
        url: 'tag',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tags'],
    }),
    getTag: builder.query<Tag, string>({
      query: (id) => ({
        url: 'tag/' + id,
      }),
      providesTags: (result, error, arg) => [{ type: 'Tag', id: arg }],
    }),
  }),
})

export const {
  useGetTagsQuery,
  useDeleteTagMutation,
  useUpdateTagMutation,
  useCreateTagMutation,
  useGetTagQuery,
} = tagApiSlice
