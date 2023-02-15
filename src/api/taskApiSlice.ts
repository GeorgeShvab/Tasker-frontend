import apiSlice from './apiSlice'
import { Task } from '../../types'

const taskApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], string | void>({
      query: (query) => ({
        url: 'tasks' + (query || ''),
      }),
    }),
  }),
})

export const { useGetTasksQuery } = taskApiSlice
