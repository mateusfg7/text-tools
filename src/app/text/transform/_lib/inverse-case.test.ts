import { describe, it, expect } from 'bun:test'
import { inverseCase } from './inverse-case'

describe('Inverse Case', () => {
  it('should return a text with the inverse case of the original text', () => {
    expect(inverseCase('caPTaiN JACK SPaRRow')).toBe('CAptAIn jack spArrOW')
  })
})
