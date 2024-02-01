import { getRandomPassword } from './get-random-password'
import { getAlphabet } from './get-alphabet'

export type Options = {
  size: number
  characters: {
    upper: boolean
    lower: boolean
    numbers: boolean
    special: boolean
  }
}

export function generatePassword({
  size,
  characters: { lower, numbers, special, upper }
}: Options) {
  const isAllDisabled = !(lower || upper || special || numbers)

  const characters = isAllDisabled
    ? { lower: true, numbers, special, upper }
    : { lower, numbers, special, upper }

  const alphabet = getAlphabet(characters)

  return getRandomPassword({
    size,
    alphabet
  })
}
