const isUpper = (char: string) => char === char.toUpperCase()

export function inverseCase(text: string) {
  const splitChar = text.split('')
  const inverted = splitChar.map(char =>
    isUpper(char) ? char.toLowerCase() : char.toUpperCase()
  )

  return inverted.join('')
}
