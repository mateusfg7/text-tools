import { describe, it, expect } from 'bun:test'
import { morse } from './morse'

const message =
  'Você era o escolhido. Foi dito que você iria destruir os Sith, não se unir a eles. Trazer o equilíbrio para a força, não jogá-la nas trevas. - Obi-Wan Kenobi'

const encoded =
  '...- --- -.-. . / . .-. .- / --- / . ... -.-. --- .-.. .... .. -.. --- .-.-.- / ..-. --- .. / -.. .. - --- / --.- ..- . / ...- --- -.-. . / .. .-. .. .- / -.. . ... - .-. ..- .. .-. / --- ... / ... .. - .... --..-- / -. .- --- / ... . / ..- -. .. .-. / .- / . .-.. . ... .-.-.- / - .-. .- --.. . .-. / --- / . --.- ..- .. .-.. .. -... .-. .. --- / .--. .- .-. .- / .- / ..-. --- .-. -.-.. .- --..-- / -. .- --- / .--- --- --. .- -....- .-.. .- / -. .- ... / - .-. . ...- .- ... .-.-.- / -....- / --- -... .. -....- .-- .- -. / -.- . -. --- -... ..'
const decoded =
  'voce era o escolhido. foi dito que voce iria destruir os sith, nao se unir a eles. trazer o equilibrio para a força, nao joga-la nas trevas. - obi-wan kenobi'

describe('Morse Code', () => {
  it('should encode text', () => {
    expect(morse(message, 'encode')).toBe(encoded)
  })
  it('should decode text', () => {
    expect(morse(encoded, 'decode')).toBe(decoded)
  })
})
