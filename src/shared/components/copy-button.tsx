import useCopy from 'use-copy'
import { toast } from 'sonner'
import { Check, Copy } from 'lucide-react'

import { cn } from '~/shared/lib/utils'
import { Button, ButtonProps } from './button'

type Props = Omit<ButtonProps, 'onClick'> & {
  text: string
  toastMessage?: string
}
export function CopyButton({
  text,
  children,
  toastMessage = 'Copied to the clipboard!',
  className,
  ...rest
}: Props) {
  const [copied, copy, setCopied] = useCopy(text)

  function handleCopyText() {
    copy()

    toast.success(toastMessage)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const Icon = copied ? Check : Copy

  return (
    <Button
      {...rest}
      onClick={handleCopyText}
      className={cn('space-x-2', className)}
    >
      <Icon size="1em" />
      {children ?? <span>Copy</span>}
    </Button>
  )
}
