import { inc, dec } from '../src/updaters'

describe('updaters', () => {
  test('inc', () => {
    const next = inc({ index: 0, length: 8 })
    expect(next.index).toBe(1)
  })
  test('dec', () => {
    const next = dec({ index: 1, length: 8 })
    expect(next.index).toBe(0)
  })
  test('dec 0', () => {
    const next = dec({ index: 0, length: 8 })
    expect(next).toBe(null)
  })
})
