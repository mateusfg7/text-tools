'use client'

import { Textarea } from '~/shared/components/textarea'
import useCopy from 'use-copy'
import { toast } from 'sonner'
import { Check, Copy, Cpu, Loader2 } from 'lucide-react'

import { Button } from '~/shared/components/button'
import { ChangeEvent, useEffect, useState } from 'react'
import { HashApiResponse } from '~/app/api/hash/route'

type HashRowProps = {
  title: string
  hash: string | undefined
}
const HashRow = ({ title, hash }: HashRowProps) => {
  const [copied, copy, setCopied] = useCopy(hash ?? '')

  function handleCopyText() {
    copy()

    toast.success(`${title} copied to the clipboard`)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="border p-2 text-center md:flex items-center justify-between gap-1 border-border rounded-md relative md:flex-row flex-col space-y-5 md:space-y-0 overflow-hidden block">
      <div className="font-bold">{title}</div>
      <div
        data-no-hash={!hash}
        title={hash ?? ''}
        className="md:absolute md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 w-full md:w-1/2 data-[no-hash='true']:text-center text-ellipsis text-center md:text-left overflow-hidden"
      >
        {hash ?? '-'}
      </div>
      <Button
        onClick={handleCopyText}
        size="icon"
        variant="outline"
        className="hidden md:flex"
        disabled={!hash}
      >
        {copied && <Check size="1em" className="text-lg" />}
        {!copied && <Copy size="1em" className="text-lg" />}
      </Button>
      <Button
        onClick={handleCopyText}
        variant="outline"
        size="lg"
        className="md:hidden space-x-3"
        disabled={!hash}
      >
        {copied && <Check size="1em" className="text-lg" />}
        {!copied && <Copy size="1em" className="text-lg" />}
        <span>Copy to clipboard</span>
      </Button>
    </div>
  )
}

export default function Page() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hashes, setHashes] = useState<HashApiResponse | undefined>()

  function handleInputText(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
  }

  async function generateHash() {
    if (text.length < 1) {
      toast.error('Text cannot be empty!')
      return
    }

    setIsLoading(true)

    await fetch('/api/hash', {
      body: JSON.stringify({
        data: text,
      }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res: HashApiResponse) => {
        console.log(res)
        setHashes(res)
      })
      .catch(() => toast.error('Error while generating hashes!'))

    setIsLoading(false)
  }

  return (
    <div className="space-y-12">
      <div className="space-y-5">
        <Textarea
          value={text}
          onChange={handleInputText}
          placeholder="Text to be hashed here..."
          className="min-h-32 text-lg"
        />
      </div>
      <div className="flex justify-center md:justify-end">
        <Button
          className="space-x-2"
          onClick={generateHash}
          disabled={text.length < 1}
        >
          {isLoading ? (
            <>
              <Loader2 size="1em" className="animate-spin" />
              <span>Generating hashes</span>
            </>
          ) : (
            <>
              <Cpu size="1em" />
              <span>Generate hashes</span>
            </>
          )}
        </Button>
      </div>
      <div className="space-y-2">
        <HashRow title="MD5" hash={hashes && hashes.MD5} />
        <HashRow title="SHA1" hash={hashes && hashes.SHA1} />
        <HashRow title="SHA3" hash={hashes && hashes.SHA3} />
        <HashRow title="SHA224" hash={hashes && hashes.SHA224} />
        <HashRow title="SHA256" hash={hashes && hashes.SHA256} />
        <HashRow title="SHA384" hash={hashes && hashes.SHA384} />
        <HashRow title="SHA512" hash={hashes && hashes.SHA512} />
      </div>
    </div>
  )
}
