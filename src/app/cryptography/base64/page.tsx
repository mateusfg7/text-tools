'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Download, Info, LockKeyhole, LockKeyholeOpen } from 'lucide-react'
import { Label } from '~/shared/components/label'

import { Button } from '~/shared/components/button'
import { CopyButton } from '~/shared/components/copy-button'
import { Textarea } from '~/shared/components/textarea'
import { base64ToText, generateBase64 } from './_lib/base64'
import { ActionButton } from '~/app/text/transform/_components/action-button'
import { downloadText } from '~/shared/lib/download-text'

export default function Page() {
  const [text, setText] = useState('')
  const [base64Converted, setBase64Converted] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const inputFileRef = useRef<HTMLInputElement>(null)

  function handleInputText(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
  }

  function textIsEmpty() {
    if (text.length < 1) {
      toast.error('Text cannot be empty!')
      return true
    }
    return false
  }

  function encodeBase64() {
    if (textIsEmpty()) {
      return
    }

    setBase64Converted(generateBase64(text))
  }

  function decodeBase64() {
    if (textIsEmpty()) {
      return
    }

    setBase64Converted(base64ToText(text))
  }

  function hashFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length == 0 || !e.target.files) return

    setLoading(true)
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      setBase64Converted(`${fileReader.result}`)
      setLoading(false)
    }
    fileReader.onerror = () => {
      setBase64Converted('Error on encode file')
      setLoading(false)
    }
  }
  return (
    <div className="space-y-12">
      <div className="space-y-5">
        <Textarea
          value={text}
          onChange={handleInputText}
          placeholder="Text or Base64 to be converted here..."
          className="min-h-32 text-lg"
        />
      </div>
      <div className="flex justify-center gap-2 md:justify-end">
        <Button
          className="space-x-2"
          onClick={encodeBase64}
          disabled={text.length < 1}
        >
          <LockKeyhole size="1em" />
          <span>Encode</span>
        </Button>
        <Button
          className="space-x-2"
          onClick={decodeBase64}
          disabled={text.length < 1}
        >
          <LockKeyholeOpen size="1em" />
          <span>Decode</span>
        </Button>

        <Button
          className="space-x-2"
          onClick={() => inputFileRef.current?.click()}
          disabled={text.length > 0}
        >
          <LockKeyhole size="1em" />
          <span>{loading ? 'Generating Base64' : 'Encode File'}</span>
          <input
            type="file"
            className="hidden"
            ref={inputFileRef}
            onChange={hashFile}
            disabled={loading}
          />
        </Button>
      </div>
      {base64Converted && (
        <div className="space-y-2">
          <div className="space-y-3">
            <Label htmlFor="result">Result</Label>
            <Textarea
              readOnly
              id="result"
              className="text-lg min-h-28"
              value={base64Converted}
            />
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            <CopyButton
              text={base64Converted}
              variant="secondary"
              toastMessage="Ciphered text copied to the clipboard!"
            />
            <ActionButton
              onClick={() => downloadText(base64Converted, 'base64')}
              Icon={Download}
              title="Download"
            />
          </div>
        </div>
      )}
    </div>
  )
}
