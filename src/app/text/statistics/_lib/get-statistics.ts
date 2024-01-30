import { getSentences } from '~/shared/lib/get-sentences'

export function getStatistics(text: string) {
  const wordCount = text.split(' ').filter(word => word.length > 0).length
  const charCount = text.replaceAll(' ', '').split('').length
  const lineCount = text.split('\n').filter(word => word.length > 0).length
  const sentencesCount = getSentences(text)?.length ?? 0

  return {
    wordCount,
    charCount,
    lineCount,
    sentencesCount
  }
}
