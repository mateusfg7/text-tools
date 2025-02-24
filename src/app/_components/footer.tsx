import { ArrowUpRight } from 'lucide-react'
import { ComponentProps } from 'react'

type LinkProps = Omit<ComponentProps<'a'>, 'children' | 'target'> & {
  text: string
}
const Link = ({ text, className, ...props }: LinkProps) => (
  <a
    {...props}
    target="_blank"
    className="inline-flex items-end text-muted-foreground cursor-pointer hover:text-accent-foreground transition-colors"
  >
    <span className="leading-none">{text}</span>
    <ArrowUpRight strokeWidth={1.5} size="1em" className="text-sm" />
  </a>
)

export function Footer() {
  return (
    <footer className="flex justify-center items-center flex-wrap gap-4 py-3">
      <Link
        href="https://mateusf.com?ref=https://text.mateusf.com"
        text="by Mateus Felipe"
      />
      <Link
        href="https://github.com/mateusfg7/text-tools/blob/main/LICENSE?ref=https://text.mateusf.com"
        text="GPL 3.0 License"
      />
      <Link
        href="https://github.com/mateusfg7/text-tools?ref=https://text.mateusf.com"
        text="Source Code"
      />
    </footer>
  )
}
