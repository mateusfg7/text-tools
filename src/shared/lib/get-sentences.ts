export function getSentences(text: string) {
  // https://stackoverflow.com/a/72280712
  const match = text.match(
    /(?=[^])(?:\P{Sentence_Terminal}|\p{Sentence_Terminal}(?!['"`\p{Close_Punctuation}\p{Final_Punctuation}\s]))*(?:\p{Sentence_Terminal}+['"`\p{Close_Punctuation}\p{Final_Punctuation}]*|$)/guy
  )

  if (!match) return []

  return Array.from(match)
}
