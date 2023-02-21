import { useEffect } from 'react'
import { useGetMeQuery } from '../api/authApiSlice'
import { setLoading, setUser } from '../redux/slices/auth'
import { useAppDispatch } from '../redux/store'

const useAuthorize = () => {
  const dispatch = useAppDispatch()

  const { data, isLoading } = useGetMeQuery()

  useEffect(() => {
    if (data) {
      dispatch(setUser(data))
    } else if (!data && !isLoading) {
      dispatch(setLoading(false))
    }
  }, [data, isLoading])
}

export default useAuthorize
