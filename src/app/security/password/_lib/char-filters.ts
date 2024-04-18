export const isUpperCasedLetter = (char: string) => /[A-Z]/.test(char)
export const isLowerCasedLetter = (char: string) => /[a-z]/.test(char)
export const isNumber = (char: string) => /[0-9]/.test(char)
export const isSpecial = (char: string) => /[!@#$%&*]/.test(char)
