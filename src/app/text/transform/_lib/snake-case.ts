export function snakeCase(text: string) {
  // https://stackoverflow.com/a/4328546
  const normalizedText = text.replace(/[^\w\s\']|_/g, '').replace(/\s+/g, ' ')
  return normalizedText.toLowerCase().replaceAll(' ', '_')
}
