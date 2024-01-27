export const padZero = (n: number) => {
  if (!(n < 10 && n > -10)) return String(n)

  return n < 0 ? `-0${Math.abs(n)}` : `0${n}`
}
