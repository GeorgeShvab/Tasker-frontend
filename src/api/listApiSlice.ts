import { List } from '../../types'
import apiSlice from './apiSlice'

const listApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getLists: builder.query<List[], void>({
      query: () => ({
        url: 'lists',
      }),
    }),
  }),
})

export const { useGetListsQuery } = listApiSlice
