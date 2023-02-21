import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PageState } from '../../types'

const usePage = () => {
  const { pathname } = useLocation()

  const [page, setPage] = useState<PageState>({
    page: pathname.split('/')[0] || undefined,
    id: pathname.split('/')[1] || undefined,
  })

  useEffect(() => {
    setPage({
      page: pathname.split('/')[1] || undefined,
      id: pathname.split('/')[2] || undefined,
    })
  }, [pathname])

  return page
}

export default usePage
