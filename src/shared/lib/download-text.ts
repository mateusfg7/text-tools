export function downloadText(text: string, title?: string) {
  const link = document.createElement('a')
  const file = new Blob([text], { type: 'text/plain' })

  link.href = URL.createObjectURL(file)
  link.download = `${title && `${title}_`}mateusf-com.txt`

  link.click()
  URL.revokeObjectURL(link.href)
}
