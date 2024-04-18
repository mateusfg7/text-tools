import { describe, it, expect } from 'bun:test'
import { base64, validateBase64 } from './base64'

describe('Base64', () => {
  it('should encode text in base64', () => {
    const targetText = 'You shall pass'
    const resultedBase64 = 'WW91IHNoYWxsIHBhc3M='

    expect(base64(targetText, 'encode')).toBe(resultedBase64)
  })

  it('should decode base64 to text', () => {
    const targetBase64 = 'WW91IHNoYWxsIHBhc3M='
    const resultedText = 'You shall pass'

    expect(base64(targetBase64, 'decode')).toBe(resultedText)
  })

  it('should not decode invalid base64', () => {
    const invalidBased64 = 'YouShallNotPass'

    expect(base64(invalidBased64, 'decode')).toBeUndefined()
  })

  it('shoud validate base64', () => {
    const valid = 'WW91IHNoYWxsIHBhc3M='
    const invalid = 'YouShallNotPass'

    expect(validateBase64(valid)).toBe(true)
    expect(validateBase64(invalid)).toBe(false)
  })
})
