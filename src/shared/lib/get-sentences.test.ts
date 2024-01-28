import { describe, it, expect } from 'bun:test'
import { getSentences } from './get-sentences'

describe('Get Sentences', () => {
  it('should return the sentence case of a text', () => {
    const text =
      "i Like TURTLES. dO You? awesome! hahaha. lol!!! what's Going on????"
    const expected = [
      'i Like TURTLES.',
      ' dO You?',
      ' awesome!',
      ' hahaha.',
      ' lol!!!',
      " what's Going on????",
    ]

    expect(getSentences(text)).toEqual(expected)
  })
})
