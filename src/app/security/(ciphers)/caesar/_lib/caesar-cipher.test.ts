import { describe, it, expect } from 'bun:test'
import { caesarCipher } from './caesar-cipher'

describe('Caesar Cipher', () => {
  it('should encode text with shift 42', () => {
    const text = 'O Galo é o maior de minas!'
    const result = 'E Wqbe é e cqyeh tu cydqi!'

    expect(caesarCipher(text, 42)).toBe(result)
  })

  it('should decode text with shift 42', () => {
    const encoded = 'E Wqbe é e cqyeh tu cydqi!'
    const result = 'O Galo é o maior de minas!'

    expect(caesarCipher(encoded, 42, 'decode')).toBe(result)
  })
})
