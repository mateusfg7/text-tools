// https://www.30secondsofcode.org/js/s/caesar-cipher/
export function caesarCipher(
  str: string,
  shift: number,
  decrypt = false,
): string {
  const s = decrypt ? (26 - shift) % 26 : shift
  const n = s > 0 ? s : 26 + (s % 26)

  return str
    .split('')
    .map((l, i) => {
      const c = str.charCodeAt(i)
      if (c >= 65 && c <= 90)
        return String.fromCharCode(((c - 65 + n) % 26) + 65)
      if (c >= 97 && c <= 122)
        return String.fromCharCode(((c - 97 + n) % 26) + 97)
      return l
    })
    .join('')
}
