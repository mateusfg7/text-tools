import { padZero } from '~/shared/lib/pad-zero'

export const Divisors = ['hyphen', 'space'] as const
export type Divisor = (typeof Divisors)[number]
const getDivisor = (d: Divisor) => {
  switch (d) {
    case 'hyphen':
      return '-'
    case 'space':
      return ' '
  }
}

const getKey = () => {
  const specialChars = '!?"\'., []{}<>\\|-'.split('')
  const lowerChars = 'aâãáàbcçdeêẽéèfghiîĩíìjklmnoôõóòpqrstuûũúùvwxyz'.split('')
  const upperChars = lowerChars.map(char => char.toUpperCase())

  return [...lowerChars, ...upperChars, ...specialChars]
}

function encrypt(text: string, divisor: string) {
  const key = getKey()

  return text
    .split('\n')
    .map(lines =>
      lines
        .split('')
        .map(char =>
          !key.includes(char) ? char : padZero(key.indexOf(char) + 1)
        )
        .join(divisor)
    )
    .join('\n')
}

function decrypt(text: string, divisor: string) {
  const key = getKey()

  return text
    .split('\n')
    .map(lines =>
      lines
        .split(divisor)
        .map(nKey => (Number(nKey) ? key[Number(nKey) - 1] : nKey))
        .join('')
    )
    .join('\n')
}

export const Methods = ['Decrypt', 'Encrypt'] as const
export type Method = (typeof Methods)[number]
export function letterToNumber(
  text: string,
  divisor: Divisor = 'space',
  method: Method = 'Encrypt'
) {
  const charDivisor = getDivisor(divisor)

  return method === 'Encrypt'
    ? encrypt(text, charDivisor)
    : decrypt(text, charDivisor)
}
