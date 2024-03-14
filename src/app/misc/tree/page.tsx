'use client'

import { Suspense, useRef, useState } from 'react'
import { Download } from 'lucide-react'
import { parseAsBoolean, useQueryState } from 'nuqs'

import { downloadText } from '~/shared/lib/download-text'
import { Label } from '~/shared/components/label'
import { Textarea } from '~/shared/components/textarea'
import { Button } from '~/shared/components/button'
import { CopyButton } from '~/shared/components/copy-button'
import { Switch } from '~/shared/components/switch'

import { parseInput } from './_lib/parse-input'
import { generateTree } from './_lib/generate-tree'

function ClientPage() {
  const [plainText, setPlainText] = useState(
    'src\n	app\n		page.tsx\n	components\n		header.tsx'
  )
  const [fancy, setFancy] = useQueryState(
    'fancy',
    parseAsBoolean.withDefault(true)
  )
  const [fullPath, setFullPath] = useQueryState(
    'fullPath',
    parseAsBoolean.withDefault(false)
  )
  const [rootDot, setRootDot] = useQueryState(
    'rootDot',
    parseAsBoolean.withDefault(false)
  )
  const [trailingDirSlash, setTrailingDirSlash] = useQueryState(
    'trailingDirSlash',
    parseAsBoolean.withDefault(false)
  )

  const charset: 'utf-8' | 'ascii' = fancy ? 'utf-8' : 'ascii'

  const fileStructure = parseInput(plainText)
  const resultTree = generateTree(fileStructure, {
    charset,
    fullPath,
    rootDot,
    trailingDirSlash
  })

  const textAreaResult = useRef<HTMLTextAreaElement | null>(null)

  return (
    <div className="space-y-7">
      <span className="text-muted-foreground text-sm italic">
        Inspired on{' '}
        <a
          href="https://tree.nathanfriend.io/"
          target="_blank"
          className="underline hover:text-accent-foreground"
        >
          tree.nathanfriend.io
        </a>
      </span>
      <div className="space-y-3">
        <Label htmlFor="plain-text">Target plain text</Label>
        <Textarea
          id="plain-text"
          placeholder="Write your file tree with spaces or tabs..."
          className="min-h-36"
          onKeyDown={function (e) {
            if (e.key == 'Tab') {
              e.preventDefault()
              setPlainText(curr => curr + '\t')
            }
          }}
          value={plainText}
          onChange={e => setPlainText(e.target.value)}
        />
      </div>
      <div className="space-y-3">
        <Label htmlFor="result">Result</Label>
        <Textarea
          readOnly
          ref={textAreaResult}
          value={resultTree}
          id="result"
          className="min-h-36 font-mono"
        />
      </div>
      <div className="flex justify-center gap-8 flex-wrap">
        <div className="flex items-center gap-3">
          <Label htmlFor="fancy" className="text-lg">
            Fancy
          </Label>
          <Switch
            id="fancy"
            checked={fancy}
            onCheckedChange={value => setFancy(value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="full-path" className="text-lg">
            Full path
          </Label>
          <Switch
            id="full-path"
            checked={fullPath}
            onCheckedChange={value => setFullPath(value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="trailing" className="text-lg">
            Trailing /
          </Label>
          <Switch
            id="trailing"
            checked={trailingDirSlash}
            onCheckedChange={value => setTrailingDirSlash(value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="root-dot" className="text-lg">
            Root .
          </Label>
          <Switch
            id="root-dot"
            checked={rootDot}
            onCheckedChange={value => setRootDot(value)}
          />
        </div>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        <CopyButton
          text={resultTree}
          disabled={plainText.length < 1}
          toastMessage="File tree copied to the clipboard!"
          variant="secondary"
        />
        <Button
          className="space-x-2"
          variant="secondary"
          disabled={plainText.length < 1}
          onClick={() => downloadText(resultTree, 'file-tree')}
        >
          <Download size="1em" />
          <span>Download</span>
        </Button>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense>
      <ClientPage />
    </Suspense>
  )
}
