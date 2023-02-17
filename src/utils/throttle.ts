function throttle(func: (...args: any) => any, ms: number = 250) {
  let throttled: boolean = false

  let savedArgs: [] | null
  let savedThis: any

  function wrapper(this: any, ...args: []) {
    if (throttled) {
      savedArgs = args
      savedThis = this
      return
    }

    throttled = true

    func.apply(this, args)

    setTimeout(() => {
      throttled = false

      if (savedArgs) {
        func.apply(savedThis, savedArgs)
        savedArgs = null
        savedThis = null
        throttled = true

        setTimeout(() => {
          throttled = false
        }, ms)
      }
    }, ms)
  }

  return wrapper
}

export default throttle
