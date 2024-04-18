import { describe, it, expect } from 'bun:test'
import { letterToNumber } from './letter-to-number'

const decoded =
  'Para olhos tortos a verdade pode ter um rosto desvirtuado - Gandalf'

const encoded = {
  spaces:
    '80 01 35 01 101 28 25 17 28 36 101 37 28 35 37 28 36 101 01 101 43 10 35 09 01 09 10 101 33 28 09 10 101 37 10 35 101 38 26 101 35 28 36 37 28 101 09 10 36 43 18 35 37 38 01 09 28 101 110 101 63 01 27 09 01 25 15',
  hyphens:
    '80-01-35-01-101-28-25-17-28-36-101-37-28-35-37-28-36-101-01-101-43-10-35-09-01-09-10-101-33-28-09-10-101-37-10-35-101-38-26-101-35-28-36-37-28-101-09-10-36-43-18-35-37-38-01-09-28-101-110-101-63-01-27-09-01-25-15'
}

describe('Letter to Number', () => {
  describe('encode', () => {
    it('should encode with spaces', () => {
      expect(letterToNumber(decoded, 'space', 'Encrypt')).toBe(encoded.spaces)
    })
    it('should encode with hyphens', () => {
      expect(letterToNumber(decoded, 'hyphen', 'Encrypt')).toBe(encoded.hyphens)
    })
  })

  describe('decode', () => {
    it('should decode with spaces', () => {
      expect(letterToNumber(encoded.spaces, 'space', 'Decrypt')).toBe(decoded)
    })
    it('should decode with hyphens', () => {
      expect(letterToNumber(encoded.hyphens, 'hyphen', 'Decrypt')).toBe(decoded)
    })
  })
})
