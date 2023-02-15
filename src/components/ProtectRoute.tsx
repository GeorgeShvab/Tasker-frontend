import { FunctionComponent, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthorized } from '../redux/slices/auth'
import { useAppSelector } from '../redux/store'

const ProtectRoute: FunctionComponent<{
  children: ReactElement
  protectFromAuthorized?: boolean
}> = ({ children, protectFromAuthorized = false }) => {
  const isUserAuthorized = useAppSelector(isAuthorized)

  if (!isUserAuthorized && !protectFromAuthorized) {
    return <Navigate to="/login" />
  } else if (isUserAuthorized && protectFromAuthorized) {
    return <Navigate to="/upcoming" />
  }

  return children
}

export default ProtectRoute
