import { Divisor, getDivisor } from './divisor'

export function removeDuplicated(list: string, divisor: Divisor) {
  const divisorChar = getDivisor(divisor)

  const listArray = list
    .split(divisorChar)
    .map(item => item.trim())
    .filter(item => item !== divisorChar)
    .filter(item => item !== '')

  // https://stackoverflow.com/a/9229821
  let seen: { [key: string]: boolean } = {}
  const uniq = listArray.filter(item => {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true)
  })

  const addSpace = divisor === 'comma'

  return uniq.join(addSpace ? `${divisorChar} ` : divisorChar).trim()
}
