'use client'

import { ChangeEvent, useState } from 'react'
import { ArrowRightLeft } from 'lucide-react'

import { Textarea } from '~/shared/components/textarea'
import { CopyButton } from '~/shared/components/copy-button'
import { Label } from '~/shared/components/label'
import { Button } from '~/shared/components/button'

import { convertBases, Base, baseActions } from './_lib/convert-bases'
import { SelectBase } from './_components/select-base'

export default function Page() {
  const [input, setInput] = useState('')
  const [target, setTarget] = useState<{ from: Base; to: Base }>({
    from: 'BIN',
    to: 'HEX'
  })

  function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
    // const value = e.target.value.replace(/[^\w\s]/gi, '').replace(/\s/g, '')
    const value = e.target.value

    setInput(value)
  }

  const { from, to } = target
  const output = convertBases(input, from, to) ?? ''
  const inputIsValid = input ? baseActions[from].validate(input) : true

  function handleSetTarget(value: Base, selectedTarget: 'from' | 'to') {
    if (selectedTarget === 'from') {
      const swap = value === target.to ? target.from : target.to

      setTarget({ from: value, to: swap })
    } else if (selectedTarget === 'to') {
      const swap = value === target.from ? target.to : target.from

      setTarget({ to: value, from: swap })
    }
  }

  const swapTargets = () =>
    setTarget(curr => ({ from: curr.to, to: curr.from }))

  return (
    <div className="space-y-12">
      <div className="relative space-y-1">
        <Label htmlFor="input">Input</Label>
        <Textarea
          id="input"
          value={input}
          onChange={handleInput}
          placeholder="Data to be converted here..."
          data-valid={inputIsValid}
          className="min-h-32 text-lg data-[valid='false']:border-red-500"
        />
        <span
          data-valid={inputIsValid}
          className="text-red-500 text-sm absolute bottom-1 left-1 transition-opacity opacity-0 data-[valid='false']:opacity-100"
        >
          {baseActions[from].dictionary.error}
        </span>
      </div>
      <div className="flex gap-2 flex-col items-end lg:flex-row">
        <div className="flex-1">
          <SelectBase
            label="From"
            value={from}
            onChange={value => handleSetTarget(value, 'from')}
          />
        </div>
        <Button onClick={swapTargets} className="text-xl" variant="ghost">
          <ArrowRightLeft size="1em" strokeWidth="1.25px" />
        </Button>
        <div className="flex-1">
          <SelectBase
            label="To"
            value={to}
            onChange={value => handleSetTarget(value, 'to')}
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="output">Output</Label>
        <Textarea
          id="output"
          value={output}
          disabled={!output}
          placeholder="Converted value here..."
          className="min-h-32 text-lg"
        />
      </div>
      <div className="flex justify-center flex-wrap gap-5">
        <CopyButton
          text={output || ''}
          disabled={!output}
          toastMessage="Converted text copied to clipboard!"
          variant="secondary"
        />
      </div>
    </div>
  )
}
