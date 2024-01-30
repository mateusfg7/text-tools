import { describe, it, expect } from 'bun:test'
import { getStatistics } from './get-statistics'

const text = `Frazes Jack Sparrow:\n\nEsse é o dia que vocês sempre irão se lembrar: quando quase capturaram Jack Sparrow\nMas já ouviram falar de mim...\nPara que lutar se podemos negociar?`

const statistics: ReturnType<typeof getStatistics> = {
  charCount: 146,
  lineCount: 4,
  sentencesCount: 2,
  wordCount: 27
}

describe('Get Statistics', () => {
  it('should calculate statistics of text', () => {
    expect(getStatistics(text)).toEqual(statistics)
  })
})
