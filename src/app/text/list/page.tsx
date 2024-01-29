'use client'

import { useState } from 'react'
import {
  ArrowDownAZ,
  ArrowDownZA,
  CopyX,
  Download,
  LucideIcon,
  Undo2
} from 'lucide-react'

import { downloadText } from '~/shared/lib/download-text'

import { Textarea } from '~/shared/components/textarea'
import { Button, ButtonProps } from '~/shared/components/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/shared/components/select'
import { CopyButton } from '~/shared/components/copy-button'

import { removeDuplicated } from './_lib/remove-duplicated'
import { Divisor } from './_lib/divisor'
import { SortDirection, sortList } from './_lib/sort-list'

const ActionButton = ({
  title,
  Icon,
  onClick,
  disabled,
  variant
}: {
  Icon: LucideIcon
} & ButtonProps) => (
  <Button
    onClick={onClick}
    className="space-x-2"
    variant={variant ?? 'secondary'}
    disabled={disabled}
  >
    <Icon size="1em" />
    <span>{title}</span>
  </Button>
)

export default function Page() {
  const [displayText, setDisplayText] = useState('')
  const [divisor, setDivisor] = useState<Divisor>('comma')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asce')
  const [history, setHistory] = useState<string[]>([])

  function saveCurrentState() {
    setHistory(curr => [...curr, displayText])
  }
  function undo() {
    const lastIndex = history.length - 1

    setDisplayText(history[lastIndex])
    setHistory(curr => curr.slice(0, lastIndex))
  }

  return (
    <div className="space-y-7">
      <div className="space-y-3">
        <Textarea
          id="plain-text"
          placeholder="keyboard, mouse, headset..."
          className="text-lg min-h-36"
          value={displayText}
          onChange={e => setDisplayText(e.target.value)}
        />
      </div>
      <div className="space-y-6">
        <div className="flex justify-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 border border-border rounded-md">
            <span className="px-3">Divider</span>
            <Select
              onValueChange={value => setDivisor(value as Divisor)}
              defaultValue="comma"
            >
              <SelectTrigger className="w-fit space-x-3 text-base border-y-0 border-r-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="space">Space</SelectItem>
                <SelectItem value="hyphen">Hyphen</SelectItem>
                <SelectItem value="comma">Comma</SelectItem>
                <SelectItem value="line">Line</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1 border border-border rounded-md">
            <Select
              onValueChange={value => setSortDirection(value as SortDirection)}
              defaultValue="asce"
            >
              <SelectTrigger className="w-fit space-x-3 text-base border-y-0 border-l-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asce">Ascendent</SelectItem>
                <SelectItem value="desc">Descendent</SelectItem>
              </SelectContent>
            </Select>
            <ActionButton
              onClick={() => {
                saveCurrentState()
                setDisplayText(curr => sortList(curr, divisor, sortDirection))
              }}
              disabled={displayText.length < 1}
              Icon={sortDirection === 'asce' ? ArrowDownAZ : ArrowDownZA}
              title="Sort"
              variant="ghost"
            />
          </div>

          <ActionButton
            onClick={() => {
              saveCurrentState()
              setDisplayText(curr => removeDuplicated(curr, divisor))
            }}
            disabled={displayText.length < 1}
            Icon={CopyX}
            title="Remove duplicated"
          />
        </div>
        <div className="flex justify-center gap-2 flex-wrap">
          <ActionButton
            onClick={undo}
            disabled={history.length < 1}
            Icon={Undo2}
            title="Undo"
            variant="default"
          />
          <CopyButton
            text={displayText}
            disabled={displayText.length < 1}
            toastMessage="List copied to the clipboard!"
          />
          <ActionButton
            onClick={() => downloadText(displayText, 'list')}
            disabled={displayText.length < 1}
            Icon={Download}
            title="Download"
            variant="default"
          />
        </div>
      </div>
    </div>
  )
}
