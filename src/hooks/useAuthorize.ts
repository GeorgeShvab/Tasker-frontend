import { useEffect } from 'react'
import { useGetMeQuery } from '../api/authApiSlice'
import { setUser } from '../redux/slices/auth'
import { useAppDispatch } from '../redux/store'

const useAuthorize = () => {
  const dispatch = useAppDispatch()

  const { data } = useGetMeQuery()

  useEffect(() => {
    if (data) {
      dispatch(setUser(data))
    }
  }, [data])
}

export default useAuthorize
