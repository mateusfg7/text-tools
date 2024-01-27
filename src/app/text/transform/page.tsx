'use client'

import { Check, Copy, Download, Eraser, LucideIcon, Undo2 } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import useCopy from 'use-copy'

import { downloadText } from '~/shared/lib/download-text'
import { getSentences } from '~/shared/lib/get-sentences'

import { Button } from '~/shared/components/button'
import { Textarea } from '~/shared/components/textarea'

const TransformButton = ({
  title,
  disabled = false,
  onClick
}: {
  title: string
  disabled?: boolean
  onClick: () => void
}) => (
  <Button onClick={onClick} disabled={disabled} size="sm" variant="outline">
    {title}
  </Button>
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
  <Button onClick={onClick} disabled={disabled} className="space-x-2">
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
    setDisplayText(curr => curr.split('').reverse().join(''))
  }

  const caseTransform = {
    upper: () => setDisplayText(curr => curr.toUpperCase()),
    lower: () => setDisplayText(curr => curr.toLowerCase()),
    sentence: () => {
      const sentencesArray = getSentences(displayText)
      if (!sentencesArray) return

      const charSplitSentences = sentencesArray.map(sentence =>
        sentence.trim().split('')
      )

      const transformedChars = charSplitSentences.map(sentenceChars =>
        sentenceChars
          .map((char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase()))
          .join('')
      )
      setDisplayText(transformedChars.join(' '))
    },
    inverse: () => {
      const splitChar = displayText.split('')
      const inverted = splitChar.map(char =>
        isUpper(char) ? char.toLowerCase() : char.toUpperCase()
      )

      setDisplayText(inverted.join(''))
    },
    alternate: () => {
      const splitChar = displayText.split('')
      const alternated = splitChar.map((char, i) =>
        i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
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
        .map(word => word.split(''))
      const capitalizedWords = listOfSplitChars.map(charList =>
        charList
          .map((char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase()))
          .join('')
      )

      setDisplayText(capitalizedWords.join(' '))
    }
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <Textarea
          value={displayText}
          onChange={handleInputText}
          placeholder="Type your text here..."
          className="min-h-36 text-lg"
        />
        <div className="flex justify-center gap-2 flex-wrap">
          <TransformButton
            onClick={() => caseTransform.sentence()}
            disabled={displayText.length < 1}
            title="Sentence case"
          />
          <TransformButton
            onClick={() => caseTransform.lower()}
            disabled={displayText.length < 1}
            title="lower case"
          />
          <TransformButton
            onClick={() => caseTransform.upper()}
            disabled={displayText.length < 1}
            title="UPPER CASE"
          />
          <TransformButton
            onClick={() => caseTransform.capitalize()}
            disabled={displayText.length < 1}
            title="Capitalized Case"
          />
          <TransformButton
            onClick={() => caseTransform.alternate()}
            disabled={displayText.length < 1}
            title="AlTeRnAtInG cAsE"
          />
          <TransformButton
            onClick={() => caseTransform.inverse()}
            disabled={displayText.length < 1}
            title="iNvErSe CaSe"
          />
          <TransformButton
            onClick={() => caseTransform.snake()}
            disabled={displayText.length < 1}
            title="snake_case"
          />
          <TransformButton
            onClick={reverseText}
            disabled={displayText.length < 1}
            title="Reverse"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <ActionButton
          onClick={() => setDisplayText('')}
          disabled={displayText.length < 1}
          Icon={Eraser}
          title="Clear"
        />
        <ActionButton
          onClick={() => setDisplayText(backupText)}
          disabled={backupText.length < 1}
          Icon={Undo2}
          title="Restore"
        />
        <ActionButton
          onClick={handleCopyText}
          disabled={displayText.length < 1}
          Icon={copied ? Check : Copy}
          title="Copy"
        />
        <ActionButton
          onClick={() => downloadText(displayText, 'transformed')}
          disabled={displayText.length < 1}
          Icon={Download}
          title="Download"
        />
      </div>
    </div>
  )
}
