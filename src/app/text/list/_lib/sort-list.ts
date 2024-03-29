import { Divisor, getDivisor } from './divisor'

export const SortDirections = ['asce', 'desc'] as const
export type SortDirection = (typeof SortDirections)[number]
export function sortList(
  list: string,
  divisor: Divisor,
  direction: SortDirection = 'asce'
) {
  const divisorChar = getDivisor(divisor)
  const listArray = list
    .split(divisorChar)
    .map(item => item.trim())
    .filter(item => item !== divisorChar)
    .filter(item => item !== '')

  const addSpace = divisor === 'comma'
  const sortedArray = listArray.sort()

  return direction === 'asce'
    ? sortedArray.join(addSpace ? `${divisorChar} ` : divisorChar)
    : sortedArray.reverse().join(addSpace ? `${divisorChar} ` : divisorChar)
}
