import { Sticker, Task } from '../../types'
import apiSlice from './apiSlice'

interface ResponseBody {
  tasks: Task[]
  stickers: Sticker[]
}

const searchApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    search: builder.query<ResponseBody, string>({
      query: (query) => ({
        url: 'search?query=' + query,
      }),
    }),
  }),
})

export const { useSearchQuery, useLazySearchQuery } = searchApiSlice

export default searchApiSlice
