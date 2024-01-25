'use client'

import { Textarea } from '~/shared/components/textarea'
import useCopy from 'use-copy'
import { toast } from 'sonner'
import { Check, Copy } from 'lucide-react'

import { Button } from '~/shared/components/button'
import { ChangeEvent, useState } from 'react'

type HashRowProps = {
  title: string
  hash: string
}
const HashRow = ({ title, hash }: HashRowProps) => {
  const [copied, copy, setCopied] = useCopy(hash)

  function handleCopyText() {
    copy()

    toast.success('Hash copied to the clipboard!')
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="border p-2 flex items-center justify-between gap-1 border-border rounded-md">
      <span className="font-bold leading-none">{title}</span>
      <span className="leading-none">{hash}</span>
      <Button onClick={handleCopyText} size="icon" variant="outline">
        {copied && <Check size="1em" className="text-lg" />}
        {!copied && <Copy size="1em" className="text-lg" />}
      </Button>
    </div>
  )
}

export default function Page() {
  const [text, setText] = useState('')

  function handleInputText(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
  }

  return (
    <div className="space-y-12">
      <div className="space-y-5">
        <Textarea
          value={text}
          onChange={handleInputText}
          className="min-h-32 text-lg"
        />
      </div>
      <div className="space-y-2">
        <HashRow title="MD2" hash="1bc29b36f623ba82aaf6724fd3b16718" />
        <HashRow title="MD4" hash="1bc29b36f623ba82aaf6724fd3b16718" />
        <HashRow title="MD5" hash="1bc29b36f623ba82aaf6724fd3b16718" />
        <HashRow title="SHA0" hash="1bc29b36f623ba82aaf6724fd3b16718" />
        <HashRow title="SHA1" hash="1bc29b36f623ba82aaf6724fd3b16718" />
        <HashRow title="Sha224" hash="1bc29b36f623ba82aaf6724fd3b16718" />
        <HashRow title="Sha256" hash="1bc29b36f623ba82aaf6724fd3b16718" />
        <HashRow title="Sha384" hash="1bc29b36f623ba82aaf6724fd3b16718" />
        <HashRow title="Sha512" hash="1bc29b36f623ba82aaf6724fd3b16718" />
      </div>
    </div>
  )
}
