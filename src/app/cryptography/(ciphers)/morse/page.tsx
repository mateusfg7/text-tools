'use client'

import { useState } from 'react'
import { Download, LucideIcon } from 'lucide-react'
import { parseAsStringLiteral, useQueryState } from 'nuqs'

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
import { CopyButton } from '~/shared/components/copy-button'

import { Method, Methods, morse } from './_lib/morse'

const ActionButton = ({
  title,
  Icon,
  onClick,
  disabled
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
  const [method, setMethod] = useQueryState(
    'method',
    parseAsStringLiteral(Methods).withDefault('encode')
  )

  const encodedText = morse(plainText, method)

  const isEncoding = method === 'encode'

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
          value={encodedText}
        />
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        <Select
          onValueChange={value => setMethod(value as Method)}
          defaultValue={method}
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
          text={encodedText}
          disabled={plainText.length < 1}
          variant="secondary"
          toastMessage={`${isEncoding ? 'Morse code' : 'Decoded text'} copied to the clipboard!`}
        />
        <ActionButton
          onClick={() =>
            downloadText(
              encodedText,
              isEncoding ? 'morse-encoded' : 'morse-decoded'
            )
          }
          disabled={plainText.length < 1}
          Icon={Download}
          title="Download"
        />
      </div>
    </div>
  )
}
