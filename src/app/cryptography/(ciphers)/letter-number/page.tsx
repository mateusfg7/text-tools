'use client'

import { Suspense, useState } from 'react'
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

import {
  Divisor,
  Divisors,
  Method,
  Methods,
  letterToNumber
} from './_lib/letter-to-number'

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

function ClientPage() {
  const [plainText, setPlainText] = useState('')
  const [method, setMethod] = useQueryState(
    'method',
    parseAsStringLiteral(Methods).withDefault('Encrypt')
  )
  const [divisor, setDivisor] = useQueryState(
    'divisor',
    parseAsStringLiteral(Divisors).withDefault('space')
  )

  const cipheredText = letterToNumber(plainText, divisor, method)

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
        <div className="flex items-center gap-1 border border-border rounded-md">
          <span className="px-3">Divider</span>
          <Select
            onValueChange={value => setDivisor(value as Divisor)}
            defaultValue={divisor}
          >
            <SelectTrigger className="w-fit space-x-3 text-base border-y-0 border-r-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="space">Space</SelectItem>
              <SelectItem value="hyphen">Hyphen</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select
          onValueChange={value => setMethod(value as Method)}
          defaultValue={method}
        >
          <SelectTrigger className="w-fit space-x-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Encrypt">Encrypt</SelectItem>
            <SelectItem value="Decrypt">Decrypt</SelectItem>
          </SelectContent>
        </Select>
        <CopyButton
          text={cipheredText}
          disabled={plainText.length < 1}
          variant="secondary"
          toastMessage="Ciphered text copied to the clipboard!"
        />
        <ActionButton
          onClick={() => downloadText(cipheredText, 'letter-number-ciphered')}
          disabled={plainText.length < 1}
          Icon={Download}
          title="Download"
        />
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense>
      <ClientPage />
    </Suspense>
  )
}
