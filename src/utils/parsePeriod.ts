const parsePeriod = (value: string) => {
  const result = value.search(/period=/)

  if (result === -1) return null

  const matches: any = [...value.matchAll(/&/g)]
    .map((item) => item.index)
    .filter((item) => item !== undefined)

  let end = matches.findIndex((item: number) => item > result)

  if (end === -1) {
    const period = value.slice(result + 7, matches[end])

    return period.at(0)?.toUpperCase() + period.slice(1, period.length)
  }

  const period = value.slice(result + 7, matches[end])

  return period.at(0)?.toUpperCase() + period.slice(1, period.length)
}

export default parsePeriod
