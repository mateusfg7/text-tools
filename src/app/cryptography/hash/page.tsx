'use client'

import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import { Cpu, Loader2 } from 'lucide-react'

import { HashApiResponse } from '~/app/api/hash/route'

import { Button } from '~/shared/components/button'
import { CopyButton } from '~/shared/components/copy-button'
import { Textarea } from '~/shared/components/textarea'

type HashRowProps = {
  title: string
  hash: string | undefined
}
const HashRow = ({ title, hash }: HashRowProps) => (
  <div className="border p-2 text-center md:flex items-center justify-between gap-1 border-border rounded-md relative md:flex-row flex-col space-y-5 md:space-y-0 overflow-hidden block">
    <div className="font-bold">{title}</div>
    <div
      data-no-hash={!hash}
      title={hash ?? ''}
      className="md:absolute md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 w-full md:w-1/2 data-[no-hash='true']:text-center text-ellipsis text-center md:text-left overflow-hidden"
    >
      {hash ?? '-'}
    </div>
    <CopyButton
      text={hash ?? ''}
      size="lg"
      variant="outline"
      className="text-lg space-x-3 md:hidden"
      disabled={!hash}
      toastMessage={`${title} copied to the clipboard`}
    >
      <span className="text-base">Copy to clipboard</span>
    </CopyButton>
    <CopyButton
      text={hash ?? ''}
      size="icon"
      variant="outline"
      className="text-lg space-x-0"
      disabled={!hash}
      toastMessage={`${title} copied to the clipboard`}
    >
      <span />
    </CopyButton>
  </div>
)

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
        data: text
      }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(res => res.json())
      .then((res: HashApiResponse) => {
        console.log(res)
        setHashes(res)
      })
      .catch(() => toast.error('Error while generating hashes!'))

    setIsLoading(false)
  }

  const allHashForCopy = `MD5    ${hashes?.MD5}\nSHA1   ${hashes?.SHA1}\nSHA3   ${hashes?.SHA3}\nSHA224 ${hashes?.SHA224}\nSHA256 ${hashes?.SHA256}\nSHA384 ${hashes?.SHA384}\nSHA512 ${hashes?.SHA512}`

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
      <div className="flex justify-center gap-2 md:justify-end">
        <CopyButton
          text={allHashForCopy}
          disabled={!hashes}
          variant="secondary"
          toastMessage="All hashes copied to the clipboard!"
        >
          <span>Copy all hashes</span>
        </CopyButton>
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
