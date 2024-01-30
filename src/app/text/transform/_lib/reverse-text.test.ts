import { expect, it, describe } from 'bun:test'
import { reverseText } from './reverse-text'

describe('Reverse Text', () => {
  it('should return the reverse version of a text', () => {
    expect(reverseText('Elliot Alderson')).toBe('nosredlA toillE')
  })
})
