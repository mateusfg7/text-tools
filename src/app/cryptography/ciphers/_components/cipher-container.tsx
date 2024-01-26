import { ComponentProps, ReactNode } from 'react'

type Props = {
  title: string
} & ComponentProps<'div'>
export function CipherContainer({ title, ...rest }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl bg-primary-foreground p-3 leading-none rounded-md">
        <span>{title}</span>
      </h2>
      <div {...rest} />
    </div>
  )
}
