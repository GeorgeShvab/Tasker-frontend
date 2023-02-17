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

export interface List {
  _id: string
  name: string
  color: string
  creator: ObjectId
  tasks: number
}

export interface Tag {
  _id: string
  name: string
  creator: ObjectId
  color: string
  tasks: number
}

export interface Task {
  _id: string
  name: string
  description: string
  list: ObjectId
  date: Date
  tags: ObjectId[]
  creator: ObjectId
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type Page = 'list' | 'tag' | 'upcoming' | 'today' | 'notes'

export interface AlertStatus {
  msg: string
  type: 'success' | 'error'
  status: boolean
}

export interface Sticker {
  _id: string
  name: string
  description: string
  creator: ObjectId
  color: string
  createdAt: string
  updatedAt: string
}

export type Placement =
  | 'auto-end'
  | 'auto-start'
  | 'auto'
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top'
