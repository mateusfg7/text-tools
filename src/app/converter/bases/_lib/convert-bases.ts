import { parseBigInt } from './parse-big-int'

export const baseList = ['BIN', 'HEX', 'DEC'] as const
export type Base = (typeof baseList)[number]

type BaseActions = {
  [key in Base]: {
    dictionary: {
      label: string
      example: string
      error: string
    }
    radix: bigint
    validate: (input: string) => boolean
  }
}
export const baseActions: BaseActions = {
  BIN: {
    dictionary: {
      label: 'Binary',
      example: '01011',
      error: 'The input value must be a binary (01011)'
    },
    radix: 2n,
    validate: (input: string) => /^[01]+$/.test(input)
  },
  DEC: {
    dictionary: {
      label: 'Decimal',
      example: '123',
      error: 'The input value must be a decimal (123)'
    },
    radix: 10n,
    validate: (input: string) => /^[0-9]+$/.test(input)
  },
  HEX: {
    dictionary: {
      label: 'Hex',
      example: '0x0A',
      error: 'The input value must be a hexadecimal (0x0A)'
    },
    radix: 16n,
    validate: (input: string) => /^(0x)?[0-9A-Fa-f]+$/.test(input)
  }
}

export function convertBases(
  input: string,
  from: Base,
  to: Base
): string | undefined {
  if (
    input.length < 1 ||
    (from === 'BIN' && !baseActions.BIN.validate(input)) ||
    (from === 'HEX' && !baseActions.HEX.validate(input)) ||
    (from === 'DEC' && !baseActions.DEC.validate(input))
  ) {
    return undefined
  }

  if (from === to) return input

  let converted = (
    parseBigInt(input, baseActions[from].radix) as Number
  ).toString(Number(baseActions[to].radix))

  if (from === 'HEX' && to === 'BIN') {
    converted = converted.padStart(8, '0')
  }

  if (to === 'DEC') {
    converted = Number(converted).toLocaleString().replace(/\./g, '')
  }

  return converted
}
