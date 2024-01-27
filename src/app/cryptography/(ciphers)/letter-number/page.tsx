'use client'

import { useState } from 'react'
import { Check, Copy, Download, LucideIcon } from 'lucide-react'
import useCopy from 'use-copy'
import { toast } from 'sonner'

import { downloadText } from '~/shared/lib/download-text'

import { Label } from '~/shared/components/label'
import { Textarea } from '~/shared/components/textarea'
import { Button } from '~/shared/components/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/shared/components/select'

import { Divisor, Method, letterToNumber } from './_lib/letter-to-number'

const ActionButton = ({
  title,
  Icon,
  onClick,
  disabled,
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
  const [method, setMethod] = useState<Method>('Encrypt')
  const [divisor, setDivisor] = useState<Divisor>('space')

  const cipheredText = letterToNumber(plainText, divisor, method)

  const [copied, copy, setCopied] = useCopy(cipheredText)

  function handleCopyText() {
    copy()

    toast.success('Ciphered text copied to the clipboard!')
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="space-y-7">
      <div className="space-y-3">
        <Label htmlFor="plain-text">Target plain text</Label>
        <Textarea
          id="plain-text"
          placeholder="Plain text..."
          className="text-lg min-h-28"
          value={plainText}
          onChange={(e) => setPlainText(e.target.value)}
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
            onValueChange={(value) => setDivisor(value as Divisor)}
            defaultValue="space"
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
          onValueChange={(value) => setMethod(value as Method)}
          defaultValue="Encrypt"
        >
          <SelectTrigger className="w-fit space-x-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Encrypt">Encrypt</SelectItem>
            <SelectItem value="Decrypt">Decrypt</SelectItem>
          </SelectContent>
        </Select>
        <ActionButton
          onClick={handleCopyText}
          disabled={plainText.length < 1}
          Icon={copied ? Check : Copy}
          title="Copy"
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
