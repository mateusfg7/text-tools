'use client'

import { Check, Copy, Download, Eraser, Undo2 } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import useCopy from 'use-copy'

import { downloadText } from '~/shared/lib/download-text'

import { Textarea } from '~/shared/components/textarea'

import { TransformButton } from './_components/transform-button'
import { ActionButton } from './_components/action-button'

import { reverseText } from './_lib/reverse-text'
import { sentenceCase } from './_lib/sentence-case'
import { inverseCase } from './_lib/inverse-case'
import { alternatedCase } from './_lib/alternated-case'
import { snakeCase } from './_lib/snake-case'
import { capitalizedCase } from './_lib/capitalized-case'

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

  const caseTransform = {
    upper: () => setDisplayText(curr => curr.toUpperCase()),
    lower: () => setDisplayText(curr => curr.toLowerCase()),
    inverse: () => setDisplayText(curr => inverseCase(curr)),
    sentence: () => {
      const sentenceCaseText = sentenceCase(displayText)
      sentenceCaseText && setDisplayText(sentenceCaseText)
    },
    alternate: () => setDisplayText(curr => alternatedCase(curr)),
    snake: () => setDisplayText(curr => snakeCase(curr)),
    capitalize: () => setDisplayText(curr => capitalizedCase(curr))
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
            onClick={() => setDisplayText(curr => reverseText(curr))}
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
