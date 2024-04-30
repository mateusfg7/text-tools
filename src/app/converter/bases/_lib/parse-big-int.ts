// https://es.discourse.group/t/feature-request-parseint-for-bigint-convert-any-string-of-any-radix/150/8
export function parseBigInt(str: string, base = 36n) {
  str = str.toUpperCase()

  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  return Array.prototype.reduce.call(
    str,
    (acc: unknown, digit: string) => {
      const pos = BigInt(alphabet.indexOf(digit))
      return (acc as bigint) * base + pos
    },
    0n
  )
}
