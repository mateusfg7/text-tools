export function alternatedCase(text: string) {
  const splitChar = text.split('')
  const alternated = splitChar.map((char, i) =>
    i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
  )

  return alternated.join('')
}
