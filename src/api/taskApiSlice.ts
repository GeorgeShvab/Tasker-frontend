import apiSlice from './apiSlice'
import { Tag, Task } from '../../types'

interface UpdateTaskBody {
  _id: string
  name: string
  description: string
  date: Date | null
  tags: string[]
  list?: string
  prevList?: string
}

interface CreateTaskBody {
  name: string
  description: string
  date: Date | null
  tags: string[]
  list?: string | null
}

const taskApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], string | void>({
      query: (query) => ({
        url: 'tasks' + (query || ''),
      }),
    }),
    getTasksByList: builder.query<Task[], string>({
      query: (id) => ({
        url: `list/${id}/tasks`,
      }),
      providesTags: (result, error, arg) => [{ type: 'ListTasks', id: arg }],
    }),
    updateTask: builder.mutation<Task, UpdateTaskBody>({
      query: (body) => ({
        url: 'task/' + body._id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        ...arg.tags.map((item): { type: 'TagTasks'; id: string } => ({
          type: 'TagTasks',
          id: item,
        })),
        { type: 'ListTasks', id: arg.list },
        { type: 'ListTasks', id: arg.prevList },
        'Today',
        'Upcoming',
        'Lists',
      ],
    }),
    createTask: builder.mutation<Task, CreateTaskBody>({
      query: (body) => ({
        url: 'task',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        ...arg.tags.map((item): { type: 'TagTasks'; id: string } => ({
          type: 'TagTasks',
          id: item,
        })),
        { type: 'ListTasks', id: arg.list || undefined },
        'Today',
        'Upcoming',
        'Lists',
      ],
    }),
    deleteTask: builder.mutation<void, Task>({
      // taskes object task as parameter instead of id to invalidate tags nad lists
      query: (body) => ({
        url: 'task/' + body._id,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        ...arg.tags.map((item): { type: 'TagTasks'; id: string } => ({
          type: 'TagTasks',
          id: item._id,
        })),
        { type: 'ListTasks', id: arg.list?._id || '' },
        'Today',
        'Upcoming',
        'Lists',
      ],
    }),
    toggleCompletion: builder.mutation<void, string>({
      query: (id) => ({
        url: 'task/' + id + '/complete',
        method: 'PATCH',
      }),
    }),
  }),
})

export const {
  useGetTasksQuery,
  useGetTasksByListQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useToggleCompletionMutation,
} = taskApiSlice
