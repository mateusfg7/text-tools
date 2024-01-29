import { Button } from '~/shared/components/button'

export const TransformButton = ({
  title,
  disabled = false,
  onClick
}: {
  title: string
  disabled?: boolean
  onClick: () => void
}) => (
  <Button onClick={onClick} disabled={disabled} size="sm" variant="outline">
    {title}
  </Button>
)
