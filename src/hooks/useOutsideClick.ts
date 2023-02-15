import { RefObject, useEffect } from 'react'

const useOutsideClick = (
  ref: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  func: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    if (Array.isArray(ref)) {
      if (
        ref.some((item) => item.current === undefined) ||
        ref.some((item) => item.current?.contains(<Node>e.target))
      ) {
        return
      }
    } else if (!ref.current || ref.current.contains(<Node>e.target)) {
      return
    }

    func()
  }

  useEffect(() => {
    if (Array.isArray(ref)) {
      if (ref.some((item) => item.current === undefined)) {
        return
      }
    } else if (!ref.current) {
      return
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('contextmenu', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('contextmenu', handleClick)
    }
  }, [ref, func])
}

export default useOutsideClick
