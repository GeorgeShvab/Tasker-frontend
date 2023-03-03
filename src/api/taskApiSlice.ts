import apiSlice from './apiSlice'
import { Task } from '../../types'
import parsePeriod from '../utils/parsePeriod'

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

interface TasksQueryResponse {
  completedTasks: Task[]
  uncompletedTasks: Task[]
}

interface CountResponse {
  all: number
  today: number
  upcoming: number
}

const taskApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTasks: builder.query<TasksQueryResponse, string | void>({
      query: (query) => ({
        url: 'tasks' + (query || ''),
      }),
      providesTags: (result, error, arg) => [
        { type: 'PeriodTasks', id: arg ? parsePeriod(arg) || 'All' : 'All' },
      ],
      forceRefetch: () => true,
    }),
    getTasksByList: builder.query<TasksQueryResponse, string>({
      query: (id) => ({
        url: `list/${id}/tasks`,
      }),
      providesTags: (result, error, arg) => [{ type: 'ListTasks', id: arg }],
      forceRefetch: () => true,
    }),
    getTasksByTag: builder.query<TasksQueryResponse, string>({
      query: (id) => ({
        url: `tag/${id}/tasks`,
      }),
      providesTags: (result, error, arg) => [{ type: 'TagTasks', id: arg }],
      forceRefetch: () => true,
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
        ...arg.tags.map((item): { type: 'Tag'; id: string } => ({
          type: 'Tag',
          id: item,
        })),
        { type: 'ListTasks', id: arg.list },
        { type: 'ListTasks', id: arg.prevList },
        { type: 'List', id: arg.list },
        { type: 'List', id: arg.prevList },
        'Lists',
        'PeriodTasks',
        'Count',
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
        ...arg.tags.map((item): { type: 'Tag'; id: string } => ({
          type: 'Tag',
          id: item,
        })),
        { type: 'ListTasks', id: arg.list || undefined },
        'Lists',
        'PeriodTasks',
        'Count',
      ],
    }),
    deleteTask: builder.mutation<void, Task>({
      query: (body) => ({
        url: 'task/' + body._id,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        ...arg.tags.map((item): { type: 'TagTasks'; id: string } => ({
          type: 'TagTasks',
          id: item._id,
        })),
        ...arg.tags.map((item): { type: 'Tag'; id: string } => ({
          type: 'Tag',
          id: item._id,
        })),
        { type: 'ListTasks', id: arg.list?._id || '' },
        { type: 'List', id: arg.list?._id || '' },
        'Lists',
        'PeriodTasks',
        'Count',
      ],
    }),
    toggleCompletion: builder.mutation<void, Task>({
      query: (task) => ({
        url: 'task/' + task._id + '/complete',
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, args) => [
        { type: 'List', id: args.list?._id || undefined },
        'Lists',
        'Count',
      ],
    }),
    getTasksCount: builder.query<CountResponse, void>({
      query: () => ({
        url: 'count',
      }),
      providesTags: ['Count'],
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
  useGetTasksByTagQuery,
  useGetTasksCountQuery,
} = taskApiSlice
