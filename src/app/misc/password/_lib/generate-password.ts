import { shuffleArray } from '~/shared/lib/shuffle-array'
import { randRange } from '~/shared/lib/rand-range'

export type Options = {
  size: number
  minimum: {
    upper: number
    lower: number
    numbers: number
    special: number
  }
}

export function generatePassword({
  size,
  minimum: { lower, numbers, special, upper }
}: Options) {
  const isAllDisabled = lower < 1 && upper < 1 && numbers < 1 && special < 1

  const minimum = isAllDisabled
    ? { lower: 1, numbers: 0, special: 0, upper: 0 }
    : { lower, numbers, special, upper }

  const lowercaseCharSet = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseCharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberCharSet = '0123456789'
  const specialCharSet = '!@#$%&*'

  let allCharSet = ''

  let positions: string[] = []

  if (minimum.lower > 0) {
    allCharSet += lowercaseCharSet
    for (let index = 0; index < minimum.lower; index++) {
      positions.push('l')
    }
  }

  if (minimum.upper > 0) {
    allCharSet += uppercaseCharSet
    for (let index = 0; index < minimum.upper; index++) {
      positions.push('u')
    }
  }

  if (minimum.numbers > 0) {
    allCharSet += numberCharSet
    for (let index = 0; index < minimum.numbers; index++) {
      positions.push('n')
    }
  }

  if (minimum.special > 0) {
    allCharSet += specialCharSet
    for (let index = 0; index < minimum.special; index++) {
      positions.push('s')
    }
  }

  while (positions.length < size) {
    positions.push('a')
  }

  positions = shuffleArray(positions)

  let password = ''
  for (let i = 0; i < size; i++) {
    let positionChars = ''

    switch (positions[i]) {
      case 'l':
        positionChars = lowercaseCharSet
        break
      case 'u':
        positionChars = uppercaseCharSet
        break
      case 'n':
        positionChars = numberCharSet
        break
      case 's':
        positionChars = specialCharSet
        break
      case 'a':
        positionChars = allCharSet
        break
      default:
        break
    }

    const randomCharIndex = randRange(0, positionChars.length - 1)
    password += positionChars.charAt(randomCharIndex)
  }

  return password
}
