'use client'

import { useState } from 'react'

import { Textarea } from '~/shared/components/textarea'
import { Input } from '~/shared/components/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/shared/components/select'

import { caesarCipher } from '../_lib/caesar-cipher'
import { CipherContainer } from './cipher-container'
import { Label } from '~/shared/components/label'
import { Button } from '~/shared/components/button'
import { Check, Copy, Download, LucideIcon } from 'lucide-react'
import useCopy from 'use-copy'
import { toast } from 'sonner'
import { downloadText } from '~/shared/lib/download-text'

const ActionButton = ({
  title,
  Icon,
  onClick,
}: {
  title: string
  onClick: () => void
  disabled?: boolean
  Icon: LucideIcon
}) => (
  <Button onClick={onClick} className="space-x-2" variant="secondary">
    <Icon size="1em" />
    <span>{title}</span>
  </Button>
)

type CaesarMethod = 'Decrypt' | 'Encrypt'
type Props = {
  plainText: string
}
export function CaesarCipher({ plainText }: Props) {
  const [caesarShift, setCaesarShift] = useState(1)
  const [caesarMethod, setCaesarMethod] = useState<CaesarMethod>('Encrypt')

  const cipheredText = caesarCipher(
    plainText,
    caesarShift,
    caesarMethod === 'Decrypt',
  )

  const [copied, copy, setCopied] = useCopy(cipheredText)

  function handleCopyText() {
    copy()

    toast.success('Ciphered text copied to the clipboard!')
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <CipherContainer title="Caesar Cipher" className="space-y-2">
      <Textarea readOnly className="text-lg min-h-28" value={cipheredText} />
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
            onChange={(e) => setCaesarShift(Number(e.target.value))}
          />
        </div>
        <Select
          onValueChange={(value) => setCaesarMethod(value as CaesarMethod)}
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
          Icon={copied ? Check : Copy}
          title="Copy"
        />
        <ActionButton
          onClick={() => downloadText(cipheredText, 'caesar-ciphered-text')}
          Icon={Download}
          title="Download"
        />
      </div>
    </CipherContainer>
  )
}
