import { describe, it, expect } from 'bun:test'
import { convertDatas } from './convert-data'

const sampleJSON = `[{"name":"John","email":"john@gmail.com"},{"name":"Doe","email":"doe@gmail.com"}]`
const sampleCSV = `name,email\nJohn,john@gmail.com\nDoe,doe@gmail.com\n`

describe('convert datas', () => {
  it('convert JSON to CSV', () => {
    let output = convertDatas(sampleJSON, 'JSON', 'CSV')

    expect(output).toEqual(sampleCSV)
  })

  it('convert CSV to JSON', () => {
    let expected = JSON.stringify(JSON.parse(sampleJSON), null, 4)
    let output = convertDatas(sampleCSV, 'CSV', 'JSON')

    expect(output).toEqual(expected)
  })

  it('convert JSON to JSON', () => {
    let output = convertDatas(sampleJSON, 'JSON', 'JSON')

    expect(output).toEqual(sampleJSON)
  })

  it('convert CSV to CSV', () => {
    let output = convertDatas(sampleCSV, 'CSV', 'CSV')

    expect(output).toEqual(sampleCSV)
  })
})
