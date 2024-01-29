export function capitalizedCase(text: string) {
  const listOfSplitChars = text.split(' ').map(word => word.split(''))
  const capitalizedWords = listOfSplitChars.map(charList =>
    charList
      .map((char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join('')
  )

  return capitalizedWords.join(' ')
}
