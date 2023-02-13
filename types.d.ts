export type Mode = 'dark' | 'light'

declare module '@mui/material/styles' {
  interface TypeBackground {
    light: string
    main: string
    dark: string
  }

  interface PaletteColor {
    0?: string
    50?: string
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    600?: string
    700?: string
    800?: string
    900?: string
    1000?: string
  }
}

export interface User {
  firstName: string
  lastName: string
  fullName: string
  email: string
  password: string
  role: Role
  avatar: string
  mode: Mode
  createdAt: string
  updatedAt: string
}

export interface RegistrationBody {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface LoginBody {
  email: string
  password: string
}

declare module '@reduxjs/toolkit' {
  interface SerializedError {
    data?: any
  }
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}
