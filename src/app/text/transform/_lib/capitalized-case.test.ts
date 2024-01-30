import { describe, it, expect } from 'bun:test'
import { capitalizedCase } from './capitalized-case'

describe('Capitalized Case', () => {
  it('should return a text with capitalized case', () => {
    expect(capitalizedCase('caPTaiN JACK SPaRRow')).toBe('Captain Jack Sparrow')
  })
})
