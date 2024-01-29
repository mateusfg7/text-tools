export type Divisor = 'hyphen' | 'space' | 'comma' | 'line'
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
