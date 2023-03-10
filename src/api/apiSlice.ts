import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'
import { unauthorize } from '../redux/slices/auth'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_SERVER_API,
  prepareHeaders(headers, api) {
    const token = window.localStorage.getItem('accessToken')

    if (token) {
      headers.set('authorization', token)
    }

    return headers
  },
})

const baseQueryWithRefetch: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 418) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      const {
        data,
        error,
      }: QueryReturnValue<any, FetchBaseQueryError, FetchBaseQueryMeta> =
        await baseQuery(
          {
            url: 'user/refresh-tokens',
            headers: {
              refresh: window.localStorage.getItem('refreshToken') || undefined,
            },
            method: 'POST',
          },
          api,
          extraOptions
        )

      if (error?.status === 400) {
        api.dispatch(unauthorize())
      }

      if (data) {
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)

        result = await baseQuery(args, api, extraOptions)
      }

      release()
    } else {
      await mutex.waitForUnlock()

      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

const apiSlice = createApi({
  baseQuery: baseQueryWithRefetch,
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({}),
  tagTypes: [
    'Tags',
    'Lists',
    'Stickers',
    'List',
    'ListTasks',
    'Today',
    'Upcoming',
    'TagTasks',
    'Tag',
    'PeriodTasks',
    'All',
    'Count',
  ],
})

export default apiSlice
