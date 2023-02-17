function debounce(func: (...args: any) => any, ms: number = 250) {
  let time: any

  function wrapper(this: any, ...args: []) {
    clearTimeout(time)

    time = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }

  return wrapper
}

export default debounce
