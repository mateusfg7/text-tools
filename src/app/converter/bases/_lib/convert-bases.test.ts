import { describe, it, expect } from 'bun:test'
import { convertBases } from './convert-bases'

describe('convert bases', () => {
  it('convert binary to binary', () => {
    let input = '010101'
    let expected = '010101'
    let output = convertBases(input, 'BIN', 'BIN')

    expect(output).toEqual(expected)
  })

  it('convert binary to hex', () => {
    let input = '010101'
    let expected = '15'
    let output = convertBases(input, 'BIN', 'HEX')

    expect(output).toEqual(expected)
  })

  it('convert binary to decimal', () => {
    let input = '010101'
    let expected = '21'
    let output = convertBases(input, 'BIN', 'DEC')

    expect(output).toEqual(expected)
  })

  it('convert hex to binary', () => {
    let input = '6B'
    let expected = '01101011'
    let output = convertBases(input, 'HEX', 'BIN')

    expect(output).toEqual(expected)
  })

  it('convert hex to hex', () => {
    let input = '6B'
    let expected = '6B'
    let output = convertBases(input, 'HEX', 'HEX')

    expect(output).toEqual(expected)
  })

  it('convert hex to decimal', () => {
    let input = '6B'
    let expected = '107'
    let output = convertBases(input, 'HEX', 'DEC')

    expect(output).toEqual(expected)
  })

  it('convert decimal to binary', () => {
    let input = '105'
    let expected = '1101001'
    let output = convertBases(input, 'DEC', 'BIN')

    expect(output).toEqual(expected)
  })

  it('convert decimal to hex', () => {
    let input = '105'
    let expected = '69'
    let output = convertBases(input, 'DEC', 'HEX')

    expect(output).toEqual(expected)
  })

  it('convert decimal to decimal', () => {
    let input = '105'
    let expected = '105'
    let output = convertBases(input, 'DEC', 'DEC')

    expect(output).toEqual(expected)
  })
})
