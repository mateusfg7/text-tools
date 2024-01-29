import { LucideIcon } from 'lucide-react'

import { Button } from '~/shared/components/button'

export const ActionButton = ({
  title,
  Icon,
  disabled = false,
  onClick
}: {
  title: string
  onClick: () => void
  disabled?: boolean
  Icon: LucideIcon
}) => (
  <Button onClick={onClick} disabled={disabled} className="space-x-2">
    <Icon size="1em" />
    <span>{title}</span>
  </Button>
)
