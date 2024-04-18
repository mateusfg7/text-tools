import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '~/shared/components/select'
import { Label } from '~/shared/components/label'
import { BASE_LABELS, Base } from '../_lib/convert-bases'

interface SelectBaseProps {
  label: string
  value: Base
  onChange: (value: Base) => void
}

export function SelectBase({ label, value, onChange }: SelectBaseProps) {
  function handleSelectBase(value: string): void {
    onChange(value as Base)
  }

  return (
    <>
      <Label>{label}</Label>
      <Select value={value} onValueChange={handleSelectBase}>
        <SelectTrigger>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {BASE_LABELS.map((base, i) => (
            <SelectItem value={base.type} key={i}>
              {base.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
