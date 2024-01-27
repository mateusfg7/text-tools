import { expect, describe, it } from 'bun:test'
import { padZero } from './pad-zero'

describe('Pad Zero', () => {
  it('should return number with 2 characters', () => {
    expect(padZero(7)).toBe('07')
    expect(padZero(-7)).toBe('-07')
    expect(padZero(42)).toBe('42')
    expect(padZero(-42)).toBe('-42')
  })
})
