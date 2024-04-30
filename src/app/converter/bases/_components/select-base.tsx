import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '~/shared/components/select'
import { Label } from '~/shared/components/label'
import { Base, baseList, baseActions } from '../_lib/convert-bases'

interface SelectBaseProps {
  label: string
  value: Base
  onChange: (value: Base) => void
}

export function SelectBase({ label, value, onChange }: SelectBaseProps) {
  function handleSelectBase(value: string) {
    onChange(value as Base)
  }

  return (
    <div className="space-y-1">
      <Label htmlFor={label} className="font-normal">
        {label}
      </Label>
      <Select value={value} onValueChange={handleSelectBase}>
        <SelectTrigger id={label} className="font-medium">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {baseList.map((base, i) => (
            <SelectItem value={base} key={i}>
              <span className="flex gap-2">
                <span>{baseActions[base].dictionary.label}</span>
                <span className="text-muted-foreground">
                  {baseActions[base].dictionary.example}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
