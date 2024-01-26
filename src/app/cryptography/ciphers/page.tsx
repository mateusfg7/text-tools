'use client'

import { useState } from 'react'
import { Label } from '~/shared/components/label'
import { Textarea } from '~/shared/components/textarea'
import { CaesarCipher } from './_components/caesar-cipher'

export default function Page() {
  const [plainText, setPlainText] = useState('')

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Label htmlFor="plain-text">Target plain text</Label>
        <Textarea
          id="plain-text"
          placeholder="Plain text..."
          className="text-lg min-h-28"
          value={plainText}
          onChange={(e) => setPlainText(e.target.value)}
        />
      </div>
      <CaesarCipher plainText={plainText} />
    </div>
  )
}
