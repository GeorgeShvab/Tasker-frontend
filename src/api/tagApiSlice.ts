import { Tag } from '../../types'
import apiSlice from './apiSlice'

const tagApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTags: builder.query<Tag[], void>({
      query: () => ({
        url: 'tags',
      }),
    }),
  }),
})

export const { useGetTagsQuery } = tagApiSlice
