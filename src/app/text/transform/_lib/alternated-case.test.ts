import { describe, it, expect } from 'bun:test'
import { alternatedCase } from './alternated-case'

describe('Alternated Case', () => {
  it('should return a text with alternated case', () => {
    expect(alternatedCase('Mateus Felipe')).toBe('MaTeUs fElIpE')
  })
})
