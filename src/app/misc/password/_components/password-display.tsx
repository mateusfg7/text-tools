import {
  isLowerCasedLetter,
  isNumber,
  isSpecial,
  isUpperCasedLetter
} from '../_lib/char-filters'

type Props = {
  password: string
}
export function PasswordDisplay({ password }: Props) {
  return (
    <div className="flex justify-center flex-wrap border border-border w-full p-4 bg-muted/50 rounded-md">
      {password.split('').map((char, i) => {
        if (isUpperCasedLetter(char) || isLowerCasedLetter(char))
          return (
            <span key={i} className="text-neutral-950 dark:text-neutral-300">
              {char}
            </span>
          )
        if (isNumber(char))
          return (
            <span key={i} className="text-red-700 dark:text-red-400">
              {char}
            </span>
          )
        if (isSpecial(char))
          return (
            <span key={i} className="text-blue-700 dark:text-blue-400">
              {char}
            </span>
          )

        return <span key={i}>{char}</span>
      })}
    </div>
  )
}
