import { AuthResponse, LoginBody, RegistrationBody, User } from '../../types'
import apiSlice from './apiSlice'

interface UpdateNameReqBody {
  firstName: string
  lastName: string
}

interface UpdatePasswordReqBody {
  oldPassword: string
  password: string
  passwordConfirmation: string
}

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
    updateName: builder.mutation<User, UpdateNameReqBody>({
      query: (body) => ({
        url: 'user/update/name',
        method: 'PATCH',
        body,
      }),
    }),
    updatePassword: builder.mutation<void, UpdatePasswordReqBody>({
      query: (body) => ({
        url: 'user/update/password',
        method: 'PATCH',
        body,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useRegistrationMutation,
  useLoginMutation,
  useGetMeQuery,
  useUpdateNameMutation,
  useUpdatePasswordMutation,
} = authApiSlice
