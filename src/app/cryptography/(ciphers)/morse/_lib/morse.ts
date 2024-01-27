const morseAlphabet = [
  { char: '0', morse: '-----' },
  { char: '1', morse: '.----' },
  { char: '2', morse: '..---' },
  { char: '3', morse: '...--' },
  { char: '4', morse: '....-' },
  { char: '5', morse: '.....' },
  { char: '6', morse: '-....' },
  { char: '7', morse: '--...' },
  { char: '8', morse: '---..' },
  { char: '9', morse: '----.' },
  { char: 'a', morse: '.-' },
  { char: 'ã', morse: '.-' },
  { char: 'â', morse: '.-' },
  { char: 'á', morse: '.-' },
  { char: 'à', morse: '.-' },
  { char: 'b', morse: '-...' },
  { char: 'c', morse: '-.-.' },
  { char: 'ç', morse: '-.-..' },
  { char: 'd', morse: '-..' },
  { char: 'e', morse: '.' },
  { char: 'ê', morse: '.' },
  { char: 'é', morse: '.' },
  { char: 'è', morse: '.' },
  { char: 'f', morse: '..-.' },
  { char: 'g', morse: '--.' },
  { char: 'h', morse: '....' },
  { char: 'i', morse: '..' },
  { char: 'î', morse: '..' },
  { char: 'í', morse: '..' },
  { char: 'ì', morse: '..' },
  { char: 'j', morse: '.---' },
  { char: 'k', morse: '-.-' },
  { char: 'l', morse: '.-..' },
  { char: 'm', morse: '--' },
  { char: 'n', morse: '-.' },
  { char: 'o', morse: '---' },
  { char: 'õ', morse: '---' },
  { char: 'ô', morse: '---' },
  { char: 'ó', morse: '---' },
  { char: 'ò', morse: '---' },
  { char: 'p', morse: '.--.' },
  { char: 'q', morse: '--.-' },
  { char: 'r', morse: '.-.' },
  { char: 's', morse: '...' },
  { char: 't', morse: '-' },
  { char: 'u', morse: '..-' },
  { char: 'û', morse: '..-' },
  { char: 'ú', morse: '..-' },
  { char: 'ù', morse: '..-' },
  { char: 'v', morse: '...-' },
  { char: 'w', morse: '.--' },
  { char: 'x', morse: '-..-' },
  { char: 'y', morse: '-.--' },
  { char: 'z', morse: '--..' },
  { char: ' ', morse: '/' },
  { char: '!', morse: '-.-.--' },
  { char: '.', morse: '.-.-.-' },
  { char: ',', morse: '--..--' },
  { char: '?', morse: '..--..' },
  { char: '&', morse: '.-...' },
  { char: "'", morse: '.----.' },
  { char: '@', morse: '.--.-.' },
  { char: '(', morse: '-.--.' },
  { char: ')', morse: '-.--.-' },
  { char: ':', morse: '---...' },
  { char: ';', morse: '-.-.-.' },
  { char: '/', morse: '-..-.' },
  { char: '_', morse: '..--.-' },
  { char: '=', morse: '-...-' },
  { char: '+', morse: '.-.-.' },
  { char: '-', morse: '-....-' },
  { char: '"', morse: '.-..-.' }
]

function encrypt(text: string) {
  const treatedText = text.toLowerCase().trim().split('')
  const encodedChars = treatedText.map(char => {
    const mapList = morseAlphabet.filter(map => map.char === char)

    if (mapList.length < 1) return char
    return mapList[0].morse
  })

  return encodedChars.join(' ')
}

function decrypt(text: string) {
  const splittedText = text.split(' ')
  const decodedChars = splittedText.map(morse => {
    const mapList = morseAlphabet.filter(map => map.morse === morse)

    if (mapList.length < 1) return morse

    return mapList[0].char
  })

  return decodedChars.join('')
}

export type Method = 'encode' | 'decode'
export function morse(text: string, method: Method = 'encode') {
  return method === 'encode' ? encrypt(text) : decrypt(text)
}
