import { describe, it, expect } from 'bun:test'
import { base64ToText, generateBase64 } from './base64'

describe('Base64', () => {
  it('should encode text in base64', () => {
    const text = "You shall pass"
    const result = "WW91IHNoYWxsIHBhc3M="

    expect(generateBase64(text)).toBe(result)
  })

  it('should decode base64 to text', () => {
    const base64 = "WW91IHNoYWxsIHBhc3M="
    const result = "You shall pass"

    expect(base64ToText(base64)).toBe(result)
  })

  it('should not decode invalid base64', () => {
    const base64 = "YouShallNotPass"
    const result = "Base64 Invalid"
    expect(base64ToText(base64)).toBe(result)
  })
})