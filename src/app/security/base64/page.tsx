'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { Download, LockKeyhole, LockKeyholeOpen } from 'lucide-react'

import { downloadText } from '~/shared/lib/download-text'

import { Label } from '~/shared/components/label'
import { Button } from '~/shared/components/button'
import { CopyButton } from '~/shared/components/copy-button'
import { Textarea } from '~/shared/components/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/shared/components/select'

import { Method, base64, validateBase64 } from './_lib/base64'

export default function Page() {
  const [data, setData] = useState('')
  const [result, setResult] = useState('')
  const [method, setMethod] = useState<Method>('encode')
  const [loading, setLoading] = useState(false)

  const inputFileRef = useRef<HTMLInputElement>(null)

  function handleInputData(data: string, localMethod = method) {
    setData(data)
    setResult(base64(data, localMethod) ?? '')
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length == 0 || !e.target.files) return

    setLoading(true)

    const file = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      setResult(`${fileReader.result}`)
    }
    fileReader.onerror = () => {
      toast.error('Error reading file')
    }

    setLoading(false)
  }

  function toggleMethod() {
    if (method === 'encode') setMethod('decode')
    else if (method === 'decode') setMethod('encode')
  }

  const isDataValid = method == 'decode' ? validateBase64(data) : true

  return (
    <div className="space-y-14">
      <div className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="result">Target</Label>
          <Textarea
            value={data}
            onChange={e => handleInputData(e.target.value)}
            placeholder={
              method === 'encode'
                ? 'Target data to be encoded'
                : 'Base64 to be decoded'
            }
            data-valid={isDataValid}
            className="min-h-32 text-lg data-[valid='false']:multi-['ring-2;ring-red-300;dark:ring-red-700;ring-offset-2;focus-visible:ring-red-500;dark:focus-visible:ring-red-500']"
          />
          <span className="text-red-500 block text-center md:hidden">
            {!isDataValid && 'Invalid Base64'}
          </span>
        </div>
        <div className="flex justify-center md:justify-between gap-2 flex-wrap">
          <span className="text-red-500 hidden md:block">
            {!isDataValid && 'Invalid Base64'}
          </span>

          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center border border-input rounded-md">
              <Select
                onValueChange={value => {
                  setMethod(value as Method)
                  handleInputData(data, value as Method)
                }}
                defaultValue={method}
                value={method}
              >
                <SelectTrigger
                  id="method-select"
                  className="w-fit space-x-3 border-r border-y-0 border-l-0 font-medium"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encode">Encode</SelectItem>
                  <SelectItem value="decode">Decode</SelectItem>
                </SelectContent>
              </Select>

              <Button className="px-3" variant="link" onClick={toggleMethod}>
                {method === 'decode' && <LockKeyholeOpen size="1em" />}
                {method === 'encode' && <LockKeyhole size="1em" />}
              </Button>
            </div>

            <Button
              className="space-x-2"
              onClick={() => inputFileRef.current?.click()}
              disabled={data.length > 0 || loading}
            >
              <LockKeyhole size="1em" />
              <span>Encode file</span>
              <input
                type="file"
                className="hidden"
                ref={inputFileRef}
                onChange={handleFile}
                disabled={loading}
              />
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          <Label htmlFor="result">Result</Label>
          <Textarea
            readOnly
            id="result"
            className="text-lg min-h-28"
            value={result ?? ''}
            disabled={!result || result.length < 1}
          />
        </div>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        <CopyButton
          text={result}
          disabled={!result || result.length < 1}
          variant="secondary"
          toastMessage={
            method === 'encode'
              ? 'Encoded Base64 copied to the clipboard!'
              : 'Decoded Base64 copied to the clipboard!'
          }
        />
        <Button
          onClick={() => downloadText(result, `base64 - ${method}d`)}
          disabled={!result || result.length < 1}
          variant="secondary"
          className="space-x-2"
        >
          <Download size="1em" />
          <span>Download</span>
        </Button>
      </div>
    </div>
  )
}
