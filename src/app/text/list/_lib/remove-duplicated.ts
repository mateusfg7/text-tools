import { Divisor, getDivisor } from './divisor'

export function removeDuplicated(list: string, divisor: Divisor) {
  console.log(list)

  const divisorChar = getDivisor(divisor)
  console.log(divisorChar)

  const listArray = list.split(divisorChar)
  console.log(listArray)

  // https://stackoverflow.com/a/9229821
  let seen: { [key: string]: boolean } = {}
  const uniq = listArray.filter(item => {
    return seen.hasOwnProperty(item.trim()) ? false : (seen[item.trim()] = true)
  })
  console.log(uniq)

  return uniq.join(divisorChar).trim()
}
