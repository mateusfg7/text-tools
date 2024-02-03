'use client'

import { useState } from 'react'
import { Minus, Plus, RefreshCw } from 'lucide-react'

import { Button } from '~/shared/components/button'
import { Input } from '~/shared/components/input'
import { Slider } from '~/shared/components/slider'
import { Label } from '~/shared/components/label'
import { CopyButton } from '~/shared/components/copy-button'

import { Options, generatePassword } from './_lib/generate-password'
import { PasswordDisplay } from './_components/password-display'

export default function Page() {
  const [minimumLowerCase, setMinimumLowerCase] = useState(4)
  const [minimumUpperCase, setMinimumUpperCase] = useState(4)
  const [minimumNumbers, setMinimumNumbers] = useState(4)
  const [minimumSpecialChars, setMinimumSpecialChars] = useState(4)

  const [minimumPasswordLength, setMinimumPasswordLength] = useState(
    minimumLowerCase + minimumUpperCase + minimumNumbers + minimumSpecialChars
  )
  const [passwordLength, setPasswordLength] = useState(20)

  const defaultOptions: Options = {
    size: passwordLength,
    minimum: {
      lower: minimumLowerCase,
      upper: minimumUpperCase,
      numbers: minimumNumbers,
      special: minimumSpecialChars
    }
  }

  const [password, setPassword] = useState<string>(
    generatePassword(defaultOptions)
  )

  const handleGeneratePassword = (options = defaultOptions) =>
    setPassword(generatePassword(options))

  function handleSetPasswordLength(value: number) {
    if (value < minimumPasswordLength) value = minimumPasswordLength
    if (value < 8) value = 8
    if (value > 128) value = 128

    setPasswordLength(value)
    handleGeneratePassword({ ...defaultOptions, size: value })
  }

  function handleSetMinimum(
    value: number,
    char: 'lower' | 'upper' | 'numbers' | 'special'
  ) {
    if (value < 0 || value > 10) return

    let updatedOption = defaultOptions

    switch (char) {
      case 'lower':
        updatedOption.minimum.lower = value
        setMinimumLowerCase(value)
        break
      case 'upper':
        updatedOption.minimum.upper = value
        setMinimumUpperCase(value)
        break
      case 'numbers':
        updatedOption.minimum.numbers = value
        setMinimumNumbers(value)
        break
      case 'special':
        updatedOption.minimum.special = value
        setMinimumSpecialChars(value)
        break
    }

    const {
      minimum: { lower, numbers, special, upper }
    } = updatedOption

    let minimumSum = lower + numbers + special + upper

    if (minimumSum === 0) {
      updatedOption = {
        ...updatedOption,
        minimum: {
          lower: 1,
          numbers: 0,
          special: 0,
          upper: 0
        }
      }
      minimumSum = 1
      setMinimumLowerCase(1)
    }

    setMinimumPasswordLength(minimumSum)

    if (passwordLength < minimumSum) {
      handleSetPasswordLength(minimumSum)
      updatedOption.size = minimumSum
    }

    handleGeneratePassword(updatedOption)
  }

  return (
    <div className="space-y-14">
      <PasswordDisplay password={password} />
      <div className="space-y-7">
        <div className="text-center space-y-2">
          <Label htmlFor="password-length" className="space-y-1">
            <span className="block">Password length: {passwordLength}</span>
            <span className="block text-xs text-muted-foreground/50">
              Minimum: {minimumPasswordLength}
            </span>
          </Label>
          <div className="flex gap-2 justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => handleSetPasswordLength(passwordLength - 1)}
            >
              <Minus size="1em" />
            </Button>
            <Slider
              id="password-length"
              className="max-w-md"
              value={[passwordLength]}
              onValueChange={valueArray =>
                handleSetPasswordLength(valueArray[0])
              }
              step={1}
              min={minimumPasswordLength < 8 ? 8 : minimumPasswordLength}
              max={128}
            />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => handleSetPasswordLength(passwordLength + 1)}
            >
              <Plus size="1em" />
            </Button>
          </div>
        </div>
        <div className="text-center space-y-2">
          <span>Minimum characters</span>
          <div className="flex justify-center flex-wrap gap-4">
            <div className="border border-border rounded-md gap-2 flex items-center">
              <Label htmlFor="lower" className="px-3">
                Lower case
              </Label>
              <Input
                type="number"
                min={0}
                max={10}
                id="lower"
                value={minimumLowerCase}
                className="w-16 space-x-2 border-y-0 border-r-0"
                onChange={e =>
                  handleSetMinimum(Number(e.target.value), 'lower')
                }
              />
            </div>
            <div className="border border-border rounded-md gap-2 flex items-center">
              <Label htmlFor="upper" className="px-3">
                Upper case
              </Label>
              <Input
                type="number"
                min={0}
                max={10}
                id="upper"
                value={minimumUpperCase}
                className="w-16 space-x-2 border-y-0 border-r-0"
                onChange={e =>
                  handleSetMinimum(Number(e.target.value), 'upper')
                }
              />
            </div>
            <div className="border border-border rounded-md gap-2 flex items-center">
              <Label htmlFor="numbers" className="px-3">
                Numbers
              </Label>
              <Input
                type="number"
                min={0}
                max={10}
                id="numbers"
                value={minimumNumbers}
                className="w-16 space-x-2 border-y-0 border-r-0"
                onChange={e =>
                  handleSetMinimum(Number(e.target.value), 'numbers')
                }
              />
            </div>
            <div className="border border-border rounded-md gap-2 flex items-center">
              <Label htmlFor="special" className="px-3">
                Special
              </Label>
              <Input
                type="number"
                min={0}
                max={10}
                id="special"
                value={minimumSpecialChars}
                className="w-16 space-x-2 border-y-0 border-r-0"
                onChange={e =>
                  handleSetMinimum(Number(e.target.value), 'special')
                }
              />
            </div>
          </div>
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
