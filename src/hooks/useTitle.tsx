import { useEffect } from 'react'

const useTitle = (title: string): void => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export default useTitle
