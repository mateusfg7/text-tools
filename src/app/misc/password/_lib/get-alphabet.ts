import { shuffleArray } from '~/shared/lib/shuffle-array'

import {
  isLowerCasedLetter,
  isNumber,
  isSpecial,
  isUpperCasedLetter
} from './char-filters'

export function getAlphabet({
  lower,
  numbers,
  special,
  upper
}: {
  lower: boolean
  numbers: boolean
  special: boolean
  upper: boolean
}) {
  const alphabet =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'.split(
      ''
    )

  return shuffleArray(alphabet).filter(
    char =>
      (upper && isUpperCasedLetter(char)) ||
      (lower && isLowerCasedLetter(char)) ||
      (numbers && isNumber(char)) ||
      (special && isSpecial(char))
  )
}
