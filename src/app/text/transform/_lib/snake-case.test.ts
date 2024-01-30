import { expect, it, describe } from 'bun:test'
import { snakeCase } from './snake-case'

describe('Snake Case', () => {
  it('should return a snake case version of text', () => {
    expect(snakeCase('My Awesome POST')).toBe('my_awesome_post')
  })
})
