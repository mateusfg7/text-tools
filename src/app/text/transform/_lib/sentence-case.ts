import { getSentences } from '~/shared/lib/get-sentences'

export function sentenceCase(text: string) {
  const sentencesArray = getSentences(text)
  if (!sentencesArray) return

  const charSplitSentences = sentencesArray.map(sentence =>
    sentence.trim().split('')
  )

  const transformedChars = charSplitSentences.map(sentenceChars =>
    sentenceChars
      .map((char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join('')
  )

  return transformedChars.join(' ')
}
