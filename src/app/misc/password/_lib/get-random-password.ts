type Props = {
  size: number
  alphabet: string[]
}

export function getRandomPassword({ alphabet, size }: Props): string {
  let newPasswordCharsArray: string[] = []

  for (let index = 0; index < size; index++) {
    const charIndex = Math.floor(Math.random() * alphabet.length)
    newPasswordCharsArray.push(alphabet[charIndex])
  }

  return newPasswordCharsArray.join('')
}
