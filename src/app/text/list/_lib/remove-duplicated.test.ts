import { expect, it, describe } from 'bun:test'
import { Divisor } from './divisor'
import { removeDuplicated } from './remove-duplicated'

type List = {
  divisor: Divisor
  raw: string
  result: string
}
const lists: List[] = [
  {
    divisor: 'comma',
    raw: 'keyboard, mouse,monitor ,mouse,headset, ssd , motherboard',
    result: 'keyboard, mouse, monitor, headset, ssd, motherboard'
  },
  {
    divisor: 'hyphen',
    raw: 'keyboard- mouse -monitor-mouse -headset- ssd - motherboard-ssd',
    result: 'keyboard-mouse-monitor-headset-ssd-motherboard'
  },
  {
    divisor: 'space',
    raw: 'keyboard mouse monitor mouse  headset  ssd motherboard ssd',
    result: 'keyboard mouse monitor headset ssd motherboard'
  },
  {
    divisor: 'line',
    raw: 'keyboard\nmouse\nmonitor\nmouse\n headset\n ssd\nmotherboard\nssd',
    result: 'keyboard\nmouse\nmonitor\nheadset\nssd\nmotherboard'
  }
]

describe('Remove Duplicated', () => {
  it('should remove duplicated values divided by a defined divisor', () => {
    lists.forEach(list =>
      expect(removeDuplicated(list.raw, list.divisor)).toBe(list.result)
    )
  })
})
