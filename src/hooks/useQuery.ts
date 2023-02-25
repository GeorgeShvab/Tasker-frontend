import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const useQuery = () => {
  const location = useLocation()

  const query = useMemo(() => new URLSearchParams(location.search), [location])

  return Object.fromEntries(query)
}

export default useQuery
