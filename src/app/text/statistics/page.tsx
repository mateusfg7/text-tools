'use client'

import { ChangeEvent, useState } from 'react'
import { Check, Copy, Download, LucideIcon } from 'lucide-react'
import useCopy from 'use-copy'
import { toast } from 'sonner'

import { getSentences } from '~/shared/lib/get-sentences'
import { downloadText } from '~/shared/lib/download-text'

import { Textarea } from '~/shared/components/textarea'
import { Button } from '~/shared/components/button'

type CardProps = {
  title: string
  value: number | string
}
const Card = ({ title, value }: CardProps) => (
  <div className="flex items-center gap-2 p-3 border border-border rounded-md justify-center w-fit">
    <span className="text-lg text-foreground/70 leading-none">{title}</span>
    <span className="font-bold text-lg leading-none">{value}</span>
  </div>
)

const ActionButton = ({
  title,
  Icon,
  disabled = false,
  onClick,
}: {
  title: string
  onClick: () => void
  disabled?: boolean
  Icon: LucideIcon
}) => (
  <Button onClick={onClick} className="space-x-2" disabled={disabled}>
    <Icon size="1em" />
    <span>{title}</span>
  </Button>
)

export default function Page() {
  const [text, setText] = useState('')

  function handleInputText(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
  }

  const wordCount = text.split(' ').filter((word) => word.length > 0).length
  const charCount = text.replaceAll(' ', '').split('').length
  const lineCount = text.split('\n').filter((word) => word.length > 0).length
  const sentencesCount = getSentences(text)?.length ?? 0

  const visualData = `Char Count:       ${charCount}\nWord Count:       ${wordCount}\nSentences Count:  ${sentencesCount}\nLine Count:       ${lineCount}`

  const [copied, copy, setCopied] = useCopy(visualData)

  function handleCopyText() {
    copy()

    toast.success('Statistics copied to the clipboard!')
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="space-y-12">
      <div className="space-y-5">
        <Textarea
          value={text}
          onChange={handleInputText}
          className="min-h-44 text-lg"
        />
        <div className="flex justify-center gap-5 flex-wrap">
          <Card title="Char count" value={charCount} />
          <Card title="Word count" value={wordCount} />
          <Card title="Sentence count" value={sentencesCount} />
          <Card title="Line count" value={lineCount} />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <ActionButton
          onClick={handleCopyText}
          disabled={text.length < 1}
          Icon={copied ? Check : Copy}
          title="Copy"
        />
        <ActionButton
          onClick={() => downloadText(text, 'statistics')}
          disabled={text.length < 1}
          Icon={Download}
          title="Download"
        />
      </div>
    </div>
  )
}
