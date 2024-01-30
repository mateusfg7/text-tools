import { describe, expect, it } from 'bun:test'
import { Divisor } from './divisor'
import { sortList } from './sort-list'

type List = {
  divisor: Divisor
  raw: string
  result: {
    asce: string
    desc: string
  }
}
const lists: List[] = [
  {
    divisor: 'comma',
    raw: 'keyboard, mouse,monitor ,mouse,headset, ssd , motherboard',
    result: {
      asce: 'headset, keyboard, monitor, motherboard, mouse, mouse, ssd',
      desc: 'ssd, mouse, mouse, motherboard, monitor, keyboard, headset'
    }
  },
  {
    divisor: 'hyphen',
    raw: 'keyboard- mouse -monitor-mouse -headset- ssd - motherboard-ssd',
    result: {
      asce: 'headset-keyboard-monitor-motherboard-mouse-mouse-ssd-ssd',
      desc: 'ssd-ssd-mouse-mouse-motherboard-monitor-keyboard-headset'
    }
  },
  {
    divisor: 'space',
    raw: 'keyboard mouse monitor mouse  headset  ssd motherboard ssd',
    result: {
      asce: 'headset keyboard monitor motherboard mouse mouse ssd ssd',
      desc: 'ssd ssd mouse mouse motherboard monitor keyboard headset'
    }
  },
  {
    divisor: 'line',
    raw: 'keyboard\nmouse\nmonitor\nmouse\n headset\n ssd\nmotherboard\nssd',
    result: {
      desc: 'ssd\nssd\nmouse\nmouse\nmotherboard\nmonitor\nkeyboard\nheadset',
      asce: 'headset\nkeyboard\nmonitor\nmotherboard\nmouse\nmouse\nssd\nssd'
    }
  }
]

describe('Sort List', () => {
  it('should sort list in ascendent order based on defined divisor', () => {
    lists.forEach(list =>
      expect(sortList(list.raw, list.divisor, 'asce')).toBe(list.result.asce)
    )
  })
  it('should sort list in descendent order based on defined divisor', () => {
    lists.forEach(list =>
      expect(sortList(list.raw, list.divisor, 'desc')).toBe(list.result.desc)
    )
  })
})
