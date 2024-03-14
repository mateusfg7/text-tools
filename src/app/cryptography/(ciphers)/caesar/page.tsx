'use client'

import { useState } from 'react'
import { Download, LucideIcon } from 'lucide-react'
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs'

import { downloadText } from '~/shared/lib/download-text'

import { Label } from '~/shared/components/label'
import { Textarea } from '~/shared/components/textarea'
import { Button } from '~/shared/components/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/shared/components/select'
import { Input } from '~/shared/components/input'
import { CopyButton } from '~/shared/components/copy-button'

import { Method, Methods, caesarCipher } from './_lib/caesar-cipher'

const ActionButton = ({
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
  <Button
    onClick={onClick}
    className="space-x-2"
    variant="secondary"
    disabled={disabled}
  >
    <Icon size="1em" />
    <span>{title}</span>
  </Button>
)

export default function Page() {
  const [plainText, setPlainText] = useState('')
  const [caesarShift, setCaesarShift] = useQueryState(
    'shift',
    parseAsInteger.withDefault(1)
  )
  const [caesarMethod, setCaesarMethod] = useQueryState(
    'method',
    parseAsStringLiteral(Methods).withDefault('encode')
  )

  const cipheredText = caesarCipher(plainText, caesarShift, caesarMethod)

  return (
    <div className="space-y-7">
      <div className="space-y-3">
        <Label htmlFor="plain-text">Target plain text</Label>
        <Textarea
          id="plain-text"
          placeholder="Plain text..."
          className="text-lg min-h-28"
          value={plainText}
          onChange={e => setPlainText(e.target.value)}
        />
      </div>
      <div className="space-y-3">
        <Label htmlFor="result">Result</Label>
        <Textarea
          readOnly
          id="result"
          className="text-lg min-h-28"
          value={cipheredText}
        />
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        <div className="border border-border rounded-md gap-2 flex items-center">
          <Label htmlFor="shift" className="px-3">
            Shift
          </Label>
          <Input
            type="number"
            id="shift"
            value={caesarShift}
            className="w-20 space-x-2 border-y-0 border-r-0"
            onChange={e => setCaesarShift(Number(e.target.value))}
          />
        </div>
        <Select
          onValueChange={value => setCaesarMethod(value as Method)}
          defaultValue={caesarMethod}
        >
          <SelectTrigger className="w-fit space-x-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="encode">Encode</SelectItem>
            <SelectItem value="decode">Decode</SelectItem>
          </SelectContent>
        </Select>
        <CopyButton
          text={cipheredText}
          disabled={plainText.length < 1}
          variant="secondary"
          toastMessage="Ciphered text copied to the clipboard!"
        />
        <ActionButton
          onClick={() => downloadText(cipheredText, 'caesar-ciphered-text')}
          disabled={plainText.length < 1}
          Icon={Download}
          title="Download"
        />
      </div>
    </div>
  )
}
