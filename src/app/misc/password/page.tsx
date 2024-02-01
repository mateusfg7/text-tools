'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import { Button } from '~/shared/components/button'
import { Input } from '~/shared/components/input'

import { Options, generatePassword } from './_lib/generate-password'
import { PasswordDisplay } from './_components/password-display'
import { Slider } from '~/shared/components/slider'
import { Label } from '~/shared/components/label'
import { Minus, Plus, RefreshCw } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '~/shared/components/toggle-group'
import { CopyButton } from '~/shared/components/copy-button'

export default function Page() {
  const [passwordLength, setPasswordLength] = useState(20)
  const [characters, setCharacters] = useState({
    lower: true,
    upper: true,
    numbers: true,
    special: true
  })

  const defaultOptions: Options = {
    size: passwordLength,
    characters
  }

  const [password, setPassword] = useState<string>(
    generatePassword(defaultOptions)
  )

  const handleGeneratePassword = (options?: Options) =>
    setPassword(generatePassword(options ?? defaultOptions))

  function handleSetPasswordLength(value: number[]) {
    if (value[0] < 8 || value[0] > 128) return

    setPasswordLength(value[0])
    handleGeneratePassword({ ...defaultOptions, size: value[0] })
  }

  function handleEnabledChars(enabledList: string[]) {
    const characters = {
      lower: enabledList.includes('lower'),
      upper: enabledList.includes('upper'),
      numbers: enabledList.includes('numbers'),
      special: enabledList.includes('special')
    }

    const isAllDisabled = !(
      characters.lower ||
      characters.upper ||
      characters.numbers ||
      characters.special
    )

    const enabledCharacters = !isAllDisabled
      ? characters
      : {
          lower: true,
          upper: false,
          numbers: false,
          special: false
        }

    setCharacters(enabledCharacters)
    handleGeneratePassword({ ...defaultOptions, characters: enabledCharacters })
  }

  const enabledCharactersList = [
    ...(characters.lower ? ['lower'] : []),
    ...(characters.upper ? ['upper'] : []),
    ...(characters.numbers ? ['numbers'] : []),
    ...(characters.special ? ['special'] : [])
  ]

  return (
    <div className="space-y-14">
      <PasswordDisplay password={password} />
      <div className="space-y-7">
        <div className="text-center space-y-2">
          <Label htmlFor="password-length">
            Password length: {passwordLength}
          </Label>
          <div className="flex gap-2 justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => handleSetPasswordLength([passwordLength - 1])}
            >
              <Minus size="1em" />
            </Button>
            <Slider
              id="password-length"
              className="max-w-md"
              value={[passwordLength]}
              onValueChange={handleSetPasswordLength}
              step={1}
              min={8}
              max={128}
            />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => handleSetPasswordLength([passwordLength + 1])}
            >
              <Plus size="1em" />
            </Button>
          </div>
        </div>
        <div className="text-center space-y-2">
          <span>Enabled characters</span>
          <ToggleGroup
            type="multiple"
            variant="outline"
            value={enabledCharactersList}
            onValueChange={handleEnabledChars}
          >
            <ToggleGroupItem value="upper">ABC</ToggleGroupItem>
            <ToggleGroupItem value="lower">abc</ToggleGroupItem>
            <ToggleGroupItem value="numbers">123</ToggleGroupItem>
            <ToggleGroupItem value="special">!@$</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="flex justify-center flex-wrap gap-5">
        <CopyButton
          text={password}
          toastMessage="Password copied to clipboard!"
          variant="secondary"
        />
        <Button className="space-x-2" onClick={() => handleGeneratePassword()}>
          <RefreshCw size="1em" />
          <span>New password</span>
        </Button>
      </div>
    </div>
  )
}
