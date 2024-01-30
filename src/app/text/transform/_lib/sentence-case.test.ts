import { expect, it, describe } from 'bun:test'
import { sentenceCase } from './sentence-case'

describe('Sentence Case', () => {
  it('should return a text with correct case based on sentences', () => {
    expect(
      sentenceCase(
        "i Like TURTLES. dO You? awesome! hahaha. lol!!! hat's Going on????"
      )
    ).toBe("I like turtles. Do you? Awesome! Hahaha. Lol!!! Hat's going on????")
  })
})
