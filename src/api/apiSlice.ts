import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

const apiSlice = createApi({
  baseQuery,
  endpoints: (build) => ({}),
})

export default apiSlice
