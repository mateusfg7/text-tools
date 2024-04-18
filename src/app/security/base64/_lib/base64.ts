export function validateBase64(base64: string) {
  const base64regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
  return base64regex.test(base64)
}

export type Method = 'encode' | 'decode'
export function base64(data: string, method: Method) {
  if (method === 'encode') {
    return btoa(data)
  }

  if (method === 'decode' && validateBase64(data)) {
    return atob(data)
  }
}
