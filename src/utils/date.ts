export const formatDate = (input: string): Date | null => {
  if (!input) {
    return null
  }

  if (input.length === 10) {
    const splitedDate = input.split('-')

    const date = Number(splitedDate[0])
    const month = Number(splitedDate[1]) - 1
    const year = Number(splitedDate[2])

    if (isNaN(date) || isNaN(month) || isNaN(year)) {
      return null
    }

    return new Date(
      new Date(
        new Date(
          new Date(
            new Date(
              new Date(new Date().setUTCDate(date)).setUTCMonth(month)
            ).setUTCFullYear(year)
          ).setUTCHours(12)
        ).setUTCMinutes(0)
      ).setUTCSeconds(0)
    )
  } else if (input.length === 8) {
    const splitedDate = input.split('-')

    const date = Number(splitedDate[0])
    const month = Number(splitedDate[1]) - 1
    const year = Number(splitedDate[2])

    if (isNaN(date) || isNaN(month) || isNaN(year)) {
      return null
    }

    return new Date(
      new Date(
        new Date(
          new Date(
            new Date(
              new Date(new Date().setUTCDate(date)).setUTCMonth(month)
            ).setUTCFullYear(Number('20' + String(year)))
          ).setUTCHours(12)
        ).setUTCMinutes(0)
      ).setUTCSeconds(0)
    )
  } else if (input.length === 5) {
    const splitedDate = input.split('-')

    const date = Number(splitedDate[0])
    const month = Number(splitedDate[1]) - 1

    if (isNaN(date) || isNaN(month)) {
      return null
    }

    let year

    if (month === 12 && date < new Date().getDate()) {
      year = new Date().getFullYear() + 1
    } else {
      year = new Date().getFullYear()
    }

    return new Date(
      new Date(
        new Date(
          new Date(
            new Date(
              new Date(new Date().setUTCDate(date)).setUTCMonth(month)
            ).setUTCFullYear(year)
          ).setUTCHours(12)
        ).setUTCMinutes(0)
      ).setUTCSeconds(0)
    )
  } else if (input.length === 2) {
    const date = Number(input)

    if (isNaN(date)) {
      return null
    }

    let year = new Date().getFullYear()

    let month = new Date().getMonth() - 1

    if (new Date().getMonth() + 1 === 12 && date < new Date().getDate()) {
      year = new Date().getFullYear() + 1
      month = 0
    } else if (date < new Date().getDate()) {
      month = new Date().getMonth()
    }

    return new Date(
      new Date(
        new Date(
          new Date(
            new Date(
              new Date(new Date().setUTCDate(date)).setUTCMonth(
                month || new Date().getMonth()
              )
            ).setUTCFullYear(year)
          ).setUTCHours(12)
        ).setUTCMinutes(0)
      ).setUTCSeconds(0)
    )
  }

  return null
}

export const unformatDate = (input: string) => {
  if (!input) return ''

  const taskDate = new Date(input)

  const date =
    taskDate.getDate() < 10 ? '0' + taskDate.getDate() : taskDate.getDate()
  const month =
    taskDate.getMonth() < 10
      ? '0' + (taskDate.getMonth() + 1)
      : taskDate.getMonth() + 1
  const year = taskDate.getFullYear()

  return [date, month, year].join('-')
}
