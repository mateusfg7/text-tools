'use client'

import { ChangeEvent, useState } from 'react'
import { Download, LucideIcon } from 'lucide-react'

import { downloadText } from '~/shared/lib/download-text'

import { Textarea } from '~/shared/components/textarea'
import { Button } from '~/shared/components/button'
import { CopyButton } from '~/shared/components/copy-button'

import { getStatistics } from './_lib/get-statistics'

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
  onClick
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

  const { charCount, lineCount, sentencesCount, wordCount } =
    getStatistics(text)

  const visualData = `Char Count:       ${charCount}\nWord Count:       ${wordCount}\nSentences Count:  ${sentencesCount}\nLine Count:       ${lineCount}`

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
        <CopyButton
          text={visualData}
          disabled={text.length < 1}
          toastMessage="Statistics copied to the clipboard!"
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
