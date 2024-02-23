export const Divisors = ['hyphen', 'space', 'comma', 'line'] as const
export type Divisor = (typeof Divisors)[number]
export const getDivisor = (d: Divisor) => {
  switch (d) {
    case 'hyphen':
      return '-'
    case 'space':
      return ' '
    case 'comma':
      return ','
    case 'line':
      return '\n'
  }
}
