import { List } from '../../types'
import apiSlice from './apiSlice'

interface UpdateListRequestBody {
  name: string
  id: string
  color: string
}

const listApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getLists: builder.query<List[], void>({
      query: () => ({
        url: 'lists',
      }),
      providesTags: ['Lists'],
    }),
    deleteList: builder.mutation<void, string>({
      query: (id) => ({
        url: 'list/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lists'],
    }),
    updateList: builder.mutation<List, UpdateListRequestBody>({
      query: (body) => ({
        url: 'list/' + body.id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Lists'],
    }),
    createList: builder.mutation<List, { name: string }>({
      query: (body) => ({
        url: 'list',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Lists'],
    }),
  }),
})

export const {
  useGetListsQuery,
  useDeleteListMutation,
  useUpdateListMutation,
  useCreateListMutation,
} = listApiSlice
