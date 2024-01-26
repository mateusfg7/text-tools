'use client'

import {
  ArrowUpZA,
  Check,
  Copy,
  Download,
  Eraser,
  LucideIcon,
  RotateCcw,
} from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import useCopy from 'use-copy'
import { Button } from '~/shared/components/button'
import { Textarea } from '~/shared/components/textarea'
import { downloadText } from '~/shared/lib/download-text'
import { getSentences } from '~/shared/lib/get-sentences'

const CaseTransformButton = ({
  title,
  onClick,
}: {
  title: string
  disabled?: boolean
  onClick: () => void
}) => (
  <Button onClick={onClick} size="sm" variant="outline">
    {title}
  </Button>
)

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
  <Button onClick={onClick} className="space-x-2">
    <Icon size="1em" />
    <span>{title}</span>
  </Button>
)

const isUpper = (char: string) => char === char.toUpperCase()

export default function Page() {
  const [displayText, setDisplayText] = useState('')
  const [backupText, setBackupText] = useState('')

  const [copied, copy, setCopied] = useCopy(displayText)

  function handleCopyText() {
    copy()

    toast.success('Text copied to the clipboard!')
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  function handleInputText(e: ChangeEvent<HTMLTextAreaElement>) {
    setBackupText(e.target.value)
    setDisplayText(e.target.value)
  }

  function reverseText() {
    setDisplayText((curr) => curr.split('').reverse().join(''))
  }

  const caseTransform = {
    upper: () => setDisplayText((curr) => curr.toUpperCase()),
    lower: () => setDisplayText((curr) => curr.toLowerCase()),
    sentence: () => {
      const sentencesArray = getSentences(displayText)
      if (!sentencesArray) return

      const charSplitSentences = sentencesArray.map((sentence) =>
        sentence.trim().split(''),
      )

      const transformedChars = charSplitSentences.map((sentenceChars) =>
        sentenceChars
          .map((char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase()))
          .join(''),
      )
      setDisplayText(transformedChars.join(' '))
    },
    inverse: () => {
      const splitChar = displayText.split('')
      const inverted = splitChar.map((char) =>
        isUpper(char) ? char.toLowerCase() : char.toUpperCase(),
      )

      setDisplayText(inverted.join(''))
    },
    alternate: () => {
      const splitChar = displayText.split('')
      const alternated = splitChar.map((char, i) =>
        i % 2 === 0 ? char.toUpperCase() : char.toLowerCase(),
      )
      setDisplayText(alternated.join(''))
    },
    snake: () => {
      // https://stackoverflow.com/a/4328546
      const normalizedText = displayText
        .replace(/[^\w\s\']|_/g, '')
        .replace(/\s+/g, ' ')
      setDisplayText(normalizedText.toLowerCase().replaceAll(' ', '_'))
    },
    capitalize: () => {
      const listOfSplitChars = displayText
        .split(' ')
        .map((word) => word.split(''))
      const capitalizedWords = listOfSplitChars.map((charList) =>
        charList
          .map((char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase()))
          .join(''),
      )

      setDisplayText(capitalizedWords.join(' '))
    },
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <Textarea
          value={displayText}
          onChange={handleInputText}
          className="min-h-36 text-lg"
        />
        <div className="flex justify-center gap-2 flex-wrap">
          <CaseTransformButton
            onClick={() => caseTransform.sentence()}
            title="Sentence case"
          />
          <CaseTransformButton
            onClick={() => caseTransform.lower()}
            title="lower case"
          />
          <CaseTransformButton
            onClick={() => caseTransform.upper()}
            title="UPPER CASE"
          />
          <CaseTransformButton
            onClick={() => caseTransform.capitalize()}
            title="Capitalized Case"
          />
          <CaseTransformButton
            onClick={() => caseTransform.alternate()}
            title="AlTeRnAtInG cAsE"
          />
          <CaseTransformButton
            onClick={() => caseTransform.inverse()}
            title="iNvErSe CaSe"
          />
          <CaseTransformButton
            onClick={() => caseTransform.snake()}
            title="snake_case"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <ActionButton
          onClick={() => setDisplayText('')}
          Icon={Eraser}
          title="Clear"
        />
        <ActionButton
          onClick={() => setDisplayText(backupText)}
          Icon={RotateCcw}
          title="Restore"
        />
        <ActionButton onClick={reverseText} Icon={ArrowUpZA} title="Reverse" />
        <ActionButton
          onClick={handleCopyText}
          Icon={copied ? Check : Copy}
          title="Copy"
        />
        <ActionButton
          onClick={() => downloadText(displayText, 'transformed')}
          Icon={Download}
          title="Download"
        />
      </div>
    </div>
  )
}
