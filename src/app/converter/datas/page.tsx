'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { Textarea } from '~/shared/components/textarea'
import { Button } from '~/shared/components/button'
import { ArrowLeftRight, Cpu } from 'lucide-react'
import { convertDatas, Data } from './_lib/convert-data'
import { SelectData } from './_components/select-data'
import { CopyButton } from '~/shared/components/copy-button'
import { toast } from 'sonner'

export default function Page() {
  const [text, setText] = useState('')
  const [from, setFrom] = useState<Data>('JSON')
  const [to, setTo] = useState<Data>('CSV')
  const [output, setOutput] = useState('')

  function handleInputText(e: ChangeEvent<HTMLTextAreaElement>): void {
    setText(e.target.value)
  }

  function handleConvertButton(): void {
    try {
      let converted = convertDatas(text, from, to)
      setOutput(converted)
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  return (
    <div className="space-y-12">
      <div className="space-y-5">
        <Textarea
          value={text}
          onChange={handleInputText}
          placeholder="Text to be converted here..."
          className="min-h-32 text-lg"
        />
      </div>
      <div className="flex gap-2 flex-col lg:flex-row">
        <div className="w-full lg:w-1/2">
          <SelectData label="From" value={from} onChange={setFrom} />
        </div>
        <div className="w-full lg:w-1/2">
          <SelectData label="To" value={to} onChange={setTo} />
        </div>
        <div className="flex items-end justify-end">
          <Button
            className="space-x-2"
            disabled={text.length < 1}
            onClick={handleConvertButton}
          >
            <ArrowLeftRight size="1em" />
            <span>Convert</span>
          </Button>
        </div>
      </div>
      <div>
        <Textarea
          value={output}
          disabled={true}
          placeholder="Converted value here..."
          className="min-h-32 text-lg"
        />
      </div>
      <div className="flex justify-center flex-wrap gap-5">
        <CopyButton
          text={output}
          toastMessage="Converted text copied to clipboard!"
          variant="secondary"
        />
      </div>
    </div>
  )
}
