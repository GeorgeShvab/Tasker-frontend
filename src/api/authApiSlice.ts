import { AuthResponse, LoginBody, RegistrationBody, User } from '../../types'
import apiSlice from './apiSlice'

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation<AuthResponse, RegistrationBody>({
      query: (body) => ({
        url: 'user/registration',
        method: 'POST',
        body: body,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginBody>({
      query: (body) => ({
        url: 'user/login',
        method: 'POST',
        body,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: 'user/get-me',
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useRegistrationMutation, useLoginMutation, useGetMeQuery } =
  authApiSlice
