import { FunctionComponent, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { selectUser } from '../redux/slices/auth'
import { useAppSelector } from '../redux/store'

const ProtectRoute: FunctionComponent<{
  children: ReactElement
  protectFromAuthorized?: boolean
}> = ({ children, protectFromAuthorized = false }) => {
  const user = useAppSelector(selectUser)

  if (!user.data && !user.isLoading && !protectFromAuthorized) {
    return <Navigate to="/login" />
  } else if (user.data && protectFromAuthorized) {
    return <Navigate to="/upcoming" />
  }

  return children
}

export default ProtectRoute
