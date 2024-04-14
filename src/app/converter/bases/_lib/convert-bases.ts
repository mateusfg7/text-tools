export type Base = 'BIN' | 'HEX' | 'DEC'

const onlyBinaryRegex = /^[01]+$/
const onlyHexRegex = /^(0x)?[0-9A-Fa-f]+$/
const onlyDecimalRegex = /^[0-9]+$/

export const BASE_LABELS: Array<{ type: Base, label: string }> = [
    { type: 'BIN', label: 'Binary' },
    { type: 'HEX', label: 'Hex' },
    { type: 'DEC', label: 'Decimal' },
]

function convertBaseToRadix(base: Base): number {
    if (base === 'BIN') return 2
    if (base === 'DEC') return 10
    if (base === 'HEX') return 16

    return 10
}

export function convertBases(input: string, from: Base, to: Base): string {

    if (from === 'BIN' && !onlyBinaryRegex.test(input)) {
        throw new Error("The input value must be a binary.")
    }

    if (from === 'HEX' && !onlyHexRegex.test(input)) {
        throw new Error("The input value must be a hex.")
    }

    if (from === 'DEC' && !onlyDecimalRegex.test(input)) {
        throw new Error("The input value must be a decimal.")
    }

    if (from === to) return input

    let converted = parseInt(input, convertBaseToRadix(from))
        .toString(convertBaseToRadix(to))
        .toUpperCase()

    if (from === 'HEX' && to === 'BIN') {
        converted = converted.padStart(8, '0')
    }

    return converted
}
